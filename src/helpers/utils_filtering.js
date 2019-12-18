import { isEmptyArray } from "./utils_types";
import { getCategoryNameFromID } from "./utils_categories";
import { format } from "date-fns";

export const filterReducer = (state, action) => {
  switch (action.type) {
    case "FILTER_BY_ADL": {
      const { adl } = action.data; // adl
      if (isEmptyArray(state)) return;
      return {
        type: "BY_ADL",
        scheduledTasks: [
          ...state.tasks.filter(task => task.AssessmentCategoryId === adl)
        ],
        unscheduledTasks: [
          ...state.unscheduledTasks.filter(
            task => getCategoryNameFromID(task.AssessmentCategoryId) === adl
          )
        ]
      };
    }
    case "FILTER_BY_DATE": {
      const { date } = action.data; // date
      if (isEmptyArray(state)) return;
      return {
        type: "BY_DATE",
        scheduledTasks: [
          ...state.tasks.filter(task => task.DayOfWeek === date)
        ],
        unscheduledTasks: [
          ...state.unscheduledTasks.filter(
            task => format(task.EntryDate, "dddd") === format(date, "dddd")
          )
        ]
      };
    }
    case "FILTER_BY_STATUS": {
      const { status } = action.data; // status
      if (isEmptyArray(state)) return;
      return {
        type: "BY_STATUS",
        scheduledTasks: [
          ...state.tasks.filter(task => task.TaskStatus === status)
        ],
        unscheduledTasks: []
      };
    }
    case "FILTER_BY_SHIFT": {
      const { shift } = action.data;
      if (isEmptyArray(state)) return;

      return {
        type: "BY_SHIFT",
        scheduledTasks: [...state.tasks.filter(task => task.Shift === shift)],
        unscheduledTasks: []
      };
    }
    default:
      return {
        type: "",
        scheduledTasks: [...state.tasks],
        unscheduledTasks: []
      };
  }
};

export const initialFilterState = {
  type: "",
  scheduledTasks: [],
  unscheduledTasks: []
};
