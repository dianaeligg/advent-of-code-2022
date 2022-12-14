const fs = require('fs');

const file = process.argv[2] || 'input';

const data = fs.readFileSync(`input/${file}`, {
  encoding: 'utf8',
  flag: 'r',
});

const dataArr = data.split('\r\n');

console.log({ dataArr });

dataArr.forEach((datastream) => {
  // getFirstMarker(datastream);
  console.log({ index: getFirstMarker(datastream) });
});

function getFirstMarker(data) {
  // const tempArr = data.slice(0, 4);
  // console.log({ tempArr });
  for (i = 4; i < data.length; i++) {
    const tempArr = data.slice(i - 4, i);
    const tempObj = tempArr.split('').reduce((acc, elem) => {
      acc[elem] = acc[elem] ? acc[elem] + 1 : 1;
      return acc;
    }, {});
    const hasRepeated = Object.values(tempObj).some((elem) => elem > 1);
    if (!hasRepeated) {
      return i;
    }
  }
  return -1;
}
