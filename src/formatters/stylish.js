const getIndent = (depth) => ' '.repeat(depth * 4 - 2);
const getBracketIndent = (depth) => ' '.repeat(depth * 4 - 4);

const formatValue = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return String(value);
  }
  const lines = Object.entries(value).map(
    ([k, v]) => `${getIndent(depth + 1)}  ${k}: ${formatValue(v, depth + 1)}`
  );
  return ['{', ...lines, `${getBracketIndent(depth + 1)}}`].join('\n');
};

const formatStylish = (diff, depth = 1) => {
  const lines = diff.map((node) => {
    const indent = getIndent(depth);
    switch (node.type) {
      case 'added':
        return `${indent}+ ${node.key}: ${formatValue(node.value, depth)}`;
      case 'removed':
        return `${indent}- ${node.key}: ${formatValue(node.value, depth)}`;
      case 'changed':
        return [
          `${indent}- ${node.key}: ${formatValue(node.oldValue, depth)}`,
          `${indent}+ ${node.key}: ${formatValue(node.newValue, depth)}`,
        ].join('\n');
      case 'unchanged':
        return `${indent}  ${node.key}: ${formatValue(node.value, depth)}`;
      case 'nested':
        return `${indent}  ${node.key}: ${formatStylish(node.children, depth + 1)}`;
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });

  return ['{', ...lines, `${getBracketIndent(depth)}}`].join('\n');
};

export default formatStylish;