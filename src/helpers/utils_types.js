// check string or number
const isEmptyVal = val => {
  if (!val || val === "" || val === null) return true;
  return false;
};
// check object
const isEmptyObj = obj => {
  if (typeof obj !== "object") return `NOT AN OBJECT: ${typeof obj}`;
  if (!obj || obj === null || !Object.keys(obj).length) return true;
  return false;
};
// check array
const isEmptyArray = arr => {
  if (!Array.isArray(arr)) return `NOT AN ARRAY: ${typeof arr}`;
  if (!arr || !arr.length || arr.length === 0) return true;
  return false;
};

const hasProperty = (obj, prop) => {
  if (isEmptyObj(obj)) return false;
  if (obj.constructor.name === "Array") return false;
  if (!obj.hasOwnProperty(prop)) return false;
  return true;
};

const handleEmpties = val => {
  if (isEmptyArray(val)) return [];
  return [...val];
};

export { isEmptyArray, isEmptyObj, isEmptyVal, handleEmpties, hasProperty };
