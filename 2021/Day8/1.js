const fs = require('fs');
const r = require('ramda');
const _ = require('lodash');

const data = fs.readFileSync('./input.txt', {
  encoding: 'utf8',
  flag: 'r',
});

const dataArr = data.split('\n');

let howMany = 0;
dataArr.forEach((line) => {
  const part = line.split(' | ')[1];
  console.log({ line });
  const oneFourSevenEight = part
    .split(' ')
    .filter(
      (digit) =>
        digit.length === 2 ||
        digit.length === 3 ||
        digit.length === 4 ||
        digit.length === 7
    ).length;
  howMany += oneFourSevenEight;
});

console.log({ dataArr, howMany });
