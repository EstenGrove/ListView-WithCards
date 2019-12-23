import { isEmptyArray, handleEmpties } from "./utils_types";

/**
 *
 * @param {array} list array to iterate thru and search for item
 * @param {object|string|number} itemToSearchFor item to look for in array (list)
 */

const ifExists = (list, itemToSearchFor) => {
  return list.includes(itemToSearchFor);
};

/**
 *
 * @param {array} list array to search in
 * @param {object|string|number} itemToSearchFor items to find in array
 * @param {string} idToMatch string ID to use as matching property
 */
// args: list(array), itemToSearchFor(object), idToMatch(string)
const findItemInList = (list, itemToSearchFor, idToMatch) => {
  if (ifExists(list, itemToSearchFor)) {
    return list.filter(
      item => item[idToMatch] === itemToSearchFor[idToMatch]
    )[0];
  }
  return null;
};

const populateState = (data, state) => {
  const {
    ADL,
    ADLCareTask,
    ADLCareTaskHistory,
    ADLCareTaskFuture,
    ADLCareLevel,
    Resident,
    AssessmentTrackingTask,
    Charts,
    Vitals,
    UnscheduledTasks
    // ADLCategory,
    // AssessmentTask,
    // AssessmentTracking,
  } = data;
  const newState = {
    ...state,
    globals: {
      ...state.globals,
      currentResident: {
        ...Resident[0]
      },
      adlDescriptions: handleEmpties(ADL),
      unscheduledTasks: handleEmpties(UnscheduledTasks),
      tasks: handleEmpties(ADLCareTask),
      tasksHistory: handleEmpties(ADLCareTaskHistory),
      tasksFuture: handleEmpties(ADLCareTaskFuture),
      trackingTasks: handleEmpties(AssessmentTrackingTask),
      categories: handleEmpties(ADLCareLevel),
      charting: handleEmpties(Charts),
      vitals: handleEmpties(Vitals)
    }
  };

  return { ...newState };
};

// handles initial hydration (ie fetchResidentAndUserData fn())
const hydrateState = (data, state) => {
  const stateRefresh = {
    ...state,
    currentUser: {
      firstName: data.userData.strFirstName,
      lastName: data.userData.strLastName,
      userID: data.userData.guidUser,
      facilityID: data.userData.guidFacility,
      token: data.userData.token,
      isAdmin: data.userData.alaAdmin,
      facilities: handleEmpties(data.facilities)
    },
    globals: {
      ...state.globals,
      residents: handleEmpties(data.residents)
    }
  };
  return { ...stateRefresh };
};

export { ifExists, findItemInList, populateState, hydrateState };
