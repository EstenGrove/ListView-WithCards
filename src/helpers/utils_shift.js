const findShiftID = shift => {
  if (shift === "AM") return 1;
  if (shift === "PM") return 2;
  if (shift === "NOC") return 3;
  return 4;
};

const findShiftName = id => {
  if (id === 1) return "AM";
  if (id === 2) return "PM";
  if (id === 3) return "NOC";
  return "ANY";
};

export { findShiftID, findShiftName };
