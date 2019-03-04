import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import $ from "jquery";
import Popper from "popper.js";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/" component={App} />
      {/* <Redirect from="/" to="/Home" /> */}
    </Switch>
  </Router>,
  document.getElementById("root")
);
