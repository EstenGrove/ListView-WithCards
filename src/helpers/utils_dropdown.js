// Sorting/Filtering Options:
// 1. by date
// 2. by status
// 3. by shift
// 4. by adl

const reducer = (state, action) => {
  switch (action.type) {
    case "SELECT": {
      const { option } = action.data;
      return {
        ...state,
        value: option,
        isOpen: false
      };
    }
    case "OPEN/CLOSE": {
      return {
        ...state,
        isOpen: !state.isOpen
      };
    }
    case "RESET": {
      return {
        ...state,
        value: "",
        isOpen: false
      };
    }
    case "FORCE_CLOSE": {
      return {
        ...state,
        isOpen: false
      };
    }
    default:
      return new Error("Invalid action type", action);
  }
};

const initialState = {
  value: "",
  isOpen: false,
  options: []
};

const shifts = ["AM", "PM", "NOC", "ALL"];
const status = [
  "Pending",
  "Complete",
  "Not-Complete",
  "In-Progress",
  "Missed-Event"
];

const adls = [
  "Grooming",
  "Bathing",
  "Dressing",
  "Toileting",
  "Meds",
  "Psychosocial",
  "StatusChecks"
];

export { reducer, initialState, shifts, status, adls };
