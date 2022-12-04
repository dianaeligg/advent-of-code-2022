const fs = require('fs');
const r = require('ramda');
const _ = require('lodash');

const data = fs.readFileSync('./input.txt', {
  encoding: 'utf8',
  flag: 'r',
});

const dataArr = data.split(',').map((item) => Number(item));

const sum = r.sum(dataArr);
const min = _.min(dataArr);
const max = _.max(dataArr);

const avg = Math.round(sum / dataArr.length);
let minFuel = 1000000;

for (let i = min; i < max + 1; i++) {
  const fuelSpent = dataArr.reduce((acc, num) => acc + Math.abs(num - i), 0);
  console.log({ i, fuelSpent });
  if (fuelSpent < minFuel) {
    minFuel = fuelSpent;
  }
}

console.log({ dataArr, sum, avg, minFuel });
