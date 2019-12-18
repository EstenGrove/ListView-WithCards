import React from "react";
import styles from "../css/Column.module.scss";
import { PropTypes } from "prop-types";
import { convertSizes } from "../helpers/utils_containers";

const Column = ({
  children,
  colWidth = "30rem",
  colHeight = "100%",
  colSpacing = "space-evenly", // justifyContent (vertical)
  rowSpacing = "flex-start", // alignItems (horizontal)
  wrapItems = "no-wrap"
}) => {
  const colStyles = {
    width: convertSizes(colWidth, "20rem"),
    height: convertSizes(colHeight, "100%"),
    justifyContent: colSpacing,
    alignItems: rowSpacing,
    flexWrap: wrapItems
  };
  return (
    <div style={colStyles} className={styles.Column}>
      {children}
    </div>
  );
};
export default Column;

Column.defaultProps = {
  colWidth: "30rem",
  colHeight: "100%",
  colSpacing: "space-evenly",
  rowSpacing: "flex-start",
  wrapItems: "no-wrap"
};

Column.propTypes = {
  children: PropTypes.any,
  colWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  colHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  colSpacing: PropTypes.string,
  rowSpacing: PropTypes.string,
  wrapItems: PropTypes.string
};
