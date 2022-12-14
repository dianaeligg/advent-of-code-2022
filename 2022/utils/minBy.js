function minBy(arr, property) {
  return arr.reduce(
    (acc, elem) => (elem[property] < acc ? elem[property] : acc),
    99999999999
  );
}

module.exports = minBy;
