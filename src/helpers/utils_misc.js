// #CALCULATIONS
const getPercentage = (count, completed) => {
  return Math.round(((completed / count) * 100).toFixed(2)) + "%";
};

const getAvg = arr => arr.reduce((acc, cur) => acc + cur / arr.length, 0);

// get various counts: COMPLETED, PENDING, NOT-COMPLETE, MISSED-EVENT
const getCount = (tasks, status) => {
  return tasks.filter((task, index) => task.TaskStatus === status).length;
};
// pass a condition you DONT wont to match (ie all that DONT meet condition)
const getRemaining = (list, condition) => {
  return list.filter((item, index) => item.TaskStatus !== condition).length;
};

const getCompletedCount = tasks =>
  tasks.filter(task => task.IsCompleted === true).length;

//  #STRING HELPERS
const addEllipsis = (val, desiredLength) => {
  if (val.length <= desiredLength) return val;
  return val.slice(0, desiredLength) + "...";
};

// #DATA TYPE HELPERS
const replaceNullWithMsg = (val, msg) => {
  if (!val || val === null) return msg;
  return val;
};

export {
  getCompletedCount,
  getPercentage,
  getAvg,
  getRemaining,
  getCount,
  addEllipsis,
  replaceNullWithMsg
};
