import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedStylish = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const expectedPlain = `Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true`;

// --- stylish ---
test('diff for flat JSON files (stylish)', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toBe(expectedStylish);
});

test('diff for flat YAML files (stylish)', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toBe(expectedStylish);
});

// --- plain ---
test('diff for flat JSON files (plain)', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toBe(expectedPlain);
});

test('diff for flat YAML files (plain)', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain')).toBe(expectedPlain);
});

test('diff for flat JSON files (json format)', () => {
  const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');
  expect(() => JSON.parse(result)).not.toThrow();

  const parsed = JSON.parse(result);
  expect(Array.isArray(parsed)).toBe(true);
  expect(parsed[0]).toHaveProperty('key');
  expect(parsed[0]).toHaveProperty('type');
});

test('diff for flat YAML files (json format)', () => {
  const result = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json');
  expect(result).toBe(
    genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')
  );
});