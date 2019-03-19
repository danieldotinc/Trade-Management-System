import React, { Component } from "react";
import Form from "../form/form";
import { EngNum } from "../table/common/persiandigit";
import { ToastContainer, toast } from "react-toastify";

import GridItem from "../Grid/GridItem";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";
import withStyles from "@material-ui/core/styles/withStyles";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

import auth from "../../services/authService";

export class Login extends Form {
  state = {
    data: {
      username: "",
      password: ""
    },
    errors: {}
  };

  doSubmit = async data => {
    try {
      await auth.login(data);
      this.handleCleaningForm();
      window.location = "/Dashboard";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.info("نام کاربری یا رمز عبور اشتباه است.");
      }
    }
  };

  render() {
    return (
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4>ورود کاربران</h4>
            <p>ورود به سامانه مدیریت کسب و کار</p>
          </CardHeader>
          <CardBody>
            <form
              onSubmit={this.handleFormSubmission}
              id="addnewform1"
              className="container"
            >
              <div className="row">
                <div className="col-6">
                  {this.renderInput("username", "نام کاربری", "8", true)}
                  {this.renderInput(
                    "password",
                    "رمز عبور",
                    "8",
                    true,
                    "password"
                  )}
                  <div className="row m-2 d-flex justify-content-start mr-5">
                    {this.renderSubmitBtn("ورود", "info", true)}
                  </div>
                </div>

                <div className="col-5 mt-5 mr-5">
                  <img src="../../1616-info.png" style={{ width: "300px" }} />
                </div>
              </div>
            </form>
          </CardBody>
        </Card>
      </GridItem>
    );
  }
}

export default withStyles(rtlStyle)(Login);
