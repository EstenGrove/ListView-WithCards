import React from "react";
import { useRouteMatch } from "react-router-dom";
import styles from "../css/Dashboard.module.scss";
import ContainerLG from "./containers/ContainerLG";
import CardsPanel from "./CardsPanel";

const Dashboard = () => {
  const match = useRouteMatch();

  return (
    <div className={styles.Dashboard}>
      <h1 style={{ fontSize: "3rem" }}>Dashboard page</h1>
      <ContainerLG bgcolor="#eaecef">
        <CardsPanel />
      </ContainerLG>
    </div>
  );
};
export default Dashboard;
