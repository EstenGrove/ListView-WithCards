import React, { useEffect, useContext } from "react";
import styles from "../css/AuthenticatedView.module.scss";
import { Route, Switch } from "react-router-dom";
import { AuthContext } from "../state/AuthContext";
import { GlobalStateContext } from "../state/GlobalStateContext";
import { getResidentsByUserEmail } from "../helpers/utils_residents";
import { getUserProfileByEmail } from "../helpers/utils_userData";
import { hydrateState } from "../helpers/state_helpers";
import { isEmptyArray } from "../helpers/utils_types";
import Dashboard from "../components/Dashboard";
import Navbar from "../components/Navbar";
import ResidentSearch from "../components/ResidentSearch";

const AuthenticatedView = () => {
  const { authData } = useContext(AuthContext);
  const { state, dispatch } = useContext(GlobalStateContext);

  // gets residents and user profile and sets state
  const fetchInitialResource = async () => {
    const { token, username } = authData;
    const residentsData = await getResidentsByUserEmail(token, username);
    const profileData = await getUserProfileByEmail(token, username);

    const { ADVUSER } = profileData;
    const userProfile = ADVUSER[0];
    const residents = JSON.parse(residentsData.Data);

    if (!isEmptyArray(residents)) {
      const merged = {
        userData: userProfile,
        residents: residents
      };
      return dispatch({
        type: "SUCCESS",
        data: {
          newState: { ...hydrateState(merged, state) }
        }
      });
    }
  };

  useEffect(() => {
    let isMounted = true; // prevents memory leaks
    if (!isMounted) {
      return;
    }
    fetchInitialResource();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.AuthenticatedView}>
      <Navbar hasAlerts={false} />
      <section className={styles.AuthenticatedView_container}>
        <ResidentSearch
          label="PLEASE SELECT A RESIDENT"
          residents={state.globals.residents}
        />
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </section>
    </div>
  );
};
export default AuthenticatedView;
