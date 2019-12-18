import {
  get,
  save,
  update,
  insert,
  remove,
  count,
  status,
  unscheduled,
  tracking,
  reassess
} from "./utils_endpoints";
import { test } from "./utils_env";
import { isEmptyArray, isEmptyVal, hasProperty } from "./utils_types";
import { getCategoryID } from "./utils_categories";
import { format } from "date-fns";
import { findStatusID, findStatusNameFromID } from "./utils_status";

// CRUD operations for tasks.

/**
 * @description "CREATE" request to create and save one or more new task records
 * @param {string} token base64 encoded auth token
 * @param {object} params query params; includes DB and table name
 * @param {array} tasks array of AssessmentUnscheduleTask models with updated values to save to database
 */
const saveUnscheduledTasks = async (token, params, tasks) => {
  let url = test.base + unscheduled.task;
  if (params) url += "?" + new URLSearchParams(params);

  try {
    const request = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(test.user + ":" + test.password),
        SecurityToken: token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tasks)
    });
    const response = await request.json();
    return response;
  } catch (err) {
    console.log("An error occurred", err);
    return err.message;
  }
};

/**
 * @description "READ" request to fetch active tasks
 * @param {string} token base64 encoded auth token
 * @param {object} params query params; includes DB and table name
 */
const getTrackingTasks = async (token, params) => {
  let url = test.base + get.taskMany;
  url += "?" + new URLSearchParams(params);

  try {
    const request = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(test.user + ":" + test.password),
        SecurityToken: token,
        "Content-Type": "application/json"
      }
    });
    const response = await request.json();
    return response;
  } catch (err) {
    return console.log("An error occurred ", err.message);
  }
};

/**
 * @description "UPDATE" request to update one or more AssessmentTrackingTask records
 * @param {string} token base64 encode auth token
 * @param {object} params query params; includes DB and table name
 * @param {array} taskToSave AssessmentTrackingTask model with updated values to submit to server
 */
const updateTrackingTasks = async (token, params, tasksToUpdate) => {
  let url = test.base + save.taskMany;
  url += "?" + new URLSearchParams(params);

  try {
    const request = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(test.user + ":" + test.password),
        SecurityToken: token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tasksToUpdate)
    });
    const response = await request.json();
    return response;
  } catch (err) {
    return console.log("An error occurred ", err.message);
  }
};

/**
 * @description "DELETE" request to delete one or more AssessmentTrackingTasks from the database.
 * @param {string} token base64 encoded auth token
 * @param {object} params query params; includes DB and table name
 * @param {array} tasksToDelete task models to delete from DB.
 */
const deleteTasks = async (token, params, tasksToDelete) => {
  let url = test.base + remove.taskMany;
  url += "?" + new URLSearchParams(params);

  try {
    const request = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: "Basic " + btoa(test.user + ":" + test.password),
        SecurityToken: token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tasksToDelete)
    });
    const response = await request.json();
    return response;
  } catch (err) {
    console.log("An error occurred", err);
    return err.message;
  }
};

const getUnscheduledTasks = async (token, params, residentID) => {
  let url = test.base + unscheduled.get;
  url += "?" + new URLSearchParams(params);
  url += "&residentId=" + residentID;

  try {
    const request = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa(test.user + ":" + test.password),
        SecurityToken: token,
        "Content-Type": "application/json"
      }
    });
    const response = await request.json();
    return response.Data;
  } catch (err) {
    console.log("An error occurred", err);
    return err.message;
  }
};

// returns the AssessmentUnscheduleTaskId
const updateUnscheduledTask = async (token, params, tasks) => {
  let url = test.base + unscheduled.updateTask;
  url += "?" + new URLSearchParams(params);

  try {
    const request = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(test.user + ":" + test.password),
        SecurityToken: token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tasks)
    });
    const response = await request.json();
    return response.Data;
  } catch (err) {}
};

const getReasonID = reason => {
  switch (reason) {
    case "COMPLETED-ON-LATER-SHIFT":
      return 1;
    case "CANCELLED-LBY-SUPERVISOR":
      return 2;
    case "NOT-NEEDED":
      return 3;
    case "MISSED-FORGOTTEN":
      return 4;
    case "INSUFFICIENT-TIME-TO-COMPLETE":
      return 5;
    case "COMPLETED-AS-SCHEDULED":
      return 6;
    case "NOT-COMPLETED":
      return 7;
    case "MISSED":
      return 8;
    case "FORGOTTEN":
      return 9;
    default:
      return 7;
  }
};
const getReasonFromID = reasonID => {
  switch (reasonID) {
    case 1:
      return "COMPLETED-ON-LATER-SHIFT";
    case 2:
      return "CANCELLED-LBY-SUPERVISOR";
    case 3:
      return "NOT-NEEDED";
    case 4:
      return "MISSED-FORGOTTEN";
    case 5:
      return "INSUFFICIENT-TIME-TO-COMPLETE";
    case 6:
      return "COMPLETED-AS-SCHEDULED";
    case 7:
      return "NOT-COMPLETED";
    case 8:
      return "MISSED";
    case 9:
      return "FORGOTTEN";
    default:
      return "NOT-COMPLETED";
  }
};

const findTaskRecordByID = (activeTask, trackingRecords) => {
  const matchingRecord = trackingRecords.filter((record, index) => {
    if (activeTask.AssessmentTrackingId === record.AssessmentTrackingId) {
      return record;
    }
    return null;
  });
  const [current] = matchingRecord;
  return current;
};

// args: array of tasks(ADLCareTask, tracking tasks etc), and a property
// built for ADLCareTask and Unscheduled Tasks
const getCompletedIDs = (completedTasks = [], prop) => {
  if (isEmptyArray(completedTasks))
    return `Warning: getCompletedIDs received an empty array - ${completedTasks}`;
  return completedTasks.map(x => x[prop]);
};

// finds the matching AssessmentTrackingTask records based off a list of task Ids
const findAndMarkComplete = (completedTasks, trackingRecords) => {
  if (isEmptyArray(completedTasks)) return;
  if (isEmptyArray(trackingRecords)) return;

  const ids = getCompletedIDs(completedTasks);
  return trackingRecords.reduce((all, task) => {
    if (ids.includes(task.AssessmentTrackingTaskId)) {
      all.push({
        ...task,
        IsCompleted: true,
        IsFinal: true,
        CompletedDate: new Date().toUTCString()
      });
      return all;
    }
    return all;
  }, []);
};

const markItemComplete = item => {
  return {
    ...item,
    IsCompleted: true,
    IsFinal: true,
    CompletedDate: new Date().toUTCString()
  };
};

const markListComplete = list => {
  return list.map(item => {
    return {
      ...item,
      IsCompleted: true,
      IsFinal: true,
      CompletedDate: new Date().toUTCString()
    };
  });
};

const findBeforeUpdate = (list, task) => {
  return list.find(
    item => item.AssessmentTrackingTaskId === task.AssessmentTrackingTaskId
  );
};

const toggleOffCompleted = task => {
  return {
    ...task,
    TaskStatus: "PENDING",
    Resolution: "PENDING",
    IsCompleted: false,
    IsFinal: false
  };
};

const toggleOnCompleted = task => {
  return {
    ...task,
    TaskStatus: "COMPLETE",
    Resolution: "COMPLETE",
    IsCompleted: true,
    IsFinal: true
  };
};

const toggleOffUnscheduledCompleted = task => {
  return {
    ...task,
    IsCompleted: !task.IsCompleted,
    AssessmentTaskStatusId: findStatusID("PENDING")
  };
};

// used for unscheduled tasks
const toggleUnscheduledCompleted = task => {
  const staleStatus = findStatusNameFromID(task.AssessmentTaskStatusId);
  console.group("toggleUnscheduledCompleted(315)");
  console.log(
    "unchanged task",
    findStatusNameFromID(task.AssessmentTaskStatusId)
  );
  console.log("staleStatus", staleStatus);
  console.groupEnd();
  return {
    ...task,
    IsCompleted: !task.IsCompleted,
    AssessmentTaskStatusId: task.IsCompleted
      ? staleStatus
      : findStatusID("COMPLETE")
  };
};

const isAlreadyCompleted = task => {
  if (task.IsCompleted || task.TaskStatus === "COMPLETE") {
    return true;
  }
  return false;
};

const alreadyMarkedCompleted = (completedList = [], task, prop) => {
  const completedIDs = getCompletedIDs(completedList, prop);
  if (completedIDs === undefined) return false;
  if (!completedIDs.includes(task[prop])) return false;
  return true;
};

const findByTrackingTaskID = (list, task) => {
  return list.filter(
    x => x.AssessmentTrackingTaskId === task.AssessmentTrackingTaskId
  )[0];
};
const findRemainingTasksByTaskID = (list, task) => {
  return list.filter(
    x => x.AssessmentTrackingTaskId !== task.AssessmentTrackingTaskId
  );
};

const sortAsc = (a, b) => {
  return a.AssessmentTrackingTaskId - b.AssessmentTrackingTaskId;
};

const sortByIdAsc = (a, b, prop) => {
  return a[prop] - b[prop];
};

const sortTasksAsc = (tasks, prop) => {
  return [...tasks.sort((a, b) => sortByIdAsc(a, b, prop))];
};

// used for creating a new task
// accepts the NewTaskModel (utils_models), and the form values destructured and renamed
// returns the new updated model
// used for unscheduled tasks
const populateNewTaskModel = (model, vals) => {
  const {
    values: {
      NEWTASK_CATEGORY: category,
      NEWTASK_FOLLOWUP: followUp,
      NEWTASK_SIGNATURE: signedBy,
      NEWTASK_NAME: taskName,
      NEWTASK_NOTES: notes // Jose needs to add to table
    }
  } = vals;

  return {
    ...model,
    ResidentId: vals.ResidentID,
    UserId: vals.UserId,
    AssessmentCategoryId: getCategoryID(category),
    FollowUpDate: !isEmptyVal(followUp) ? followUp : "",
    SignedBy: !isEmptyVal(signedBy) ? signedBy : "",
    Notes: !isEmptyVal(notes) ? notes : "",
    Description: !isEmptyVal(taskName) ? taskName : "",
    IsCompleted: false,
    IsFinal: false,
    CreatedDate: new Date().toUTCString(),
    CreatedBy: vals.userID
  };
};

// returns ADLCareTask model with populated task data
const populateCareTaskModel = (model, vals) => {
  const {
    values: {
      NEWTASK_CATEGORY: category,
      NEWTASK_FOLLOWUP: followUp,
      NEWTASK_SIGNATURE: signedBy,
      NEWTASK_NAME: taskName,
      NEWTASK_NOTES: notes // Jose needs to add to table
    }
  } = vals;

  return {
    ...model,
    ResidentId: vals.ResidentID,
    UserId: vals.UserId,
    ADLCategory: category,
    AssessmentCategoryId: getCategoryID(category),
    AssessmentReasonId: 3,
    Reason: 7,
    AssessmentShiftId: 0,
    DayOfWeek: format(new Date(), "dddd"),
    FollowUpDate: !isEmptyVal(followUp) ? followUp : "",
    SignedBy: !isEmptyVal(signedBy) ? signedBy : "",
    Notes: !isEmptyVal(notes) ? notes : "",
    TaskDescription: !isEmptyVal(taskName) ? taskName : "",
    TaskStatus: "PENDING",
    IsCompleted: false,
    IsFinal: false,
    CreatedDate: new Date().toUTCString(),
    CreatedBy: vals.userID
  };
};

// checks for unscheduled/scheduled tasks
const isScheduledTask = task => {
  if (hasProperty("AssessmentUnscheduleTaskId")) {
    return false;
  }
  return true;
};

export {
  isScheduledTask,
  getReasonID,
  getReasonFromID,
  populateNewTaskModel,
  populateCareTaskModel,
  findTaskRecordByID, // find AssessmentTrackingTask record by id
  getUnscheduledTasks,
  updateUnscheduledTask,
  saveUnscheduledTasks, // CREATE
  getTrackingTasks, // READ
  updateTrackingTasks, // UPDATE
  deleteTasks, // DELETE
  getCompletedIDs, // grab IDs from ADLCareTask records
  findAndMarkComplete, // find and updated AAssessmentTrackingTask records to "Complete"
  markItemComplete,
  markListComplete,
  findBeforeUpdate,
  isAlreadyCompleted,
  alreadyMarkedCompleted,
  findByTrackingTaskID,
  findRemainingTasksByTaskID,
  toggleOffCompleted,
  toggleOnCompleted,
  toggleOffUnscheduledCompleted,
  toggleUnscheduledCompleted,
  sortAsc,
  sortByIdAsc,
  sortTasksAsc
};
