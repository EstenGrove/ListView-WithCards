import React from "react";
import "./App.scss";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { AuthProvider } from "./state/AuthContext";
import { GlobalStateProvider } from "./state/GlobalStateContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import NonAuthenticatedView from "./views/NonAuthenticatedView";
import AuthenticatedView from "./views/AuthenticatedView";
import PageNotFound from "./pages/PageNotFound";

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <AuthProvider>
        <GlobalStateProvider>
          <div className="App">
            <Switch>
              <Route exact path="/" component={NonAuthenticatedView} />
              <ProtectedRoute path="/dashboard" component={AuthenticatedView} />
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </GlobalStateProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
