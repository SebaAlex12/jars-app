import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import history from "./history";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Dashboard from "./components/dashboard/Dashboard";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Jars from "./components/jars/Jars";

import "./App.scss";

// Check for token
if (localStorage.jwtToken) {
  //  Set auth token auth
  setAuthToken(localStorage.jwtToken);
  // Decode token get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and Authenticate
  store.dispatch(setCurrentUser(decoded));

  // check for expire token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div className="App">
            <Navbar />
            <div className="page-center-box">
              <Route exact path="/" component={Landing} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/jars" component={Jars} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
