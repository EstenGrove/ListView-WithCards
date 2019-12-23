import React from "react";
import styles from "../css/CardsPanel.module.scss";

const CardsPanel = ({ children }) => {
  return <div className={styles.CardsPanel}>{children}</div>;
};
export default CardsPanel;
