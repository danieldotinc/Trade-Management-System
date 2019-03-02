import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

export class Navbar extends Component {
  getClass = route => {
    if (this.props.location.pathname == route) return "nav-item active";
    return "nav-item";
  };
  render() {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        style={{ direction: "rtl" }}
      >
        <Link className="navbar-brand" to="#">
          مدیریت کسب و کار
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className={this.getClass("/Home")}>
              <Link className="nav-link" to="/Home">
                خانه <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className={this.getClass("/Profiles")}>
              <Link className="nav-link" to="/Profiles">
                اشخاص
              </Link>
            </li>
            <li className={this.getClass("/Account")}>
              <Link className="nav-link" to="/account">
                حساب کاربری
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
