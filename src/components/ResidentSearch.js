import React from "react";
import styles from "../css/ResidentSearch.module.scss";
import { PropTypes } from "prop-types";
import { formatResidentSearch } from "../helpers/utils_residentData";
import { isEmptyArray } from "../helpers/utils_types";
import StatefulButton from "./StatefulButton";
import Spinner from "./Spinner";

const btnStyles = {
  marginRight: "auto",
  borderRadius: "0 .5rem .5rem 0"
};

const ResidentSearch = ({
  label,
  residents = [],
  selectResident,
  loadResident
}) => {
  if (isEmptyArray(residents)) {
    return <Spinner />;
  }
  return (
    <header className={styles.ResidentSearch}>
      <h4
        htmlFor="residentSearch"
        aria-label="Search for a resident..."
        className={styles.ResidentSearch_label}
      >
        {label}
      </h4>
      <div className={styles.ResidentSearch_dropdown}>
        <input
          type="search"
          name="residentSearch"
          id="residentSearch"
          list="residents"
          className={styles.ResidentSearch_dropdown_input}
          placeholder="Search for a resident..."
          onChange={e => selectResident(e)}
          required
        />
        <datalist
          className={styles.ResidentSearch_dropdown_list}
          id="residents"
        >
          {residents &&
            residents.length &&
            residents.map((resident, index) => (
              <option
                value={formatResidentSearch(resident)}
                key={resident.ResidentID}
                className={styles.ResidentSearch_dropdown_list_option}
              />
            ))}
        </datalist>
        <div className={styles.ResidentSearch_dropdown_btn}>
          <StatefulButton
            action="Loading..."
            text="Load"
            callback={e => loadResident(e)}
            customStyles={btnStyles}
          />
        </div>
      </div>
    </header>
  );
};
export default ResidentSearch;

ResidentSearch.defaultProps = {
  residents: []
};

ResidentSearch.propTypes = {
  label: PropTypes.string,
  residents: PropTypes.array,
  selectResident: PropTypes.func,
  loadResident: PropTypes.func
};
