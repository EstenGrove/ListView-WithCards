import React, { useContext } from "react";
import styles from "../css/NonAuthenticatedView.module.scss";
import LoginPage from "../pages/LoginPage";
import LoginForm from "../components/LoginForm";
import { AuthContext } from "../state/AuthContext";
import { useForm } from "../utils/useForm";
import { login } from "../helpers/utils_auth";

const NonAuthenticatedView = ({ history }) => {
  const { formState, handleChange } = useForm({
    username: "",
    password: ""
  });
  const { setAuthData } = useContext(AuthContext);

  const handleAuth = async e => {
    const { username, password } = formState.values;
    const loginResponse = await login(username, password, "AdvantageTracker");
    if (loginResponse) {
      setAuthData({
        token: loginResponse,
        username: username,
        password: password,
        isAuthenticated: true
      });
      return history.replace("/dashboard");
    } else {
      return alert("Something went wrong. Please try again");
    }
  };

  const handleSignup = e => {
    e.persist();
    e.preventDefault();
    return alert(
      "Sorry we're not taking new registrations at the moment. \n Try again later!"
    );
  };

  return (
    <div className={styles.NonAuthenticatedView}>
      <LoginPage>
        <LoginForm
          vals={formState}
          handleChange={handleChange}
          handleSubmit={handleAuth}
          handleSignup={handleSignup}
        />
      </LoginPage>
    </div>
  );
};
export default NonAuthenticatedView;
