import { auth } from "./utils_endpoints";
import { test } from "./utils_env";

// #AUTHENTICATION

const login = async (username, password, appID, callback = null) => {
  let url = test.base + auth.login;
  url += "?loginId=" + username;
  url += "&loginPwd=" + password;
  url += "&loginApp=" + appID;

  try {
    const request = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(test.user + ":" + test.password),
        "Content-Type": "application/json"
      }
    });
    const response = await request.json();

    if (callback) return callback();
    return response.Data;
  } catch (err) {
    console.log("An error has occurred" + err.message);
    return err;
  }
};

const logout = async token => {
  let url = test.base + auth.logout;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(test.user + ":" + test.password),
        SecurityToken: token,
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();

    return data.Data;
  } catch (err) {
    console.log("An error has occurred" + err.message);
    return err;
  }
};

const checkLoginStatus = async (token, appID, callback = null) => {
  let url = test.base + auth.loginStatus;
  url += "?loginApp=" + appID;

  try {
    const request = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(test.user + ":" + test.password),
        SecurityToken: token,
        "Content-Type": "application/json"
      }
    });
    const response = await request.json();
    if (callback) return callback();
    return response.Data;
  } catch (err) {
    console.log("An error occurred in the checkLoginStatus fn", err);
    return err.message;
  }
};

export { login, logout, checkLoginStatus };
