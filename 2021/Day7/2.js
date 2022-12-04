const fs = require('fs');
const r = require('ramda');
const _ = require('lodash');

const data = fs.readFileSync('./inputTest.txt', {
  encoding: 'utf8',
  flag: 'r',
});

const dataArr = data.split(',').map((item) => Number(item));

const sum = r.sum(dataArr);
const min = _.min(dataArr);
const max = _.max(dataArr);

const avg = Math.round(sum / dataArr.length);
let minFuel = 100000000000;

for (let i = min; i < max + 1; i++) {
  const fuelSpent = dataArr.reduce((acc, num) => {
    const minNum = r.min(num, i);
    const maxNum = r.max(num, i);
    let fuel = 0;
    for (let j = minNum, f = 1; j < maxNum; j++, f++) {
      fuel += f;
    }
    return acc + fuel;
  }, 0);
  if (fuelSpent < minFuel) {
    minFuel = fuelSpent;
  }
}

//   const fuelSpent = dataArr.reduce((acc, num) => acc + Math.abs(num - i), 0);
//   console.log({ i, fuelSpent });
// }

console.log({ dataArr, sum, avg, minFuel });
