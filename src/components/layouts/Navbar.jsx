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
    const { onRoute } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="#">
          مدیریت کسب و کار
        </Link>
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
              <Link className="nav-link" to="#">
                داشبورد <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                حساب کاربری
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                اشخاص
              </Link>
              <div
                className="dropdown-menu text-right"
                aria-labelledby="navbarDropdown"
              >
                <Link
                  className="dropdown-item"
                  to="/Profiles/Business"
                  onClick={() => onRoute("/Profiles/Business")}
                >
                  کسب و کار
                </Link>
                <Link
                  className="dropdown-item"
                  to="/Profiles/Customer"
                  onClick={() => onRoute("/Profiles/Customer")}
                >
                  فرد
                </Link>
                <div className="dropdown-divider" />
                <Link
                  className="dropdown-item"
                  to="/Profiles/Employee"
                  onClick={() => onRoute("/Profiles/Employee")}
                >
                  کارمند
                </Link>
              </div>
            </li>
            <li className="nav-item">
              <Link className="nav-link disabled" to="#">
                Disabled
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navigation);
