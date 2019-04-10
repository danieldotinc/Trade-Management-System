import React from "react";
import Spinner from "../form/spinner";
import Images from "../form/images";
import Buttons from "../form/buttons";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  getProductItem,
  addProductItem,
  updateProductItem
} from "../../actions/productActions";
import { getSettingItems } from "../../actions/settingActions";
import {
  getCategoryItems,
  addCategoryItem,
  updateCategoryItem,
  deleteCategoryItem
} from "../../actions/categoryActions";
import { getDigiKalaShipping } from "../../handlers/digikala";

import Form from "../form/form";
import { EngNum } from "../table/common/persiandigit";
import ItemsModalView from "../Modal/itemsModalView";
import GridItem from "../Grid/GridItem";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";
import withStyles from "@material-ui/core/styles/withStyles";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

export class AddProduct extends Form {
  state = {
    data: {
      uploading: true,
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
    errors: {},
    modal: false
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

  onAddItem = name => {
    this.props.addCategoryItem({ name });
    name && toast.info(name + " با موفقیت اضافه شد.");
  };

  onDeleteItem = item => {
    this.props.deleteCategoryItem(item._id);
    toast.info(item.name + " با موفقیت حذف شد.");
  };

  onEditItem = item => {
    this.props.updateCategoryItem(item);
    item.name && toast.info(item.name + " با موفقیت به روز رسانی شد.");
  };

  handleEditForm = () => {
    const id = this.props.match.params.id;
    id && this.props.getProductItem(id);
  };

  getCostAndTax = data => {
    if (!this.props.settings) return 0;
    return parseInt(this.props.settings[0].valueAdded);
  };

  getMarketPlaceCosts = data => {
    const { length, width, height, weight } = data;
    const shipCost = getDigiKalaShipping(length, width, height, weight);
    return (
      shipCost +
      this.getMarketPlaceAddedValue(shipCost) +
      this.getCostAndTax(data)
    );
  };

  getMarketPlaceAddedValue = shipCost => shipCost * 0.09;

  getMarketPlaceCommission = () => 0.1;

  getShipping = data => {
    const { length, width, height, weight } = data;
    return getDigiKalaShipping(length, width, height, weight);
  };

  getAddedValue = () => 0.09;

  getWholePrice = data =>
    Math.round(
      (parseInt(EngNum(data.tradeBuyingPrice)) + this.getShipping(data) * 2) /
        (1 -
          parseInt(this.props.settings[0].wholeProfit.set) / 100 -
          this.getAddedValue()) /
        10
    ) * 10;

  getRetailPrice = data =>
    Math.round(
      (parseInt(EngNum(data.tradeBuyingPrice)) + this.getShipping(data) * 2) /
        (1 -
          parseInt(this.props.settings[0].retailProfit) / 100 -
          this.getAddedValue()) /
        10
    ) * 10;

  getMarketPlacePrice = data =>
    Math.round(
      (parseInt(EngNum(data.tradeBuyingPrice)) +
        this.getMarketPlaceCosts(data)) /
        (1 -
          parseInt(this.props.settings[0].marketPlaceProfit) / 100 -
          this.getAddedValue() -
          this.getMarketPlaceCommission()) /
        10
    ) * 10;

  handleCalculatingData = data => {
    for (let key of Object.keys(data)) {
      if (!data[key] && key === "wholePrice")
        data.wholePrice = this.getWholePrice(data);
      if (!data[key] && key === "retailPrice")
        data.retailPrice = this.getRetailPrice(data);
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
    const finaldata = new FormData();
    for (let key in result) finaldata.append(key, result[key]);
    if (result.files)
      for (let img of result.files) finaldata.append("file", img);

    this.props.match.params.id
      ? this.props.updateProductItem({ item: finaldata, id: result._id })
      : this.props.addProductItem(finaldata);

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
                <button
                  type="button"
                  className={`btn btn-dark shadow rounded btn-lg m-2`}
                  onClick={() => this.setState({ modal: true })}
                  data-toggle="modal"
                  data-target={"#abc"}
                >
                  دسته بندی ها
                </button>
                {this.state.modal && (
                  <ItemsModalView
                    id="abc"
                    title="دسته بندی ها"
                    items={categories}
                    onAdd={this.onAddItem}
                    onEdit={this.onEditItem}
                    onDelete={this.onDeleteItem}
                    classes="btn-lg m-2"
                  />
                )}
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
    addCategoryItem,
    updateCategoryItem,
    deleteCategoryItem,
    addProductItem,
    updateProductItem,
    getSettingItems
  }
)(withStyles(rtlStyle)(AddProduct));
