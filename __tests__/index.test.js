// import path from 'path';
// import { fileURLToPath } from 'url';
// import genDiff from '../src/index.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

// test('diff for flat JSON files', () => {
//   const file1 = getFixturePath('file1.json');
//   const file2 = getFixturePath('file2.json');

//   const expected = `{
// - follow: false
//   host: hexlet.io
// - proxy: 123.234.53.22
// - timeout: 50
// + timeout: 20
// + verbose: true
// }`;

// expect(genDiff(file1, file2)).toBe(expected);
// });

import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('diff for flat JSON files', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toBe(expected);
});

test('diff for flat YAML files', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toBe(expected);
});

test('diff for mixed JSON and YAML files', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.yml'))).toBe(expected);
});