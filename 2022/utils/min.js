function min(arr) {
  return arr.reduce((acc, elem) => (elem < acc ? elem : acc), 99999999999);
}

module.exports = min;
