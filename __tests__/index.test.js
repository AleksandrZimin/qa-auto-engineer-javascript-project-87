import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)

const expectedStylish = fs.readFileSync(getFixturePath('result_stylish.txt'), 'utf-8').trimEnd()
const expectedPlain = fs.readFileSync(getFixturePath('result_plain.txt'), 'utf-8').trimEnd()
const expectedJson = fs.readFileSync(getFixturePath('result_json.json'), 'utf-8').trimEnd()

const inputPairs = [
  ['file3.json', 'file4.json'],
  ['file3.yml', 'file4.yml'],
  ['file3.json', 'file4.yml'],
]

describe('genDiff', () => {
  test.each(inputPairs)('stylish: %s + %s', (file1, file2) => {
    expect(genDiff(getFixturePath(file1), getFixturePath(file2))).toBe(expectedStylish)
  })

  test.each(inputPairs)('plain: %s + %s', (file1, file2) => {
    expect(genDiff(getFixturePath(file1), getFixturePath(file2), 'plain')).toBe(expectedPlain)
  })

  test.each(inputPairs)('json: %s + %s', (file1, file2) => {
    expect(genDiff(getFixturePath(file1), getFixturePath(file2), 'json')).toBe(expectedJson)
  })

  test('throws on unknown format', () => {
    expect(() => genDiff(getFixturePath('file3.json'), getFixturePath('file4.json'), 'xml'))
      .toThrow("Unknown format: \'xml\'")
  })
})
