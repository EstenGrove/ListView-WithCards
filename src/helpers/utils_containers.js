const convertSizes = (val = null, option) => {
  const BASE = 0.625 * 16; // 10
  if (isNaN(val) && val.constructor.name !== "String") {
    return option;
  }
  if (val.constructor.name === "String") {
    return val;
  }
  return val * BASE;
};

export { convertSizes };
