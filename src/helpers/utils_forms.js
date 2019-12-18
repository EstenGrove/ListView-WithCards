import { isEmptyVal, isEmptyObj } from "./utils_types";

const isValidForm = (vals = {}) => {
  if (isEmptyObj(vals)) return false;
  const results = Object.keys(vals).map((key, index) => {
    if (isEmptyVal(vals[key])) {
      return false;
    }
    return true;
  });
  if (results.includes(false)) return false;
  return true;
};

export { isValidForm };
