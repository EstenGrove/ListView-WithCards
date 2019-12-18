import { user } from "./utils_endpoints";
import { test } from "./utils_env";

const getUserProfile = async (token, userID) => {
  let url = test.base + user.getProfile;
  url += "?userId=" + userID;

  try {
    const request = await fetch(url, {
      method: "GET",
      headers: new Headers({
        Authorization: "Basic " + btoa(test.user + ":" + test.password),
        SecurityToken: token
      })
    });
    const response = await request.json();
    const profile = await JSON.parse(response.Data);
    return profile;
  } catch (err) {
    console.log("An error occured: " + err);
    return err.message;
  }
};

const getUserProfileByEmail = async (token, email) => {
  let url = test.base + user.getProfileByEmail;
  url += "?" + new URLSearchParams({ userEmail: email });

  try {
    const request = await fetch(url, {
      method: "GET",
      headers: new Headers({
        Authorization: "Basic " + btoa(test.user + ":" + test.password),
        SecurityToken: token
      })
    });
    const response = await request.json();
    const profile = await JSON.parse(response.Data)[0];
    return profile;
  } catch (err) {
    return console.log("An error occured: " + err);
  }
};

export { getUserProfile, getUserProfileByEmail };
