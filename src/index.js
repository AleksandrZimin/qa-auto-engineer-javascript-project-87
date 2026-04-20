import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import buildDiff from './buildDiff.js'
import format from './formatters/index.js'

const readFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath)
  const content = fs.readFileSync(absolutePath, 'utf-8')
  const inputFormat = path.extname(filepath).slice(1)

  switch (inputFormat) {
    case 'json': return JSON.parse(content)
    case 'yml':
    case 'yaml': return yaml.load(content)
    default: throw new Error(`Unknown input format: '${inputFormat}'`)
  }
}

const genDiff = (filepath1, filepath2, outputFormat = 'stylish') => {
  const data1 = readFile(filepath1)
  const data2 = readFile(filepath2)
  const diff = buildDiff(data1, data2)
  return format(diff, outputFormat)
}

export default genDiff