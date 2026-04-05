const formatStylish = (diff) => {
  const lines = diff.map((node) => {
    switch (node.type) {
      case 'added':
        return `  + ${node.key}: ${node.value}`;
      case 'removed':
        return `  - ${node.key}: ${node.value}`;
      case 'changed':
        return `  - ${node.key}: ${node.oldValue}\n  + ${node.key}: ${node.newValue}`;
      case 'unchanged':
        return `    ${node.key}: ${node.value}`;
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });

  return ['{', ...lines, '}'].join('\n');
};

export default formatStylish;