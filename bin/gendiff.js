// import { Command } from 'commander';
// import genDiff from '../src/index.js';

// const program = new Command();

// program
//   .name('gendiff')
//   .description('Compares two configuration files and shows a difference.')
//   .version('1.0.0')
//   .argument('<filepath1>')
//   .argument('<filepath2>')
//   .option('-f, --format <type>', 'output format')
//   .helpOption('-h, --help', 'output usage information')
//   .action((filepath1, filepath2, options) => {
//     const result = genDiff(filepath1, filepath2, options.format);
//     console.log(result);
//   });

// program.parse(process.argv);


import { Command } from 'commander';
import genDiff from '../src/index.js';
import formatStylish from '../src/formatters/stylish.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format', 'stylish') // 'stylish' — значение по умолчанию
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const { format } = program.opts();
    // Пока только stylish — на следующих шагах добавим выбор по имени
    console.log(genDiff(filepath1, filepath2, formatStylish));
  });

program.parse(process.argv);