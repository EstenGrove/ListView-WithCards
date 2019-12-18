// returns matching category name from legacy
const checkCategoryNaming = category => {
  const lowerCaseADL = category.toLowerCase();
  if (!lowerCaseADL || lowerCaseADL === undefined || lowerCaseADL === "")
    return;

  if (lowerCaseADL === ("medassist" || "meds" || "medication")) {
    return "Meds";
  }

  if (lowerCaseADL === ("statuschecks" || "health")) {
    return "Health";
  }
  if (lowerCaseADL === ("ambulation" || "ambulate")) {
    return "Ambulate";
  }
  if (lowerCaseADL === ("groom" || "grooming")) {
    return "Grooming";
  }
  if (lowerCaseADL === ("toilet" || "toileting")) {
    return "Toileting";
  }
  if (lowerCaseADL === ("transfer" || "transfers")) {
    return "Transfers";
  }
  if (lowerCaseADL === ("care" || "specialcare")) {
    return "Care";
  }
  // *addition*
  if (lowerCaseADL === ("health" || "statuschecks")) {
    return "Health";
  }
  if (lowerCaseADL === "psychosocial" || lowerCaseADL === "mental") {
    return "Mental";
  }
  if (lowerCaseADL === ("bath" || "bathing")) {
    return "Bathing";
  }
  return category;
};

// accepts a ADL("Dressing", "Bathing" etc) & returns the id
const getCategoryID = category => {
  const name = checkCategoryNaming(category);
  switch (name) {
    case "ALL" || "All":
      return 1;
    case "Ambulate":
      return 2;
    case "Bathing":
      return 3;
    case "Dressing":
      return 4;
    case "Grooming":
      return 5;
    case "Laundry":
      return 6;
    case "Meals":
      return 7;
    case "MedAssist":
      return 8;
    case "Meds":
      return 8;
    case "Psychosocial":
      return 9;
    case "SpecialCare":
      return 10;
    case "StatusChecks":
      return 11;
    case "Toileting":
      return 12;
    case "Transfers":
      return 13;
    case "Other":
      return 14;
    default:
      return 14;
  }
};

// maps thru ADL categories & returns ID from category name (ie "Dressing", "Bathing)
const findCategoryID = (category, levels) => {
  return levels.reduce((acc, cur) => {
    if (cur.AdlCategoryType === category) {
      acc = cur.AdlCategoryId;
      return cur.AdlCategoryId;
    }
    return acc;
  }, {});
};
// returns name from id
const getCategoryNameFromID = name => {
  switch (name) {
    case 1:
      return "All";
    case 2:
      return "Ambulate";
    case 3:
      return "Bathing";
    case 4:
      return "Dressing";
    case 5:
      return "Grooming";
    case 6:
      return "Laundry";
    case 7:
      return "Meals";
    case "MedAssist" || "Meds":
      return 8;
    case 9:
      return "Psychosocial";
    case 10:
      return "SpecialCare";
    case 11:
      return "StatusChecks";
    case 12:
      return "Toileting";
    case 13:
      return "Transfers";
    case 14:
      return "Other";
    default:
      return 14;
  }
};

// maps thru ADL categories and returns category name from id
const findCategoryByID = (id, levels) => {
  return levels.reduce((acc, cur) => {
    if (cur.AdlCategoryId === id) {
      acc = cur.AdlCategoryType;
      return cur.AdlCategoryType;
    }
    return acc;
  }, {});
};

export {
  checkCategoryNaming,
  getCategoryID,
  getCategoryNameFromID,
  findCategoryByID,
  findCategoryID
};
