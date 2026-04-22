import fs from 'fs'
import path from 'path'
import buildDiff from './buildDiff.js'
import format from './formatters/index.js'
import parse from './parser.js'

const readFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath)
  return fs.readFileSync(absolutePath, 'utf-8')
}

const getFormat = (filepath) => path.extname(filepath).slice(1).toLowerCase()

const genDiff = (filepath1, filepath2, outputFormat = 'stylish') => {
  const content1 = readFile(filepath1)
  const content2 = readFile(filepath2)

  const data1 = parse(content1, getFormat(filepath1))
  const data2 = parse(content2, getFormat(filepath2))
  const diff = buildDiff(data1, data2)

  return format(diff, outputFormat)
}

export default genDiff
