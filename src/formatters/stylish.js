import _ from 'lodash';

// Пункт 4: константа и функция для отступов
const INDENT_SIZE = 4;
const getIndent = (depth) => ' '.repeat(INDENT_SIZE * depth);

const formatValue = (value, depth) => {
  if (!_.isObject(value)) return String(value);
  const indent = getIndent(depth + 1);
  const closingIndent = getIndent(depth);
  const lines = Object.entries(value).map(
    ([key, val]) => `${indent}${key}: ${formatValue(val, depth + 1)}`,
  );
  return `{\n${lines.join('\n')}\n${closingIndent}}`;
};

const formatStylish = (diff, depth = 0) => {
  const indent = getIndent(depth);
  const lines = diff.map((node) => {
    switch (node.type) {
      case 'added':
        return `${indent}  + ${node.key}: ${formatValue(node.value, depth + 1)}`;
      case 'removed':
        return `${indent}  - ${node.key}: ${formatValue(node.value, depth + 1)}`;
      case 'changed':
        return [
          `${indent}  - ${node.key}: ${formatValue(node.value1, depth + 1)}`,
          `${indent}  + ${node.key}: ${formatValue(node.value2, depth + 1)}`,
        ].join('\n');
      case 'nested':
        return `${indent}    ${node.key}: ${formatStylish(node.children, depth + 1)}`;
      case 'unchanged':
        return `${indent}    ${node.key}: ${formatValue(node.value, depth + 1)}`;
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });
  return `{\n${lines.join('\n')}\n${indent}}`;
};

export default formatStylish;