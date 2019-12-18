import { getFileRegistry, uploads, downloads } from "./utils_endpoints";
import { test } from "./utils_env";

// no params needed - backend sorts by meta data
const getFileRegistryByMeta = async token => {
  let url = test.base + getFileRegistry.byMeta;

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

// doesn't require facilityID, if none, will use user's parent
const getFileRegistryByFacility = async (token, facilityID = null) => {
  let url = test.base + downloads.getFileRegistryByFacility;
  if (facilityID) url += "?" + new URLSearchParams({ facilityId: facilityID });

  try {
    const request = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa(test.user + ":" + test.password),
        SecurityToken: token,
        "Content-Type": "application/json"
      }
    });
    const response = await request.json();
    return response;
  } catch (err) {
    console.log("An error has occurred" + err.message);
    return err;
  }
};

const getFileRegistryByUser = async (token, userID) => {
  let url = test.base + getFileRegistry.byUser;
  url += "?" + new URLSearchParams({ userId: userID });

  try {
    const request = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa(test.user + ":" + test.password),
        SecurityToken: token,
        "Content-Type": "application/json"
      }
    });
    const response = await request.json();
    return response;
  } catch (err) {
    console.log("An error has occurred " + err);
    return err.message;
  }
};

// return data blob of file. (requires callback for actual download)
const getFile = async (token, fileID, callback = null) => {
  let url = test.base + downloads.getFile;
  if (fileID) url += "?" + new URLSearchParams({ id: fileID });

  try {
    const request = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa(test.user + ":" + test.password),
        SecurityToken: token,
        "Content-Type": "application/json"
      }
    });
    const fileBlob = await request.blob();
    if (callback) return callback(fileBlob);
    return fileBlob;
  } catch (err) {
    console.log("An error occurred " + err);
    return err.message;
  }
};

export {
  getFileRegistryByMeta,
  getFileRegistryByFacility,
  getFileRegistryByUser,
  getFile
};
