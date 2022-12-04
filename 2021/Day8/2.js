const fs = require('fs');
const r = require('ramda');
const _ = require('lodash');

const data = fs.readFileSync('./input.txt', {
  encoding: 'utf8',
  flag: 'r',
});

const dataArr = data.split('\n');

// const dataArr = [
//   'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf',
// ];

let howMany = 0;
dataArr.forEach((line) => {
  const [first, second] = line.split(' | ');
  const firstArr = first.split(' ');
  const lengthSix = firstArr.filter((input) => input.length === 6);
  const lengthFive = firstArr.filter((input) => input.length === 5);

  const one = firstArr.find((input) => input.length === 2).split('');
  const four = firstArr.find((input) => input.length === 4).split('');
  const seven = firstArr.find((input) => input.length === 3).split('');
  const eight = firstArr.find((input) => input.length === 7).split('');
  let six = lengthSix
    .find((num) => _.intersection(num.split(''), one).length !== 2)
    .split('');
  let nine = lengthSix
    .find((num) => _.intersection(num.split(''), four).length === 4)
    .split('');
  let zero = lengthSix
    .find(
      (num) => !r.equals(num.split(''), six) && !r.equals(num.split(''), nine)
    )
    .split('');

  let three = lengthFive
    .find((num) => _.intersection(num.split(''), one).length === 2)
    .split('');

  let five = lengthFive
    .find((num) => _.intersection(num.split(''), six).length === 5)
    .split('');

  let two = lengthFive
    .find(
      (num) => !r.equals(num.split(''), three) && !r.equals(num.split(''), five)
    )
    .split('');

  const nums = [
    zero.sort().join(''),
    one.sort().join(''),
    two.sort().join(''),
    three.sort().join(''),
    four.sort().join(''),
    five.sort().join(''),
    six.sort().join(''),
    seven.sort().join(''),
    eight.sort().join(''),
    nine.sort().join(''),
  ];
  const digits = second.split(' ');
  const decoded = digits.reduce((acc, digit) => {
    const sortedDigit = digit.split('').sort().join('');
    return acc + nums.indexOf(sortedDigit);
  }, '');
  howMany += Number(decoded);
});

console.log({ howMany });
