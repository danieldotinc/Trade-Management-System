import React, { Component } from "react";
import $ from "jquery";
import uuid from "uuid";
import Form from "../form/form";
import GridItem from "../Grid/GridItem";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";
import withStyles from "@material-ui/core/styles/withStyles";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

export class AddPerson extends Form {
  state = {
    data: {
      name: "",
      company: "",
      type: "",
      mobile: "",
      postalCode: "",
      telephone: "",
      telExtention: "",
      state: "",
      city: "",
      address: "",
      credit: "",
      identityType: ""
    },
    errors: {}
  };

  componentDidMount() {
    this.props.state.editForm
      ? this.setState({ data: this.props.state.detailedModal.item })
      : this.handleCleaningForm();
  }

  handleBack = () => {
    this.props.onRoute("/Profiles/" + this.props.state.listName);
    this.props.history.push("/Profiles/" + this.props.state.listName);
  };

  doSubmit = data => {
    this.props.onAddItem(data);
    this.props.onRoute("/Profiles/" + this.props.state.listName);
    this.props.history.push("/Profiles/" + this.props.state.listName);
    this.handleCleaningForm();
  };

  render() {
    const { pageName, types, identityTypes } = this.props.state;
    return (
      <React.Fragment>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="rose">
              <h4 className={this.props.classes.cardTitleWhite}>افزودن شخص</h4>
              <p className={this.props.classes.cardCategoryWhite}>
                افزودن شخص جدید
              </p>
            </CardHeader>
            <CardBody>
              <form onSubmit={this.handleFormSubmission} id="addnewform1">
                <div className="row m-2">
                  {this.renderSubmitBtn("ذخیره")}
                  {this.renderCancelBtn("لغو")}
                </div>
                <div className="row">
                  {this.renderInput("name", "نام و نام خانوادگی", "3", true)}
                  {this.renderSelect("identityType", "هویت", identityTypes)}
                  {this.renderSelect("type", "حوزه فعالیت", types)}
                  {this.renderInput("company", "نام کسب و کار")}
                  {this.renderInput("mobile", "شماره موبایل", "3", true)}
                  {this.renderInput("telephone", "تلفن")}
                  {this.renderInput("telExtention", "تلفن داخلی")}
                  {this.renderInput("postalCode", "کد پستی")}
                  {this.renderInput("state", "استان")}
                  {this.renderInput("city", "شهر")}
                  {this.renderInput("address", "آدرس", "5", false)}
                  {this.renderInput("credit", "اعتبار")}
                </div>
              </form>
            </CardBody>
          </Card>
        </GridItem>
      </React.Fragment>
    );
  }
}

export default withStyles(rtlStyle)(AddPerson);
