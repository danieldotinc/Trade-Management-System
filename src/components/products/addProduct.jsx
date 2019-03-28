import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  getProductItem,
  addProductItem,
  updateProductItem
} from "../../actions/productActions";
import { getCategoryItems } from "../../actions/categoryActions";
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
    this.props.getCategoryItems();
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
    let msg = "";
    this.props.match.params.id
      ? (msg = " با موفقیت به روزرسانی شد.")
      : (msg = " با موفقیت اضافه شد.");
    toast.info(name + msg);
  };

  handleEditForm = () => {
    const id = this.props.match.params.id;
    id && this.props.getProductItem(id);
  };

  handleCalculatingData = data => {
    data.breakEvenPrice = (
      parseInt(EngNum(data.buyPrice)) +
      parseInt(EngNum(data.buyPrice)) * 0.2
    ).toString();
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

const mapStateToProduct = state => ({
  categories: state.category.categories,
  loadingCategories: state.category.loading,
  product: state.product.product,
  loadingProduct: state.product.loading
});

export default connect(
  mapStateToProduct,
  { getProductItem, getCategoryItems, addProductItem, updateProductItem }
)(withStyles(rtlStyle)(AddProduct));
