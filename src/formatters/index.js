import formatStylish from './stylish.js'
import formatPlain from './plain.js'
import formatJson from './json.js'

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
  json: formatJson,
}

const getFormatter = (formatName) => {
  if (!formatters[formatName]) {
    throw new Error(`Unknown format: '${formatName}'. Available formats: ${Object.keys(formatters).join(', ')}`)
  }
  return formatters[formatName]
}

export default getFormatter
