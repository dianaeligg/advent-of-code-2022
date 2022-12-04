const fs = require('fs');

const data = fs.readFileSync('input/input', {
  encoding: 'utf8',
  flag: 'r',
});

const dataArr = data.split('\r\n');

const elfCalories = [];
let maxElfCalories = 0;

let currentElf = 0;
for (elf of dataArr) {
  console.log({ elf });
  if (elf === '') {
    if (currentElf > maxElfCalories) {
      maxElfCalories = currentElf;
    }
    elfCalories.push(currentElf);
    currentElf = 0;
    continue;
  }
  currentElf += Number(elf);
}

console.log({ maxElfCalories });

// const sum = r.sum(dataArr);
// const min = _.min(dataArr);
// const max = _.max(dataArr);

// const avg = Math.round(sum / dataArr.length);
// let minFuel = 1000000;

// for (let i = min; i < max + 1; i++) {
//   const fuelSpent = dataArr.reduce((acc, num) => acc + Math.abs(num - i), 0);
//   console.log({ i, fuelSpent });
//   if (fuelSpent < minFuel) {
//     minFuel = fuelSpent;
//   }
// }

// console.log({ dataArr, sum, avg, minFuel });
