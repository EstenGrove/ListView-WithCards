import {
  isToday,
  format,
  isPast,
  distanceInWordsToNow,
  differenceInDays
} from "date-fns";
import { hasProperty } from "./utils_types";
import { isScheduledTask } from "./utils_tasks";

const formatDate = (date = null) => {
  if (!date) return "No date";
  const day = format(date, "ddd");
  const dayDate = format(date, "D");
  const month = format(date, "MMM");
  const year = format(date, "YYYY");
  return `${day}, ${month} ${dayDate} ${year}`;
};

const isPastDue = dueDate => {
  if (isPast(dueDate)) return true;
  return false;
};

const formatPastDate = date => {
  if (!isPast(date)) return;
  return `${distanceInWordsToNow(date)} ago`;
};

const formatDifferenceInDays = date => {
  if (!isToday(date)) {
    return `${differenceInDays(date)} days`;
  }
  return "today";
};

const checkForPastDue = task => {
  // if unscheduled task
  if (!isScheduledTask(task)) {
    return isPast(task.FollowUpDate)
      ? formatPastDate(task.FollowUpDate)
      : formatDate(task.FollowUpDate);
  }
  return isPast(task.TrackDate)
    ? formatPastDate(task.TrackDate)
    : formatDifferenceInDays(task.TrackDate);
};

export {
  formatDate,
  isPastDue,
  formatPastDate,
  formatDifferenceInDays,
  checkForPastDue
};
