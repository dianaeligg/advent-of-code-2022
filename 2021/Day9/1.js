const fs = require('fs');
const r = require('ramda');
const _ = require('lodash');

const data = fs.readFileSync('./inputTest.txt', {
  encoding: 'utf8',
  flag: 'r',
});

const lineLength = data.split('\r\n')[0].length;

const dataArr = data
  .split('')
  .filter((input) => input !== '\r' && input !== '\n');

const lowPoints = [];
dataArr.forEach((digit, i) => {
  const isInFirstLine = i < lineLength;
  const isInFirstColumn = i % lineLength === 0;
  const isInLastLine = i >= dataArr.length - lineLength;
  const isInLastColumn = i % lineLength === lineLength - 1;
  // console.log({
  //   digit,
  //   i,
  //   isInFirstLine,
  //   isInFirstColumn,
  //   isInLastLine,
  //   isInLastColumn,
  // });

  if (
    (isInFirstColumn || digit < dataArr[i - 1]) &&
    (isInLastColumn || digit < dataArr[i + 1]) &&
    (isInFirstLine || digit < dataArr[i - lineLength]) &&
    (isInLastLine || digit < dataArr[i + lineLength])
  ) {
    lowPoints.push(Number(digit) + 1);
  }
});
// console.log({ lineLength });
console.log({ lowPoints }, r.sum(lowPoints));
