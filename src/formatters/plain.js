const formatValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const formatPlain = (diff) => {
  const lines = diff
    .filter((node) => node.type !== 'unchanged')
    .map((node) => {
      switch (node.type) {
        case 'added':
          return `Property '${node.key}' was added with value: ${formatValue(node.value)}`;
        case 'removed':
          return `Property '${node.key}' was removed`;
        case 'changed':
          return `Property '${node.key}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
        default:
          throw new Error(`Unknown node type: ${node.type}`);
      }
    });

  return lines.join('\n');
};

export default formatPlain;