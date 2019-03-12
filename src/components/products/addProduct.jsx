import React, { Component } from "react";
import $ from "jquery";
import uuid from "uuid";
import Form from "../form/form";
import { EngNum } from "../table/common/persiandigit";

import GridItem from "../Grid/GridItem";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";
import withStyles from "@material-ui/core/styles/withStyles";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

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
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="rose">
            <h4 className={this.props.classes.cardTitleWhite}>افزودن محصول</h4>
            <p className={this.props.classes.cardCategoryWhite}>
              افزودن محصول جدید
            </p>
          </CardHeader>
          <CardBody>
            <form onSubmit={this.handleFormSubmission} id="addnewform1">
              <div className="row m-2">
                {this.renderSubmitBtn("ذخیره")}
                {this.renderCancelBtn("لغو")}
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
          </CardBody>
        </Card>
      </GridItem>
    );
  }
}

export default withStyles(rtlStyle)(AddProduct);
