import React from "react";
import styles from "../css/Row.module.scss";
import { PropTypes } from "prop-types";
import { convertSizes } from "../helpers/utils_containers";

const Row = ({
  children,
  rowWidth = "100%",
  rowHeight = "20rem",
  rowSpacing = "space-evenly", // justifyContent
  colSpacing = "center", // alignItems
  wrapItems = "no-wrap"
}) => {
  const rowStyles = {
    width: convertSizes(rowWidth, "100%"),
    height: convertSizes(rowHeight, "20rem"),
    justifyContent: rowSpacing,
    alignItems: colSpacing,
    flexWrap: wrapItems
  };

  return (
    <div className={styles.Row} style={rowStyles}>
      {children}
    </div>
  );
};
export default Row;

Row.defaultProps = {
  rowWidth: "100%",
  rowHeight: "20rem",
  rowSpacing: "space-evenly",
  colSpacing: "center",
  wrapItems: "no-wrap"
};

Row.propTypes = {
  children: PropTypes.any,
  rowWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rowHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rowSpacing: PropTypes.string,
  colSpacing: PropTypes.string,
  wrapItems: PropTypes.string
};
