import React from "react";
import styles from "../css/LoginForm.module.scss";
import StatefulButton from "./StatefulButton";

const LoginForm = ({ vals, handleChange, handleSubmit, handleSignup }) => {
  return (
    <>
      <section className={styles.LoginForm}>
        <form className={styles.LoginForm_form} onSubmit={handleSubmit}>
          <h4 className={styles.LoginForm_form_title}>Login</h4>
          <label htmlFor="username">Username</label>
          <input
            value={vals.username}
            type="text"
            name="username"
            id="username"
            placeholder="Enter your username..."
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            value={vals.password}
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password..."
            onChange={handleChange}
            required
          />
          <StatefulButton
            action="Logging in..."
            text="Login"
            callback={handleSubmit}
          />
          <p className={styles.LoginForm_form_switch}>
            <button
              className={styles.LoginForm_form_switch_button}
              onClick={handleSignup}
            >
              Or Signup here!
            </button>
          </p>
        </form>
      </section>
    </>
  );
};
export default LoginForm;
