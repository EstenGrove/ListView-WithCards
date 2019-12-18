const findStatusID = status => {
  switch (status) {
    case "PENDING":
      return 1;
    case "COMPLETE":
      return 2;
    case "MISSED-EVENT":
      return 3;
    case "NOT-COMPLETE":
      return 4;
    case "IN-PROGRESS":
      return 5;
    default:
      return 4;
  }
};

const findStatusNameFromID = id => {
  switch (id) {
    case 1:
      return "PENDING";
    case 2:
      return "COMPLETE";
    case 3:
      return "MISSED-EVENT";
    case 4:
      return "NOT-COMPLETE";
    case 5:
      return "IN-PROGRESS";
    default:
      return "PENDING";
  }
};

export { findStatusID, findStatusNameFromID };
