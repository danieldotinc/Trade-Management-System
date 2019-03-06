import React, { Component } from "react";
import $ from "jquery";
import uuid from "uuid";
import Input from "../form/input";

export class AddBusinessPerson extends Component {
  handleBack = () => {
    this.props.onRoute("/Profiles/Business");
    this.props.history.push("/Profiles/Business");
  };

  handleFormSubmission = e => {
    e.preventDefault();
    const addNewForm = this.props.state.addNewForm;
    addNewForm.id = "15";
    this.props.onAddItem(addNewForm);
    this.props.onRoute("/Profiles/Business");
    this.props.history.push("/Profiles/Business");
  };

  //   handleRequiredEmptyField = e => {
  //     if ($(e.target).prop("required")) {
  //       e.target.setCustomValidity("please...");
  //     } else {
  //       e.target.setCustomValidity(" ");
  //       return true;
  //     }
  //   };

  render() {
    const { state, onFormChange } = this.props;
    return (
      <React.Fragment>
        <form
          onSubmit={this.handleFormSubmission}
          id="addnewform1"
          className="card shadow-lg p-3 mb-5 bg-white rounded"
        >
          <h5 className="text-center m-5 be-bold">افزودن کسب و کار</h5>
          <div className="row m-2">
            <button className="btn btn-primary m-2">ذخیره</button>
            <span className="btn btn-secondary m-2" onClick={this.handleBack}>
              لغو
            </span>
          </div>
          <div className="row">
            <Input
              name="name"
              rtlName="نام و نام خانوادگی"
              value={state.addNewForm.name}
              size="3"
              required="true"
              onChange={onFormChange}
            />
            <Input
              name="company"
              rtlName="نام کسب و کار"
              value={state.addNewForm.company}
              size="3"
              required="true"
              onChange={onFormChange}
            />
            <div className="form-group m-4 col-3">
              <label htmlFor="selectInput">حوزه فعالیت</label>
              <select
                className="form-control form-control-lg"
                id="TypeInput"
                name="type"
                value={state.addNewForm.type}
                onChange={onFormChange}
                required
              >
                {state.types.map(workType => (
                  <option key={uuid.v4()} value={workType.name}>
                    {workType.name}
                  </option>
                ))}
              </select>
            </div>
            <Input
              name="mobile"
              rtlName="شماره موبایل"
              value={state.addNewForm.mobile}
              size="3"
              required="true"
              onChange={onFormChange}
            />
            <Input
              name="telephone"
              rtlName="تلفن"
              value={state.addNewForm.telephone}
              size="3"
              required="false"
              onChange={onFormChange}
            />
            <Input
              name="telExtention"
              rtlName="تلفن داخلی"
              value={state.addNewForm.telExtention}
              size="3"
              required="false"
              onChange={onFormChange}
            />
            <Input
              name="postalCode"
              rtlName="کد پستی"
              value={state.addNewForm.postalCode}
              size="3"
              required="false"
              onChange={onFormChange}
            />
            <Input
              name="state"
              rtlName="استان"
              value={state.addNewForm.state}
              size="3"
              required="false"
              onChange={onFormChange}
            />
            <Input
              name="city"
              rtlName="شهر"
              value={state.addNewForm.city}
              size="3"
              required="false"
              onChange={onFormChange}
            />
            <Input
              name="address"
              rtlName="آدرس"
              value={state.addNewForm.address}
              size="5"
              required="false"
              onChange={onFormChange}
            />
            <Input
              name="credit"
              rtlName="اعتبار"
              value={state.addNewForm.credit}
              size="3"
              required="false"
              onChange={onFormChange}
            />
            <input type="hidden" name="identityType" value="کسب و کار" />
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default AddBusinessPerson;
