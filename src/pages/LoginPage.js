import React from "react";
import styles from "../css/LoginPage.module.scss";

const LoginPage = ({ children }) => {
  return <div className={styles.LoginPage}>{children}</div>;
};

export default LoginPage;
