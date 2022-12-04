const fs = require('fs');
const mapKeyToScore = require('./mapKeyToScore');
const sum = require('../utils/sum');

const file = process.argv[2] || 'input';

const data = fs.readFileSync(`input/${file}`, {
  encoding: 'utf8',
  flag: 'r',
});

const dataArr = data.split('\r\n');

const scores = dataArr.map(mapKeyToScore);

console.log(sum(scores));
