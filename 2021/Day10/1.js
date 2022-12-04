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

const errors = [];
dataArr.forEach((line, lineIndex) => {
  const openings = [];
  // line.split('').forEach((symbol) => {
  for (let i = 0; i < line.length; i++) {
    const symbol = line[i];
    if (!isClosing(symbol)) {
      openings.push(symbol);
    } else {
      const lastOpening = openings[openings.length - 1];
      const partners = arePartners({ open: lastOpening, close: symbol });
      // console.log({ lastOpening, symbol, partners });
      if (partners) {
        openings.pop();
      } else {
        console.log({ symbol, lineIndex });
        errors.push(symbol);
        break;
      }
    }
  }
});

const points = (symbol) => {
  if (symbol === ')') {
    return 3;
  } else if (symbol === ']') {
    return 57;
  } else if (symbol === '}') {
    return 1197;
  } else if (symbol === '>') {
    return 25137;
  }
};

console.log(_.sum(errors.map((symbol) => points(symbol))));
