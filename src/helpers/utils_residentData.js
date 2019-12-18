import { residents } from "./utils_endpoints";
import { test } from "./utils_env";
import { isEmptyVal } from "./utils_types";

const getResidentForTracker = async (token, residentID, dayOfWeek) => {
  let url = test.base + residents.forTracker;
  url +=
    "?" +
    new URLSearchParams({
      residentId: residentID,
      dayOfWeek: dayOfWeek
    });

  try {
    const request = await fetch(url, {
      method: "GET",
      headers: new Headers({
        Authorization: "Basic " + btoa(test.user + ":" + test.password),
        SecurityToken: token
      })
    });
    const response = await request.json();
    if (!response.Data) return response;
    return response.Data;
  } catch (err) {
    console.log("An error occured: " + err);
    return err.message;
  }
};

const getResidentProfile = async (token, residentID) => {
  let url = test.base + residents.getProfile;
  url += "?residentId=" + residentID;

  try {
    const request = await fetch(url, {
      method: "GET",
      headers: new Headers({
        Authorization: "Basic " + btoa(test.user + ":" + test.password),
        SecurityToken: token
      })
    });
    const response = await request.json();
    return response;
  } catch (err) {
    console.log("An error occured: " + err);
    return err.message;
  }
};

const getAssessmentCategories = async token => {
  let url = test.base + residents.getCategories;

  try {
    const request = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa(test.user + ":" + test.password),
        SecurityToken: token
      }
    });
    const response = await request.json();
    return response;
  } catch (err) {
    return console.log("An error occured: " + err);
  }
};

// FORMATTING DATA (RESIDENT DATA)
const formatResidentSearch = resident => {
  const { FirstName, LastName, ResidentID } = resident;
  return `${FirstName} ${LastName} ~ ALA ID# ${ResidentID}`;
};

const formatCurrentResident = val => {
  if (isEmptyVal(val)) return;
  const first = val.split(" ")[0].trim();
  const last = val.split(" ")[1].trim();
  const id = val.split("~")[1].trim();

  return {
    first: first,
    last: last,
    id: id
  };
};

const parseResidentSelection = resident => {
  if (isEmptyVal(resident)) return;
  const first = resident.split(" ")[0].trim();
  const last = resident.split(" ")[1].trim();
  const id = resident.split("#")[1].trim();

  return {
    first: first,
    last: last,
    id: id
  };
};

export {
  getResidentProfile,
  getResidentForTracker,
  getAssessmentCategories,
  // formatting utils
  formatCurrentResident, // previous version
  formatResidentSearch,
  parseResidentSelection
};
