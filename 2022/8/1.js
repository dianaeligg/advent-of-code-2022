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

const visibleTrees = [];

const visibleTreeCount = dataSingleArr.reduce((acc, tree, i) => {
  console.log({ i, width, '%': i % width, tree });
  // trees on the left
  if (i % width === 0) {
    console.log(`tree ${i} is visible from the left`);
    return addItem(i, visibleTrees) ? acc + 1 : acc;
  }
  // trees on the right
  if (i % width === width - 1) {
    console.log(`tree ${i} is visible from the right`);
    return addItem(i, visibleTrees) ? acc + 1 : acc;
  }
  // trees on the top
  if (i < width) {
    console.log(`tree ${i} is visible from the top`);
    return addItem(i, visibleTrees) ? acc + 1 : acc;
  }
  // trees on the bottom
  if (i > dataSingleArr.length - width) {
    console.log(`tree ${i} is visible from the bottom`);
    return addItem(i, visibleTrees) ? acc + 1 : acc;
  }

  // is visible from the left
  let visible = true;
  for (j = i - 1; j % width < i % width; j--) {
    if (tree <= dataSingleArr[j]) {
      console.log(`tree ${i} is blocked by tree ${j} from the left`);
      visible = false;
      break;
    }
  }
  if (visible) {
    console.log(`tree ${i} is visible from the left`);
    return addItem(i, visibleTrees) ? acc + 1 : acc;
  }

  // is visible from the right
  visible = true;
  for (j = i + 1; j % width > i % width; j++) {
    if (tree <= dataSingleArr[j]) {
      console.log(`tree ${i} is blocked by tree ${j} from the right`);
      visible = false;
      break;
    }
  }
  if (visible) {
    console.log(`tree ${i} is visible from the right`);
    return addItem(i, visibleTrees) ? acc + 1 : acc;
  }

  // is visible from the top
  visible = true;
  for (j = i - width; j > 0; j = j - width) {
    if (tree <= dataSingleArr[j]) {
      console.log(`tree ${i} is blocked by tree ${j} from the top`);
      visible = false;
      break;
    }
  }
  if (visible) {
    console.log(`tree ${i} is visible from the top`);
    return addItem(i, visibleTrees) ? acc + 1 : acc;
  }

  // is visible from the bottom
  visible = true;
  for (j = i + width; j < dataSingleArr.length; j = j + width) {
    if (tree <= dataSingleArr[j]) {
      console.log(`tree ${i} is blocked by tree ${j} from the bottom`);
      visible = false;
      break;
    }
  }
  if (visible) {
    console.log(`tree ${i} is visible from the bottom`);
    return addItem(i, visibleTrees) ? acc + 1 : acc;
  }

  return acc;
}, 0);

console.log({ visibleTrees, visibleTreeCount });
