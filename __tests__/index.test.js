import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)

const fileNameJson1 = 'file3.json'
const fileNameJson2 = 'file4.json'
const fileNameYaml1 = 'file3.yml'
const fileNameYaml2 = 'file4.yml'

const expectedStylish = fs.readFileSync(getFixturePath('result_stylish.txt'), 'utf-8').trimEnd()
const expectedPlain   = fs.readFileSync(getFixturePath('result_plain.txt'),   'utf-8').trimEnd()
const expectedJson    = fs.readFileSync(getFixturePath('result_json.json'),   'utf-8').trimEnd()

// --- stylish ---
test('diff for nested JSON files (stylish)', () => {
  expect(genDiff(getFixturePath(fileNameJson1), getFixturePath(fileNameJson2))).toBe(expectedStylish)
})

test('diff for nested YAML files (stylish)', () => {
  expect(genDiff(getFixturePath(fileNameYaml1), getFixturePath(fileNameYaml2))).toBe(expectedStylish)
})

// --- plain ---
test('diff for nested JSON files (plain)', () => {
  expect(genDiff(getFixturePath(fileNameJson1), getFixturePath(fileNameJson2), 'plain')).toBe(expectedPlain)
})

test('diff for nested YAML files (plain)', () => {
  expect(genDiff(getFixturePath(fileNameYaml1), getFixturePath(fileNameYaml2), 'plain')).toBe(expectedPlain)
})

// --- json ---
test('diff for nested JSON files (json format)', () => {
  expect(genDiff(getFixturePath(fileNameJson1), getFixturePath(fileNameJson2), 'json')).toBe(expectedJson)
})

test('diff for nested YAML files (json format)', () => {
  expect(genDiff(getFixturePath(fileNameYaml1), getFixturePath(fileNameYaml2), 'json')).toBe(expectedJson)
})

// --- edge cases ---
test('diff for mixed JSON and YAML files', () => {
  expect(genDiff(getFixturePath(fileNameJson1), getFixturePath(fileNameYaml2))).toBe(expectedStylish)
})

test('throws on unknown format', () => {
  expect(() => genDiff(getFixturePath(fileNameJson1), getFixturePath(fileNameJson2), 'xml'))
    .toThrow('Unknown format: \'xml\'')
})
