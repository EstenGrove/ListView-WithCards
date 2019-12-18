import React, { createContext, useReducer } from "react";

export const initialState = {
  app: {
    isLoading: false,
    hasLoaded: false,
    isError: false
  },
  user: {
    firstName: null,
    lastName: null,
    username: null,
    password: null,
    userID: null,
    facilityID: null,
    isAdmin: false,
    token: null
  },
  globals: {
    currentResident: {
      FirstName: null,
      LastName: null,
      Age: null,
      ResidentID: null,
      Unit: null,
      Height: null,
      Weight: null,
      MDReportDue: null,
      ServicePlanDue: null,
      MonthlyMedReview: null,
      BathNotes: null,
      EscortNotes: null,
      GroomingNotes: null,
      HygieneNotes: null
    },
    residents: [],
    adlDescriptions: [],
    unscheduledTasks: [],
    tasks: [],
    tasksHistory: [],
    tasksFuture: [],
    trackingTasks: [],
    parsedTasks: {},
    adls: [],
    profile: {},
    charting: {},
    categories: [],
    vitals: []
  }
};

export const GlobalStateContext = createContext(initialState);

export const reducer = (state, action) => {
  switch (action.type) {
    case "SUCCESS": {
      const { newState } = action.data;
      return {
        ...state,
        ...newState,
        app: {
          hasLoaded: true,
          isLoading: false,
          isError: false
        }
      };
    }
    case "LOADING": {
      return {
        ...state,
        app: {
          isLoading: true,
          hasLoaded: false,
          isError: false
        }
      };
    }
    case "ERROR": {
      return {
        ...state,
        app: {
          isLoading: false,
          hasLoaded: false,
          isError: true
        }
      };
    }
    case "RESET": {
      return {
        ...initialState
      };
    }
    case "CREATE_TASK": {
      const { newTask } = action.data;
      return {
        ...state,
        globals: {
          ...state.globals,
          tasks: [newTask, ...state.globals.tasks]
        }
      };
    }
    default:
      return new Error("Invalid Action Type");
  }
};

export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
