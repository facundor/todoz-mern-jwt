import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Home from "./components/Home/Home";
import AuthState from "./context/auth/authState";
import AlertState from "./context/alert/alertState";
import Alert from "./components/Alert/Alert";
import PrivateRoute from "./components/Helpers/PrivateRoute"
import tokenAuth from "./config/token";

function App() {
  // Check if token is in storage
  const token = localStorage.getItem('token');
  tokenAuth(token);

  return (
    <AlertState>
      <AuthState>
          <Switch>
            <Route exact path="/" component={SignIn} />
            <PrivateRoute path="/home" component={Home} />
            <Route exact path="/signup" component={SignUp} />
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        <Alert />
      </AuthState>
    </AlertState>
  );
}

function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

export default App;
