import readFile from './readFile.js'
import parse from './parsers.js'
import getFormat from './getFormat.js'
import buildDiff from './buildDiff.js'
import getFormatter from './formatters/index.js'

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = readFile(filepath1)
  const format1 = getFormat(filepath1)
  const obj1 = parse(data1, format1)

  const data2 = readFile(filepath2)
  const format2 = getFormat(filepath2)
  const obj2 = parse(data2, format2)

  const diff = buildDiff(obj1, obj2)
  const formatter = getFormatter(formatName)
  return formatter(diff)
}

export default genDiff
