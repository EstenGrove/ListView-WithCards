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

export { getReasonFromID, getReasonID };
