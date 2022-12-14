const fs = require('fs');

const file = process.argv[2] || 'input';

const data = fs.readFileSync(`input/${file}`, {
  encoding: 'utf8',
  flag: 'r',
});

const dataArr = data.split('\r\n');
const width = dataArr[0].length;
const height = dataArr.length;

const dataSingleArr = dataArr.join('').split('');

console.log({ dataArr, dataSingleArr, width, height });

function addItem(i, arr) {
  if (!arr.includes(i)) {
    arr.push(i);
    return true;
  }
  return false;
}

const visibleTreeCount = dataSingleArr.reduce((acc, tree, i) => {
  console.log({ i, width, '%': i % width, tree });
  // trees on the left
  if (i % width === 0) {
    return acc;
  }
  // trees on the right
  if (i % width === width - 1) {
    return acc;
  }
  // trees on the top
  if (i < width) {
    return acc;
  }
  // trees on the bottom
  if (i > dataSingleArr.length - width) {
    return acc;
  }

  // score from left
  let leftScore = 0;
  for (j = i - 1; j % width < i % width && j > 0; j--) {
    leftScore++;
    // console.log('score', { i, j });
    if (tree <= dataSingleArr[j]) {
      break;
    }
  }
  // score from right
  let rightScore = 0;
  for (j = i + 1; j % width > i % width; j++) {
    rightScore++;
    if (tree <= dataSingleArr[j]) {
      break;
    }
  }
  // score from top
  let topScore = 0;
  for (j = i - width; j > 0; j = j - width) {
    topScore++;
    if (tree <= dataSingleArr[j]) {
      break;
    }
  }
  // score from bottom
  let bottomScore = 0;
  for (j = i + width; j < dataSingleArr.length; j = j + width) {
    bottomScore++;
    if (tree <= dataSingleArr[j]) {
      break;
    }
  }
  const score = topScore * leftScore * bottomScore * rightScore;
  console.log({ i, topScore, leftScore, bottomScore, rightScore, score });

  return score > acc ? score : acc;
}, -99999999999999);

console.log({ visibleTreeCount });
