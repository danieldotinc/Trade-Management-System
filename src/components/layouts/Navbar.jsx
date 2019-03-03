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
      <React.Fragment>
        {/* <nav
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
              <li className="dropdown">
                <Link className="dropdown-toggle" data-toggle="dropdown" to="#">
                  Page 1<span className="caret" />
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="#">Page 1-1</Link>
                  </li>
                  <li>
                    <Link to="#">Page 1-2</Link>
                  </li>
                  <li>
                    <Link to="#">Page 1-3</Link>
                  </li>
                </ul>
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
        </nav> */}
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">مدیریت کسب و کار</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto pr-5">
              <Nav.Link href="/Home">خانه</Nav.Link>
              <Nav.Link href="#link">حساب کاربری</Nav.Link>
              <NavDropdown title="اشخاص" id="basic-nav-dropdown">
                <NavDropdown.Item href="/Profiles">
                  کسب و کارها
                </NavDropdown.Item>
                <NavDropdown.Item href="/Profiles/Employees">
                  کارمندان
                </NavDropdown.Item>
                <NavDropdown.Item href="/Profiles/Customers">
                  مشتریان
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-success">جستجو</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </React.Fragment>
    );
  }
}

export default withRouter(Navigation);
