import React, { Component } from "react";
import FormValidate from "./formValidate";
import { PersianNum, EngNum } from "../table/common/persiandigit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImages,
  faImage,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
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
        for (let file of e.target.files) {
          data.imgs.push(file.name);
          data.files.push(file);
          data.imgFiles.push([URL.createObjectURL(file)]);
        }
        this.setState({ data });
      }
    } else if (e.target.type === "select-one") {
      data[e.target.name] = PersianNum(e.target.value);
      var index = e.target.selectedIndex;
      var optionElement = e.target.childNodes[index];
      var optionId = optionElement.getAttribute("id");
      data[e.target.name + "Id"] = optionId;
      const errors = FormValidate(e);
      this.setState({ data, errors });
    } else if (
      e.target.value &&
      e.target.name.includes("Price") &&
      e.target.name !== "buyingPriceHistory"
    ) {
      const clearValue = e.target.value.replace(/,/g, "");
      const value = EngNum(clearValue);
      data[e.target.name] = PersianNum(parseInt(value).toLocaleString());
      const errors = FormValidate(e);
      this.setState({ data, errors });
    } else {
      data[e.target.name] = PersianNum(e.target.value);
      const errors = FormValidate(e);
      this.setState({ data, errors });
    }
  };

  handleFormSubmission = e => {
    e.preventDefault();
    let data = { ...this.state.data };
    for (let i = 0; i < Object.keys(e.target).length; i++) {
      if (
        e.target[i] &&
        e.target[i].name !== "img" &&
        e.target[i].name !== "file" &&
        e.target[i].name !== "imgs" &&
        e.target[i].name !== "submit"
      ) {
        if (e.target[i].name.includes("Price")) {
          e.target[i].value = e.target[i].value.replace(/,/g, "");
        }
        data[e.target[i].name] = EngNum(e.target[i].value);
      }
    }
    this.doSubmit(data);
  };

  handleCleaningForm = () => {
    const data = { ...this.state.data };
    for (let key in data) data[key] = "";
    this.setState({ data });
  };

  renderSubmitBtn = (label = "", color = "info", style = false) => {
    function getSubmitStyle(style) {
      if (style === false)
        return { backgroundColor: "#e91e63", borderColor: "#e91e63" };
    }
    return (
      <button
        type="submit"
        name="submit"
        className={`btn btn-lg btn-${color} m-2 shadow-lg rounded`}
        style={getSubmitStyle(style)}
      >
        {label === "" && <i className="fa fa-arrow-down" />}
        {label !== "" && label}
      </button>
    );
  };

  renderCancelBtn = label => {
    return (
      <span
        className="btn btn-lg btn-secondary m-2 shadow-lg rounded"
        onClick={this.handleBack}
      >
        <i className="fa fa-times" />
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
        <div className="fadein">
          <div
            onClick={() => {
              data.img = "";
              data.imgFile = [];
              data.file = null;
              this.setState({ data });
            }}
            className="delete"
          >
            <FontAwesomeIcon icon={faTimesCircle} size="2x" />
            <div className="clearfix"> </div>
            <img
              style={{
                maxWidth: "150px",
                maxHeight: "130px",
                borderRadius: "50%"
              }}
              className="shadow rounded"
              src={data.imgFile || `../${data.img}`}
            />
          </div>
        </div>
      );
    } else {
      img = (
        <div className="button">
          <label htmlFor="single">
            <FontAwesomeIcon icon={faImage} color="#3B5998" size="10x" />
          </label>
        </div>
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
          <div className="fadein">
            <div
              onClick={() => {
                data.imgs.splice(i, 1);
                data.imgFiles && data.imgFiles.splice(i, 1);
                data.files && data.files.splice(i, 1);
                this.setState({ data });
              }}
              className="delete"
            >
              <FontAwesomeIcon icon={faTimesCircle} size="2x" />
              <div className="clearfix"> </div>
              <img
                style={{
                  maxWidth: "150px",
                  maxHeight: "130px",
                  borderRadius: "50%"
                }}
                className="m-2 shadow rounded"
                src={data.imgFiles ? data.imgFiles[i] : `../${item}`}
              />
            </div>
          </div>
        );
      });
    } else {
      imgs[0] = (
        <div className="button">
          <label htmlFor="multi">
            <FontAwesomeIcon icon={faImages} color="#6d84b4" size="10x" />
          </label>
        </div>
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
