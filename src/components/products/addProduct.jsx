import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  getProductItem,
  addProductItem,
  updateProductItem
} from "../../actions/productActions";
import { getSettingItems } from "../../actions/settingActions";
import { getCategoryItems } from "../../actions/categoryActions";
import { getDigiKalaShipping } from "../../handlers/digikala";

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
      img: "",
      imgs: [],
      imgFile: [],
      imgFiles: [],
      file: "",
      files: [],
      category: "",
      categoryId: 0,
      proCode: "",
      diverseCode: "",
      myKitchenCode: "",
      myKitchenPlusCode: "",
      nikradCode: "",
      nikradText: "",
      name: "",
      brand: "",
      tradeListPrice: "",
      tradeBuyingPrice: "",
      buyingPriceHistory: "",
      valueAdded: "",
      commission: "",
      shippingCosts: "",
      refPrice: "",
      breakEvenPrice: "",
      wholePrice: "",
      retailPrice: "",
      marketPlacePrice: "",
      retailStoreStock: "",
      wholeStoreStock: "",
      virtualStoreStock: "",
      boxQuantity: "",
      width: "",
      length: "",
      height: "",
      weight: ""
    },
    errors: {}
  };

  componentDidMount() {
    this.props.getCategoryItems();
    this.props.getSettingItems();
    this.handleCleaningForm();
    this.handleEditForm();
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (this.props.match.params.id) {
      const { product, loadingProduct } = nextProps;
      if (loadingProduct || !product) return <h1>Loading...</h1>;
      this.setState({ data: product });
    }
  }

  handlePreparingForm = data => {
    const { categories } = this.props;
    if (!data.categoryId) {
      data.category = categories[0].name;
      data.categoryId = categories[0]._id;
    }
    return data;
  };

  handleNotify = name => {
    let msg = this.props.match.params.id
      ? " با موفقیت به روزرسانی شد."
      : " با موفقیت اضافه شد.";
    toast.info(name + msg);
  };

  handleEditForm = () => {
    const id = this.props.match.params.id;
    id && this.props.getProductItem(id);
  };

  getCostAndTax = () => {
    if (!this.props.settings) return 0;
    return (
      parseInt(this.props.settings[1].set) +
      (this.props.product.tradeBuyingPrice * this.props.settings[0].set) / 100
    );
  };

  getMarketPlaceCosts = data => {
    const { length, width, height, weight } = data;
    return (
      getDigiKalaShipping(length, width, height, weight) + this.getCostAndTax()
    );
  };

  getWholePrice = buyPrice =>
    buyPrice +
    (this.props.settings[2].set / 100) * buyPrice +
    this.getCostAndTax();

  getRetailPrice = buyPrice =>
    buyPrice +
    (this.props.settings[3].set / 100) * buyPrice +
    this.getCostAndTax();

  getMarketPlacePrice = data =>
    parseInt(EngNum(data.tradeBuyingPrice)) +
    (this.props.settings[4].set / 100) *
      parseInt(EngNum(data.tradeBuyingPrice)) +
    this.getCostAndTax() +
    this.getMarketPlaceCosts(data);

  handleCalculatingData = data => {
    data.breakEvenPrice = (
      parseInt(EngNum(data.tradeBuyingPrice)) +
      parseInt(EngNum(data.tradeBuyingPrice)) * 0.2
    ).toString();
    for (let key of Object.keys(data)) {
      console.log(data[key]);
      if (!data[key] && key === "wholePrice")
        data.wholePrice = this.getWholePrice(
          parseInt(EngNum(data.tradeBuyingPrice))
        );
      if (!data[key] && key === "retailPrice")
        data.retailPrice = this.getRetailPrice(
          parseInt(EngNum(data.tradeBuyingPrice))
        );
      if (!data[key] && key === "marketPlacePrice")
        data.marketPlacePrice = this.getMarketPlacePrice(data);
    }
    return data;
  };

  handleBack = () => {
    this.props.onRoute("/Products");
    this.props.history.push("/Products");
  };

  doSubmit = data => {
    const newData = this.handleCalculatingData(data);
    const result = this.handlePreparingForm(newData);

    this.props.match.params.id
      ? this.props.updateProductItem(result)
      : this.props.addProductItem(result);

    this.props.onRoute("/Products");
    this.props.history.push("/Products");
    this.handleNotify(result.name);
  };

  render() {
    const { categories, loadingCategories } = this.props;
    if (!categories || loadingCategories) return <h1>Loading...</h1>;
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
                {this.renderSubmitBtn()}
                {this.renderCancelBtn("لغو")}
              </div>
              <div className="row">
                {this.renderInput("proCode", "کد محصول")}
                {this.renderInput("diverseCode", "کد تنوع")}
                {this.renderInput("myKitchenCode", "کد مای کیچن")}
                {this.renderInput("myKitchenPlusCode", "کد مای کیچن پلاس")}
                {this.renderInput("nikradCode", "کد نیکراد")}
                {this.renderSelect("category", "دسته بندی", categories, "4")}
                {this.renderInput("name", "عنوان", "6", true)}
                {this.renderInput("brand", "برند")}
                {this.renderInput("weight", "وزن")}
                {this.renderInput("width", "عرض")}
                {this.renderInput("length", "طول")}
                {this.renderInput("height", "ارتفاع")}
                {this.renderInput("tradeListPrice", "قیمت لیست")}
                {this.renderInput("tradeBuyingPrice", "قیمت خرید")}
                {this.renderInput("commission", "کمیسیون")}
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
                {this.renderInput(
                  "buyingPriceHistory",
                  "قیمت خرید های قبلی",
                  "11"
                )}
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

const mapStateToProduct = state => ({
  settings: state.setting.settings,
  categories: state.category.categories,
  loadingCategories: state.category.loading,
  product: state.product.product,
  loadingProduct: state.product.loading
});

export default connect(
  mapStateToProduct,
  {
    getProductItem,
    getCategoryItems,
    addProductItem,
    updateProductItem,
    getSettingItems
  }
)(withStyles(rtlStyle)(AddProduct));
