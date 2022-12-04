const fs = require('fs');
const r = require('ramda');
const _ = require('lodash');

const data = fs.readFileSync('./input.txt', {
  encoding: 'utf8',
  flag: 'r',
});

const lineLength = data.split('\n')[0].length;
console.log({ lineLength });

const dataArr = data
  .split('')
  .filter((input) => input !== '\r' && input !== '\n')
  .map((input) => Number(input));

const printGrid = (arr = []) => {
  console.log();
  for (let i = 0; i < arr.length; i += lineLength) {
    console.log(arr.slice(i, i + lineLength));
  }
  console.log();
};

const getHowManyAdjacentZeroes = (i, arr) => {
  const isInFirstLine = i < lineLength;
  const isInFirstColumn = i % lineLength === 0;
  const isInLastLine = i >= arr.length - lineLength;
  const isInLastColumn = i % lineLength === lineLength - 1;
  let howMany = 0;

  //left
  if (!isInFirstColumn && arr[i - 1] === 0) {
    howMany++;
  }
  //right
  if (!isInLastColumn && arr[i + 1] === 0) {
    howMany++;
  }
  //top
  if (!isInFirstLine && arr[i - lineLength] === 0) {
    howMany++;
  }
  //bottom
  if (!isInLastLine && arr[i + lineLength] === 0) {
    howMany++;
  }

  //top-left
  if (!isInFirstColumn && !isInFirstLine && arr[i - 1 - lineLength] === 0) {
    howMany++;
  }
  //top-right
  if (!isInLastColumn && !isInFirstLine && arr[i + 1 - lineLength] === 0) {
    howMany++;
  }

  //bottom-left
  if (!isInFirstColumn && !isInLastLine && arr[i - 1 + lineLength] === 0) {
    howMany++;
  }
  //bottom-right
  if (!isInLastLine && !isInLastColumn && arr[i + 1 + lineLength] === 0) {
    howMany++;
  }
  // console.log({ i, howMany });
  return howMany;
};

let howMany = 0;

const blowUp = (i, arr) => {
  howMany++;
  const isInFirstLine = i < lineLength;
  const isInFirstColumn = i % lineLength === 0;
  const isInLastLine = i >= arr.length - lineLength;
  const isInLastColumn = i % lineLength === lineLength - 1;

  const zeroes = [];
  const left = arr[i - 1];
  if (!isInFirstColumn && left !== 0) {
    const value = (left + 1) % 10;
    if (value === 0) {
      zeroes.push(i - 1);
    }
    arr[i - 1] = value;
  }
  const right = arr[i + 1];
  if (!isInLastColumn && right !== 0) {
    const value = (right + 1) % 10;
    if (value === 0) {
      zeroes.push(i + 1);
    }
    arr[i + 1] = value;
  }
  const top = arr[i - lineLength];
  if (!isInFirstLine && top !== 0) {
    const value = (top + 1) % 10;
    if (value === 0) {
      zeroes.push(i - lineLength);
    }
    arr[i - lineLength] = value;
  }
  const bottom = arr[i + lineLength];
  if (!isInLastLine && bottom !== 0) {
    const value = (bottom + 1) % 10;
    if (value === 0) {
      zeroes.push(i + lineLength);
    }
    arr[i + lineLength] = value;
  }

  const topLeft = arr[i - 1 - lineLength];
  if (!isInFirstColumn && !isInFirstLine && topLeft !== 0) {
    const value = (topLeft + 1) % 10;
    if (value === 0) {
      zeroes.push(i - 1 - lineLength);
    }
    arr[i - 1 - lineLength] = value;
  }
  const topRight = arr[i + 1 - lineLength];
  if (!isInLastColumn && !isInFirstLine && topRight !== 0) {
    const value = (topRight + 1) % 10;
    if (value === 0) {
      zeroes.push(i + 1 - lineLength);
    }
    arr[i + 1 - lineLength] = value;
  }

  const bottomLeft = arr[i - 1 + lineLength];
  if (!isInFirstColumn && !isInLastLine && bottomLeft !== 0) {
    const value = (bottomLeft + 1) % 10;
    if (value === 0) {
      zeroes.push(i - 1 + lineLength);
    }
    arr[i - 1 + lineLength] = value;
  }
  const bottomRight = arr[i + 1 + lineLength];
  if (!isInLastLine && !isInLastColumn && bottomRight !== 0) {
    const value = (bottomRight + 1) % 10;
    if (value === 0) {
      zeroes.push(i + 1 + lineLength);
    }
    arr[i + 1 + lineLength] = value;
  }
  // console.log({ i });
  // printGrid(arr);
  // console.log({ i, zeroes });
  zeroes.forEach((position) => blowUp(position, arr));
};

const flashArr = (arr) => {
  const upgradedArr = arr.map((digit) => (digit + 1) % 10);

  const zeroes = upgradedArr
    .map((digit, position) => ({ digit, position }))
    .filter(({ digit }) => digit === 0);

  zeroes.forEach(({ position }) => blowUp(position, upgradedArr));
  // printGrid(upgradedArr, lineLength);
  return upgradedArr;
};

let flashedArr = dataArr;
for (i = 0; i < 100; i++) {
  flashedArr = flashArr(flashedArr);
}

console.log({ howMany });
