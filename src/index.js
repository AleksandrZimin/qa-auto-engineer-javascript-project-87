// import readFile from './readFile.js';
// import parse from './parsers.js';
// import getFormat from './getFormat.js';
// import _ from 'lodash';

// const genDiff = (filepath1, filepath2) => {
//   const data1 = readFile(filepath1);
//   const data2 = readFile(filepath2);

//   const format1 = getFormat(filepath1);
//   const format2 = getFormat(filepath2);

//   const obj1 = parse(data1, format1);
//   const obj2 = parse(data2, format2);

//   const allKeys = _.sortBy([...new Set([...Object.keys(obj1), ...Object.keys(obj2)])]);

//   const lines = allKeys.flatMap((key) => {
//     const val1 = obj1[key];
//     const val2 = obj2[key];

//     if (val1 === undefined) return [`+ ${key}: ${val2}`];
//     if (val2 === undefined) return [`- ${key}: ${val1}`]; 
//     if (val1 !== val2) return [`- ${key}: ${val1}`, `+ ${key}: ${val2}`];
//     return [`  ${key}: ${val1}`]; 
//   });

//   return ['{', ...lines, '}'].join('\n');
// };

// export default genDiff;

import readFile from './readFile.js';
import parse from './parsers.js';
import getFormat from './getFormat.js';
import buildDiff from './buildDiff.js';
import formatStylish from './formatters/stylish.js';

const genDiff = (filepath1, filepath2, formatter = formatStylish) => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);

  const obj1 = parse(data1, getFormat(filepath1));
  const obj2 = parse(data2, getFormat(filepath2));

  const diff = buildDiff(obj1, obj2);
  return formatter(diff);
};

export default genDiff;