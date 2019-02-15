function sumValue(data, keyValue) {
  return data.reduce((acc, cur) => {
    return acc + Number.parseFloat(cur[keyValue]);
  }, 0);
}

module.exports = {
  sumValue
};
