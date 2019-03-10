import React, { Component } from "react";
import $ from "jquery";
import uuid from "uuid";
import Form from "../form/form";

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
    const { types, identityTypes } = this.props.state;
    return (
      <React.Fragment>
        <form
          onSubmit={this.handleFormSubmission}
          id="addnewform1"
          className="card shadow-lg p-3 mb-5 bg-white rounded"
        >
          <h5 className="text-center m-3 be-bold">افزودن شخص</h5>
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
      </React.Fragment>
    );
  }
}

export default AddPerson;
