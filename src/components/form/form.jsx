import React, { Component } from "react";
import FormValidate from "./formValidate";
import { PersianNum } from "../table/common/persiandigit";
import Input from "./input";

export default class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  handleFormChange = e => {
    const data = { ...this.state.data };
    data[e.target.name] = PersianNum(e.target.value);
    const errors = FormValidate(e);
    this.setState({ data, errors });
  };

  handleFormSubmission = e => {
    e.preventDefault();
    const data = this.state.data;
    this.doSubmit(data);
  };

  handleCleaningForm = () => {
    const data = { ...this.state.data };
    Object.keys(data).map((keyName, i) => (data[keyName] = ""));
    this.setState({ data });
  };

  renderSubmitBtn = label => {
    return <button className="btn btn-primary m-2">{label}</button>;
  };

  renderCancelBtn = label => {
    return (
      <span className="btn btn-secondary m-2" onClick={this.handleBack}>
        {label}
      </span>
    );
  };

  renderInput = (name, label, size, required = false, type = "text") => {
    const { data } = this.state;
    return (
      <Input
        type={type}
        name={name}
        label={label}
        size={size}
        required={required}
        value={data[name]}
        onChange={this.handleFormChange}
      />
    );
  };
}
