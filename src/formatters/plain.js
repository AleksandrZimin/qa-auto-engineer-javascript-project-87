import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return String(value);
};

// Пункт 5: отдельная функция для формирования пути
const buildPath = (path, key) => (path ? `${path}.${key}` : key);

const formatPlain = (diff, path = '') => {
  const lines = diff
    .filter((node) => node.type !== 'unchanged')
    .map((node) => {
      const fullPath = buildPath(path, node.key);
      switch (node.type) {
        case 'added':
          return `Property '${fullPath}' was added with value: ${formatValue(node.value)}`;
        case 'removed':
          return `Property '${fullPath}' was removed`;
        case 'changed':
          return `Property '${fullPath}' was updated. From ${formatValue(node.value1)} to ${formatValue(node.value2)}`;
        case 'nested':
          return formatPlain(node.children, fullPath);
        default:
          throw new Error(`Unknown node type: ${node.type}`);
      }
    });
  return lines.join('\n');
};

export default formatPlain;