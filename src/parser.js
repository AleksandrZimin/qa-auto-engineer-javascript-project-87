import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
};

const parse = (content, format) => {
  const parser = parsers[format];
  if (!parser) {
    throw new Error(`Unknown format: ${format}`);
  }
  return parser(content);
};

export default parse;