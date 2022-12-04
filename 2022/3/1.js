const fs = require('fs');
const sum = require('../utils/sum');

const file = process.argv[2] || 'input';

const data = fs.readFileSync(`input/${file}`, {
  encoding: 'utf8',
  flag: 'r',
});

const dataArr = data.split('\r\n');

const rucksacks = dataArr.map((row) => [
  row.slice(0, row.length / 2),
  row.slice(row.length / 2, row.length),
]);

const repeated = rucksacks.map(([first, second]) => {
  console.log({ first });

  for (letter of first) {
    if (second.includes(letter)) {
      const letterScore = letter.charCodeAt(0);
      if (letterScore > 96) {
        return letterScore - 96;
      }
      return letterScore - 38;
    }
  }

  console.error('SHOULD NEVER HAPPEN', { first, second });
  return 0;
});

console.log({ repeated });
console.log({ sum: sum(repeated) });
