import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button
} from "react-bootstrap";

export class Navigation extends Component {
  getClass = route => {
    if (this.props.location.pathname == route) return "nav-item active";
    return "nav-item";
  };
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          مدیریت کسب و کار
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul
            className="navbar-nav mr-auto"
            style={{ textAlign: "right !important" }}
          >
            <li className="nav-item active">
              <a className="nav-link" href="#">
                داشبورد <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                حساب کاربری
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                اشخاص
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/Profiles/Business">
                  کسب و کارها
                </a>
                <a className="dropdown-item" href="/Profiles/Customer">
                  مشتریان
                </a>
                <div className="dropdown-divider" />
                <a className="dropdown-item" href="/Profiles/Employee">
                  کارمندان
                </a>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#">
                Disabled
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navigation);
