import { test } from "./utils_env";
import {
  getResidentForTracker,
  getResidentProfile
} from "./utils_residentData";
import { getResidentsByUserEmail } from "./utils_residents";
import { getUserProfileByEmail } from "./utils_userData";
// #Data Fetching

// generic request helper
const makeRequest = async (
  url,
  token,
  method = "GET",
  params = {},
  callback = null
) => {
  url += "?" + new URLSearchParams(params);

  try {
    const request = await fetch(url, {
      method: method,
      headers: new Headers({
        Authorization: "Basic " + btoa(test.user + ":" + test.password),
        SecurityToken: token
      })
    });
    const response = await request.json();
    if (callback) callback();
    return response;
  } catch (err) {
    return console.log("An error occured: " + err);
  }
};

const fetchResidentsAndUserData = async userData => {
  const { token, username } = userData;
  const resData = await getResidentsByUserEmail(token, username);
  const profileData = await getUserProfileByEmail(token, username);

  const residents = await JSON.parse(resData.Data);
  const { ADVUSER } = profileData;
  const userProfile = ADVUSER[0];

  return {
    ...userProfile,
    residents: residents
  };
};

// handles profile and tracker data
const fetchResidentData = async (token, residentID) => {
  const trackerData = await getResidentForTracker(token, residentID, 0);
  const profileData = await getResidentProfile(token, residentID);

  return { ...trackerData, ...profileData.Data };
};

export { makeRequest, fetchResidentData, fetchResidentsAndUserData };
