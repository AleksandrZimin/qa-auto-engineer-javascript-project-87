import readFile from './readFile.js'
import parse from './parsers.js'
import getFormat from './getFormat.js'
import buildDiff from './buildDiff.js'
import getFormatter from './formatters/index.js'

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const obj1 = parse(readFile(filepath1), getFormat(filepath1))
  const obj2 = parse(readFile(filepath2), getFormat(filepath2))

  const diff = buildDiff(obj1, obj2)
  const formatter = getFormatter(formatName)
  return formatter(diff)
}

export default genDiff
