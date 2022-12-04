const fs = require('fs');
const min = require('../utils/min');

const file = process.argv[2] || 'input';

const data = fs.readFileSync(`input/${file}`, {
  encoding: 'utf8',
  flag: 'r',
});

const dataArr = data.split('\r\n');

const groups = [];

let total = 0;

for (i = 0; i < dataArr.length; i += 3) {
  const [first, second, third] = [dataArr[i], dataArr[i + 1], dataArr[i + 2]];

  for (letter of first) {
    if (second.includes(letter) && third.includes(letter)) {
      const letterScore = letter.charCodeAt(0);

      total += letterScore > 96 ? letterScore - 96 : letterScore - 38;
      break;
    }
  }
}

console.log({ total });
// console.log({ sum: sum(repeated) });
