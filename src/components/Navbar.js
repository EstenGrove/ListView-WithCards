import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { withRouter, NavLink } from "react-router-dom";
import { logout } from "../helpers/utils_auth";
import { isEmptyObj, hasProperty, isEmptyVal } from "../helpers/utils_types";
import styles from "../css/Navbar.module.scss";
import sprite from "../assets/alerts.svg";

// grabs initials from user's first/last name
const getInitials = user => {
  if (isEmptyObj(user)) return "NA";
  if (!hasProperty(user, "firstName")) return "NA";
  if (!hasProperty(user, "lastName")) return "NA";
  if (isEmptyVal(user.firstName)) return "NA";
  if (isEmptyVal(user.lastName)) return "NA";
  const first = user.firstName.slice(0, 1);
  const last = user.lastName.slice(0, 1);
  return `${first}${last}`.toUpperCase();
};

// add useOutsideClick to dropdown
const Navbar = ({
  currentUser = {},
  alerts = [],
  hasAlerts = true,
  history,
  dispatch
}) => {
  const [expandDropdown, setExpandDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = e => {
    e.preventDefault();
    logout(currentUser.token);
    dispatch({
      type: "RESET"
    });
    return history.replace("/");
  };

  return (
    <nav className={styles.Navbar}>
      <ul className={styles.Navbar_list}>
        <li
          className={styles.Navbar_list_mobile}
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          <svg className={styles.Navbar_list_mobile_icon}>
            <use xlinkHref={`${sprite}#icon-menu11`}></use>
          </svg>
          {showMobileMenu && (
            <aside className={styles.Navbar_list_mobile_dropdown}>
              <ul className={styles.Navbar_list_mobile_dropdown_list}>
                <h4 className={styles.Navbar_list_mobile_dropdown_heading}>
                  Views
                </h4>
                <li className={styles.Navbar_list_mobile_dropdown_list_item}>
                  Dashboard
                </li>
                <li className={styles.Navbar_list_mobile_dropdown_list_item}>
                  Daily
                </li>
                <li className={styles.Navbar_list_mobile_dropdown_list_item}>
                  Weekly
                </li>
              </ul>
            </aside>
          )}
        </li>
        <li className={styles.Navbar_list_item}>
          <NavLink to="/">AL Advantage</NavLink>
        </li>
        <li className={styles.Navbar_list_item}>
          <NavLink to="/dashboard/calendar">Calendar</NavLink>
        </li>
        <li className={styles.Navbar_list_item}>
          <NavLink to="/dashboard/summary">Summary</NavLink>
        </li>
        <li className={styles.Navbar_list_alert}>
          <svg className={styles.Navbar_list_alert_icon}>
            <use xlinkHref={`${sprite}#icon-notifications_none`}></use>
          </svg>
          {hasAlerts && (
            <div className={styles.Navbar_list_alert_count}>
              <div className={styles.Navbar_list_alert_count_number}>
                {alerts.length}
              </div>
            </div>
          )}
        </li>
        <li
          className={styles.Navbar_list_user}
          onClick={() => setExpandDropdown(!expandDropdown)}
        >
          <div className={styles.Navbar_list_user_initials}>
            {isEmptyObj(currentUser) ? "NA" : getInitials(currentUser)}
          </div>
          {/* DROPDOWN MENU */}
          {expandDropdown && (
            <aside className={styles.Navbar_list_user_dropdown}>
              <ul className={styles.Navbar_list_user_dropdown_list}>
                <li className={styles.Navbar_list_user_dropdown_list_item}>
                  <NavLink to="/">AL Advantage</NavLink>
                </li>
                <li className={styles.Navbar_list_user_dropdown_list_item}>
                  <NavLink to="/dashboard/calendar">Calendar</NavLink>
                </li>
                <li className={styles.Navbar_list_user_dropdown_list_item}>
                  <NavLink to="/dashboard/summary">Summary</NavLink>
                </li>
                <li className={styles.Navbar_list_user_dropdown_list_alert}>
                  <div
                    className={styles.Navbar_list_user_dropdown_list_alert_text}
                  >
                    <NavLink to="/dashboard/alerts">Alerts</NavLink>
                  </div>
                  <svg
                    className={styles.Navbar_list_user_dropdown_list_alert_icon}
                  >
                    <use xlinkHref={`${sprite}#icon-notifications_none`}></use>
                  </svg>
                </li>
                <li className={styles.Navbar_list_user_dropdown_list_logout}>
                  <button
                    className={styles.Navbar_list_user_dropdown_list_logout_btn}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </aside>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default withRouter(Navbar);

Navbar.defaultProps = {
  currentUser: {},
  hasAlerts: false,
  alerts: []
};
Navbar.propTypes = {
  currentUser: PropTypes.object,
  hasAlerts: PropTypes.bool,
  alerts: PropTypes.array
};
