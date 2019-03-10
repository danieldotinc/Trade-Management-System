import React, { Component } from "react";
import $ from "jquery";
import uuid from "uuid";
import Form from "../form/form";

export class AddProduct extends Form {
  state = {
    data: {
      id: "",
      img: "",
      category: "",
      proCode: "",
      diverseCode: "",
      name: "",
      brand: "",
      refPrice: "",
      wholePrice: "",
      singlePrice: "",
      stock: "",
      boxQuantity: ""
    },
    errors: {}
  };

  componentDidMount() {
    this.props.state.editForm
      ? this.setState({ data: this.props.state.detailedModal.item })
      : this.handleCleaningForm();
  }

  handleBack = () => {
    this.props.onRoute("/Products");
    this.props.history.push("/Products");
  };

  doSubmit = data => {
    this.props.onAddItem(data);
    this.props.onRoute("/Products");
    this.props.history.push("/Products");
    this.handleCleaningForm();
  };

  render() {
    const { types: categories } = this.props.state;
    return (
      <React.Fragment>
        <form
          onSubmit={this.handleFormSubmission}
          id="addnewform1"
          className="card shadow-lg p-3 mb-5 bg-white rounded"
        >
          <h5 className="text-center m-3 be-bold">افزودن محصول</h5>
          <div className="row m-2">
            {this.renderSubmitBtn("ذخیره")}
            {this.renderCancelBtn("لغو")}
          </div>
          <div className="row">
            {this.renderSelect("category", "دسته بندی", categories)}
            {this.renderInput("proCode", "کد محصول")}
            {this.renderInput("diverseCode", "کد تنوع")}
            {this.renderInput("name", "عنوان", "5", true)}
            {this.renderInput("brand", "برند")}
            {this.renderInput("boxQuantity", "تعداد در جعبه", "2")}
            {this.renderInput("refPrice", "قیمت مرجع", "2")}
            {this.renderInput("wholePrice", "قیمت عمده", "2")}
            {this.renderInput("singlePrice", "قیمت تکی", "2")}
            {this.renderInput("stock", "موجودی", "2")}
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default AddProduct;
