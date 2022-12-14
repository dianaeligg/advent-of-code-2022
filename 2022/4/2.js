const fs = require('fs');

const file = process.argv[2] || 'input';

const data = fs.readFileSync(__dirname + `/input/${file}`, {
  encoding: 'utf8',
  flag: 'r',
});

const dataArr = data.split('\r\n');

const howMany = dataArr.reduce((acc, elem) => {
  const [one, two] = elem.split(',');
  const [oneMin, oneMax] = one.split('-').map((elem) => Number(elem));
  const [twoMin, twoMax] = two.split('-').map((elem) => Number(elem));

  if (oneMax >= twoMin && oneMin <= twoMin) {
    return acc + 1;
  }
  if (twoMax >= oneMin && twoMin <= oneMin) {
    return acc + 1;
  }
  return acc;
}, 0);

console.log({ howMany });
