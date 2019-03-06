import React, { Component } from "react";
import uuid from "uuid";

export class AddPerson extends Component {
  handleBack = () => {
    this.props.onRouteChange("/Profiles/Business");
    this.props.history.push("/Profiles/Business");
  };
  render() {
    const { state, onFormChange } = this.props;
    return (
      <React.Fragment>
        <form id="addnewform1" className="row container">
          <div className="form-group m-4 col-4">
            <label htmlFor="fullNameInput">نام و نام خانوادگی</label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="fullNameInput"
              aria-describedby="emailHelp"
              name="name"
              onChange={onFormChange}
              value={state.addNewForm.name}
              placeholder="..."
              required
            />
          </div>
          <div className="form-group m-4 col-4">
            <label htmlFor="selectInput">حوزه فعالیت</label>
            <select className="form-control form-control-lg" id="selectInput">
              {state.types.map(workType => (
                <option key={uuid.v4()}>{workType.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group m-4  col-4">
            <label htmlFor="mobileInput">شماره موبایل</label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="mobileInput"
              name="mobile"
              onChange={onFormChange}
              value={state.addNewForm.mobile}
              placeholder="..."
              required
            />
          </div>
          <div className="form-group m-4 col-4">
            <label htmlFor="telephoneInput">تلفن</label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="telephoneInput"
              name="telephone"
              onChange={onFormChange}
              value={state.addNewForm.telephone}
              placeholder="..."
            />
          </div>
          <div className="clearfix" />
          <div className="form-group m-4 col-4">
            <button className="btn btn-primary ml-2">ذخیره</button>
            <button
              className="btn btn-secondary"
              onClick={() => this.handleBack}
            >
              لغو
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default AddPerson;
