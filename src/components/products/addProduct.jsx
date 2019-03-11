import React, { Component } from "react";
import $ from "jquery";
import uuid from "uuid";
import Form from "../form/form";
import { EngNum } from "../table/common/persiandigit";

export class AddProduct extends Form {
  state = {
    data: {
      id: "",
      img: "",
      imgs: [],
      imgFile: [],
      imgFiles: [],
      file: "",
      files: [],
      category: "",
      proCode: "",
      diverseCode: "",
      name: "",
      brand: "",
      buyPrice: "",
      refPrice: "",
      breakEvenPrice: "",
      wholePrice: "",
      retailPrice: "",
      marketPlacePrice: "",
      retailStoreStock: "",
      wholeStoreStock: "",
      virtualStoreStock: "",
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
    data.breakEvenPrice =
      parseInt(EngNum(data.buyPrice)) + parseInt(EngNum(data.buyPrice)) * 0.2;
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
          {/* <h5 className="text-center m-3 be-bold">افزودن محصول</h5> */}

          <div className="row m-2">
            {this.renderSubmitBtn("ذخیره")}
            {this.renderCancelBtn("لغو")}
            <button className="btn btn-danger">ذخیره</button>
          </div>
          <div className="row">
            {this.renderSelect("category", "دسته بندی", categories, "3")}
            {this.renderInput("proCode", "کد محصول", "3")}
            {this.renderInput("diverseCode", "کد تنوع", "3")}
            {this.renderInput("name", "عنوان", "5", true)}
            {this.renderInput("brand", "برند")}
            {this.renderInput("buyPrice", "قیمت خرید")}
            {this.renderInput("refPrice", "قیمت مرجع")}
            {this.renderInput("wholePrice", "قیمت عمده فروشی")}
            {this.renderInput("retailPrice", "قیمت خرده فروشی")}
            {this.renderInput("marketPlacePrice", "قیمت مارکت پلیس")}
            {this.renderInput(
              "retailStoreStock",
              "موجودی انبار خرده فروشی",
              "2"
            )}
            {this.renderInput(
              "wholeStoreStock",
              "موجودی انبار عمده فروشی",
              "2"
            )}
            {this.renderInput(
              "virtualStoreStock",
              "موجودی انبار دیجیکالا",
              "2"
            )}
            {this.renderInput("boxQuantity", "تعداد در جعبه")}
            {this.renderImage("img", " انتخاب عکس اصلی")}

            {this.renderGallery("imgs", "انتخاب عکس گالری")}
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default AddProduct;
