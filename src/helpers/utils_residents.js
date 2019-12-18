import { residents } from "./utils_endpoints";
import { test } from "./utils_env";

const getResidentsByUserEmail = async (token, email) => {
  let url = test.base + residents.byUserEmail;
  url += "?" + new URLSearchParams({ userEmail: email }); // params: { userEmail: "someEmail@example.com" }

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
    console.log("An error occurred " + err);
    return err.message;
  }
};

const getResidentsByFacility = async (token, facilityID) => {
  let url = test.base + residents.byFacility;
  url += "?facilityId=" + facilityID;

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

export { getResidentsByUserEmail, getResidentsByFacility };
