const fs = require('fs');
const r = require('ramda');
const _ = require('lodash');

const data = fs.readFileSync('./input.txt', {
  encoding: 'utf8',
  flag: 'r',
});

const dataArr = data.split('\n');

// console.log({ dataArr });

const isClosing = (symbol) => ')]}>'.includes(symbol);

const arePartners = ({ open, close }) =>
  (open === '(' && close === ')') ||
  (open === '[' && close === ']') ||
  (open === '{' && close === '}') ||
  (open === '<' && close === '>');

const points = (symbol) => {
  if (symbol === ')') {
    return 1;
  } else if (symbol === ']') {
    return 2;
  } else if (symbol === '}') {
    return 3;
  } else if (symbol === '>') {
    return 4;
  }
};

const getPartner = (symbol) => {
  if (symbol === '(') {
    return ')';
  } else if (symbol === '[') {
    return ']';
  } else if (symbol === '{') {
    return '}';
  } else if (symbol === '<') {
    return '>';
  }
};
const errors = [];
const scores = [];
dataArr.forEach((line, lineIndex) => {
  const openings = [];
  let error = false;
  // line.split('').forEach((symbol) => {
  for (let i = 0; i < line.length; i++) {
    const symbol = line[i];
    if (!isClosing(symbol)) {
      openings.push(symbol);
    } else {
      const lastOpening = openings[openings.length - 1];
      const partners = arePartners({ open: lastOpening, close: symbol });
      if (partners) {
        openings.pop();
      } else {
        errors.push(symbol);
        error = true;
        break;
      }
    }
  }
  if (!error) {
    const reversedOpenings = openings
      .reverse()
      .map((symbol) => getPartner(symbol));

    const score = reversedOpenings.reduce(
      (acc, symbol) => acc * 5 + points(symbol),
      0
    );
    scores.push(score);
  }
});

const sortedScores = r.sort(function (a, b) {
  return b - a;
}, scores);

console.log(sortedScores.length);
// 3639816818 too low
console.log(sortedScores[Math.floor(sortedScores.length / 2)]);
