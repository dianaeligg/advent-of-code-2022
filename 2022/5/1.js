const fs = require('fs');

const file = process.argv[2] || 'input';

const data = fs.readFileSync(`input/${file}`, {
  encoding: 'utf8',
  flag: 'r',
});

const dataArr = data.split('\r\n');

console.log({ dataArr });

const stackLength = Math.floor(dataArr[0].length / 4) + 1;

const stacks = {};

// index of blank line
const index = dataArr.findIndex((row) => row === '');

// get only the stack info
const stackInfo = dataArr.slice(0, index - 1);

stackInfo.forEach((row) => {
  for (i = 0; i < stackLength; i++) {
    if (row[i * 4 + 1] !== ' ') {
      if (!Array.isArray(stacks[i])) {
        stacks[i] = new Array();
      }
      stacks[i].unshift(row[i * 4 + 1]);
    }
  }
});

console.log({ stacks });

// get only the instructions
const instructions = dataArr.slice(index + 1, dataArr.length);

const instructionsArr = instructions.reduce((acc, elem, i) => {
  const [_, howMany, __, from, ___, to] = elem.split(' ');
  return [...acc, { howMany: Number(howMany), from: from - 1, to: to - 1 }];
}, []);

// TODO: iterate over instructionsObj

instructionsArr.forEach(({ howMany, from, to }) => {
  console.log({ howMany, from, to });
  for (i = 0; i < howMany; i++) {
    console.log({ from: stacks[from], to: stacks[to] });
    stacks[to].push(stacks[from].pop());
    console.log({ stacks });
  }
});

const final = Object.values(stacks)
  .map((stack) => stack[stack.length - 1])
  .join()
  .replace(/,/gi, '');

console.log({ final });
