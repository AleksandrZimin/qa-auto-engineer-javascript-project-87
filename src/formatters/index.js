import formatStylish from './stylish.js'
import formatPlain from './plain.js'

const format = (diff, outputFormat) => {
  switch (outputFormat) {
    case 'stylish': return formatStylish(diff)
    case 'plain': return formatPlain(diff)
    case 'json': return JSON.stringify(diff, null, 2)
    default: throw new Error(`Unknown format: '${outputFormat}'`)
  }
}

export default format