import React from "react";
import styles from "../../css/ContainerLG.module.scss";
import { convertSizes } from "../../helpers/utils_containers";

const ContainerLG = ({
  children,
  containerWidth = "100%",
  containerHeight = "100%",
  bgcolor = null,
  margins = null
}) => {
  // used for custom styling
  const containerStyles = {
    width: convertSizes(containerWidth, "100%"),
    height: convertSizes(containerHeight, "100%"),
    backgroundColor: bgcolor,
    margin: margins
  };

  return (
    <div style={containerStyles} className={styles.ContainerLG}>
      {children}
    </div>
  );
};
export default ContainerLG;
