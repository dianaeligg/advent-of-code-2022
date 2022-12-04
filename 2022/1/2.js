const fs = require('fs');

const data = fs.readFileSync('input/input', {
  encoding: 'utf8',
  flag: 'r',
});

const dataArr = data.split('\r\n');

let maxElfCalories = [0, 0, 0];

let currentElf = 0;
for (elf of dataArr) {
  if (elf === '') {
    if (currentElf > maxElfCalories[0]) {
      maxElfCalories[2] = maxElfCalories[1];
      maxElfCalories[1] = maxElfCalories[0];
      maxElfCalories[0] = currentElf;
    } else if (currentElf > maxElfCalories[1]) {
      maxElfCalories[2] = maxElfCalories[1];
      maxElfCalories[1] = currentElf;
    } else if (currentElf > maxElfCalories[2]) {
      maxElfCalories[2] = currentElf;
    }
    currentElf = 0;
    continue;
  }
  currentElf += Number(elf);
}

console.log({ maxElfCalories });

const sum = maxElfCalories.reduce((acc, elem) => acc + elem, 0);

console.log({ sum });

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
