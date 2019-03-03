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
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">مدیریت کسب و کار</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto pr-5">
              <Nav.Link href="/Home">خانه</Nav.Link>
              <Nav.Link href="/Account">حساب کاربری</Nav.Link>
              <NavDropdown title="اشخاص" id="basic-nav-dropdown">
                <NavDropdown.Item href="/Profiles/Business">
                  کسب و کارها
                </NavDropdown.Item>
                <NavDropdown.Item href="/Profiles/Employee">
                  کارمندان
                </NavDropdown.Item>
                <NavDropdown.Item href="/Profiles/Customer">
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
