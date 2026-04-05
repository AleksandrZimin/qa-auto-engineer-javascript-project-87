import path from 'path'

const getFormat = filepath => {
  return path.extname(filepath).slice(1)
}

export default getFormat
