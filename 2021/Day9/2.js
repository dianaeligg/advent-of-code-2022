const fs = require('fs');
const r = require('ramda');
const _ = require('lodash');

const data = fs.readFileSync('./input.txt', {
  encoding: 'utf8',
  flag: 'r',
});

const lineLength = data.split('\n')[0].length;

const dataArr = data
  .split('')
  .filter((input) => input !== '\r' && input !== '\n')
  .map((input) => Number(input));

const lowPoints = [];
dataArr.forEach((digit, i) => {
  const isInFirstLine = i < lineLength;
  const isInFirstColumn = i % lineLength === 0;
  const isInLastLine = i >= dataArr.length - lineLength;
  const isInLastColumn = i % lineLength === lineLength - 1;
  if (
    (isInFirstColumn || digit < dataArr[i - 1]) &&
    (isInLastColumn || digit < dataArr[i + 1]) &&
    (isInFirstLine || digit < dataArr[i - lineLength]) &&
    (isInLastLine || digit < dataArr[i + lineLength])
  ) {
    lowPoints.push({
      value: digit,
      position: i,
      isInFirstLine,
      isInFirstColumn,
      isInLastLine,
      isInLastColumn,
    });
  }
});
console.log({ lowPoints }, _.sumBy(lowPoints, 'value'));

let howMany = 0;

const sloper = ({ value, position, prevSize, seenPositions = [] }) => {
  const slopes = [];
  const isInFirstLine = position < lineLength;
  const isInFirstColumn = position % lineLength === 0;
  const isInLastLine = position >= dataArr.length - lineLength;
  const isInLastColumn = position % lineLength === lineLength - 1;
  if (
    !isInFirstColumn &&
    dataArr[position - 1] > value &&
    dataArr[position - 1] !== 9 &&
    !seenPositions.includes(position - 1)
  ) {
    slopes.push({ value: value + 1, position: position - 1 });
    seenPositions.push(position - 1);
  }
  if (
    !isInLastColumn &&
    dataArr[position + 1] > value &&
    dataArr[position + 1] !== 9 &&
    !seenPositions.includes(position + 1)
  ) {
    slopes.push({ value: value + 1, position: position + 1 });
    seenPositions.push(position + 1);
  }
  if (
    !isInFirstLine &&
    dataArr[position - lineLength] > value &&
    dataArr[position - lineLength] !== 9 &&
    !seenPositions.includes(position - lineLength)
  ) {
    slopes.push({ value: value + 1, position: position - lineLength });
    seenPositions.push(position - lineLength);
  }
  if (
    !isInLastLine &&
    dataArr[position + lineLength] > value &&
    dataArr[position + lineLength] !== 9 &&
    !seenPositions.includes(position + lineLength)
  ) {
    slopes.push({ value: value + 1, position: position + lineLength });
    seenPositions.push(position + lineLength);
  }
  // console.log({ value, position, prevSize, slopes });
  if (slopes.length === 0) {
    // console.log('END', prevSize, position, value);
    howMany++;
    return prevSize + 1;
  } else {
    howMany++;
    // console.log('START', prevSize, position, value);
    slopes.forEach((slope) =>
      sloper({ ...slope, prevSize: prevSize + 1, seenPositions })
    );
    return prevSize + 1;
    // return prevSize + slopes.length;
  }
};

const howManies = [];

lowPoints.forEach(({ value, position }) => {
  howMany = 0;
  //1, 9, 22, 46
  // if (position === 9) {
  const size = sloper({
    value,
    position,
    prevSize: 0,
    seenPositions: [],
  });
  // console.log({ size, howMany });
  howManies.push(howMany);
  // console.log({ value, position, size });
  // }
});

const sortedArr = r.sort(function (a, b) {
  return b - a;
}, howManies);
const top3 = sortedArr.slice(0, 3);

console.log({ top3 });

// too low: 351900
const mult = top3.reduce((acc, num) => acc * num, 1);
console.log({ mult });
