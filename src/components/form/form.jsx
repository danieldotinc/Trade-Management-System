import React, { Component } from "react";
import FormValidate from "./formValidate";
import { PersianNum } from "../table/common/persiandigit";
import Input from "./input";
import Select from "./select";
import UploadImg from "./uploadImg";

export default class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  handleFormChange = e => {
    let data = { ...this.state.data };
    if (e.target.files) {
      if (e.target.name == "img") {
        data.img = e.target.files[0].name;
        data.file = e.target.files[0];
        data.imgFile = [URL.createObjectURL(e.target.files[0])];
        this.setState({ data });
      } else if (e.target.name == "imgs") {
        data.imgs = [];
        data.imgFiles = [];
        data.files = [];
        for (let i = 0; i < e.target.files.length; i++) {
          data.imgs[i] = e.target.files[i].name;
          data.files[i] = e.target.files[i];
          data.imgFiles[i] = [URL.createObjectURL(e.target.files[i])];
        }
        this.setState({ data });
      }
    } else {
      data[e.target.name] = PersianNum(e.target.value);
      const errors = FormValidate(e);
      this.setState({ data, errors });
    }
  };

  handleFormSubmission = e => {
    e.preventDefault();
    let data = { ...this.state.data };
    for (let i = 0; i < e.target.length; i++) {
      if (
        e.target[i].name !== "img" &&
        e.target[i].name !== "imgs" &&
        e.target[i].name !== "submit"
      ) {
        data[e.target[i].name] = PersianNum(e.target[i].value);
      }
    }
    this.doSubmit(data);
  };

  handleCleaningForm = () => {
    const data = { ...this.state.data };
    Object.keys(data).map((keyName, i) => (data[keyName] = ""));
    this.setState({ data });
  };

  renderSubmitBtn = label => {
    return (
      <button type="submit" name="submit" className="btn btn-primary m-2">
        ذخیره
      </button>
    );
  };

  renderCancelBtn = label => {
    return (
      <span className="btn btn-secondary m-2" onClick={this.handleBack}>
        {label}
      </span>
    );
  };

  renderInput = (name, label, size = "2", required = false, type = "text") => {
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

  renderSelect = (name, label, options, size = "2") => {
    const { data } = this.state;
    return (
      <Select
        name={name}
        label={label}
        size={size}
        options={options}
        value={data[name]}
        onChange={this.handleFormChange}
      />
    );
  };

  renderImage = (
    name,
    label,
    size = "2",
    required = false,
    type = "file",
    multiple = false
  ) => {
    const { data } = this.state;
    let img = null;
    if (data.img) {
      img = (
        <img
          style={{
            maxWidth: "150px",
            maxHeight: "150px",
            borderRadius: "10px"
          }}
          src={data.imgFile}
        />
      );
    } else {
      img = (
        <div
          style={{
            border: "1px solid black",
            borderRadius: "10px",
            height: "120px",
            width: "150px"
          }}
        />
      );
    }
    return (
      <React.Fragment>
        <UploadImg
          type={type}
          name={name}
          label={label}
          size={size}
          required={required}
          multiple={multiple}
          // value={data[name]}
          onChange={this.handleFormChange}
        />
        {img}
      </React.Fragment>
    );
  };

  renderGallery = (
    name,
    label,
    size = "2",
    required = false,
    type = "file",
    multiple = true
  ) => {
    const { data } = this.state;
    let imgs = [];
    if (data.imgs[0]) {
      data.imgs.map((item, i) => {
        imgs[i] = (
          <img
            style={{
              maxWidth: "150px",
              maxHeight: "150px",
              borderRadius: "10px"
            }}
            className="m-2"
            src={data.imgFiles[i]}
          />
        );
      });
    } else {
      imgs[0] = (
        <div
          style={{
            border: "1px solid black",
            borderRadius: "10px",
            height: "120px",
            width: "150px",
            marginLeft: "5px"
          }}
        />
      );
      imgs[1] = (
        <div
          style={{
            border: "1px solid black",
            borderRadius: "10px",
            height: "120px",
            width: "150px",
            marginLeft: "5px"
          }}
        />
      );
      imgs[2] = (
        <div
          style={{
            border: "1px solid black",
            borderRadius: "10px",
            height: "120px",
            width: "150px"
          }}
        />
      );
    }
    return (
      <React.Fragment>
        <UploadImg
          type={type}
          name={name}
          label={label}
          size={size}
          required={required}
          multiple={multiple}
          // value={data[name]}
          onChange={this.handleFormChange}
        />
        {imgs.map(c => c)}
      </React.Fragment>
    );
  };
}