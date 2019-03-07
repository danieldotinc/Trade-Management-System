import React, { Component } from "react";
import $ from "jquery";
import uuid from "uuid";
import Form from "../form/form";

export class AddBusinessPerson extends Form {
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
      identityType: "کسب و کار"
    },
    errors: {}
  };

  componentDidMount() {
    this.props.state.editForm
      ? this.setState({ data: this.props.state.detailedModal.item })
      : this.handleCleaningForm();
  }

  handleBack = () => {
    this.props.onRoute("/Profiles/Business");
    this.props.history.push("/Profiles/Business");
  };

  doSubmit = data => {
    console.log("submitted!");
    this.props.onAddItem(data);
    this.props.onRoute("/Profiles/Business");
    this.props.history.push("/Profiles/Business");
    this.handleCleaningForm();
  };

  render() {
    const { data, onFormChange } = this.state;
    return (
      <React.Fragment>
        <form
          onSubmit={this.handleFormSubmission}
          id="addnewform1"
          className="card shadow-lg p-3 mb-5 bg-white rounded"
        >
          <h5 className="text-center m-5 be-bold">افزودن کسب و کار</h5>
          <div className="row m-2">
            {this.renderSubmitBtn("ذخیره")}
            {this.renderCancelBtn("لغو")}
          </div>
          <div className="row">
            {this.renderInput("name", "نام و نام خانوادگی", "3", true)}
            {this.renderInput("company", "نام کسب و کار", "3", false)}
            <div className="form-group m-4 col-3">
              <label htmlFor="selectInput">حوزه فعالیت</label>
              <select
                className="form-control form-control-lg"
                id="TypeInput"
                name="type"
                value={data.type}
                onChange={this.handleFormChange}
                required
              >
                {this.props.state.types.map(workType => (
                  <option key={uuid.v4()} value={workType.name}>
                    {workType.name}
                  </option>
                ))}
              </select>
            </div>
            {this.renderInput("mobile", "شماره موبایل", "3", true)}
            {this.renderInput("telephone", "تلفن", "3", false)}
            {this.renderInput("telExtention", "تلفن داخلی", "3", false)}
            {this.renderInput("postalCode", "کد پستی", "3", false)}
            {this.renderInput("state", "استان", "3", false)}
            {this.renderInput("city", "شهر", "3", false)}
            {this.renderInput("address", "آدرس", "5", false)}
            {this.renderInput("credit", "اعتبار", "3", false)}
            {this.renderInput("identityType", "", "3", false, "hidden")}
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default AddBusinessPerson;
