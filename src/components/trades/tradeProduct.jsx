import React, { Component } from "react";
import { connect } from "react-redux";
import auth from "../../services/authService";
import Input from "../form/input";
import { getSettingItems } from "../../actions/settingActions";
import { toast } from "react-toastify";
import { getDigiKalaShipping } from "../../handlers/digikala";
import {
  getProfitByPercent,
  getProfitByPrice,
  getPercentByProfit,
  getPercentByPrice,
  getPriceByPercent,
  getPriceByProfit,
  getPercent,
  getDiffPrice
} from "../../handlers/profit";
import {
  getProductItem,
  updateProductItem
} from "../../actions/productActions";
import { PersianNum, EngNum } from "../table/common/persiandigit";
import ListGroupItem from "../listGroup/listGroupItem";
import Form from "../form/form";
import GridItem from "../Grid/GridItem";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";
import withStyles from "@material-ui/core/styles/withStyles";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

class Trade extends Form {
  state = {
    data: {
      tradeBuyingPrice: 0,
      weight: "",
      length: "",
      width: "",
      height: "",
      wholePrice: "",
      wholeProfitPercent: "",
      wholeProfitDiffPrice: "",
      wholePriceWithoutValueAdded: "",
      wholeProfitPercentWithoutValueAdded: "",
      wholeProfitDiffPriceWithoutValueAdded: "",
      retailPrice: "",
      retailProfitPercent: "",
      retailProfitDiffPrice: "",
      retailPriceWithoutValueAdded: "",
      retailProfitPercentWithoutValueAdded: "",
      retailProfitDiffPriceWithoutValueAdded: "",
      marketPlacePrice: "",
      marketPlaceProfitPercent: "",
      marketPlaceProfitDiffPrice: "",
      marketPlacePriceWithoutValueAdded: "",
      marketPlaceProfitPercentWithoutValueAdded: "",
      marketPlaceProfitDiffPriceWithoutValueAdded: ""
    }
  };

  componentDidMount = () => {
    this.props.getSettingItems();
    this.handleEditTrade();
  };

  componentWillReceiveProps(nextProps, nextState) {
    if (this.props.match.params.id) {
      const { product, loadingProduct } = nextProps;
      if (loadingProduct || !product) return <h1>Loading...</h1>;
      this.handleMapPropToState(product);
      this.handleOnChangeEvents(product);
    }
  }

  handleMapPropToState = product => {
    const data = { ...this.state.data };
    data.tradeBuyingPrice = product.tradeBuyingPrice;
    data.retailPrice = product.retailPrice;
    data.wholePrice = product.wholePrice;
    data.marketPlacePrice = product.marketPlacePrice;
    data.weight = product.weight;
    data.length = product.length;
    data.width = product.width;
    data.height = product.height;
    this.setState({ data });
  };

  handleOnChangeEvents = product => {
    setTimeout(() => {
      this.handleProfitChangeWholePrice({
        target: {
          name: "wholePrice",
          value: product.wholePrice
        }
      });
      this.handleProfitChangeRetailPrice({
        target: {
          name: "retailPrice",
          value: product.retailPrice
        }
      });
      this.handleMarketPlaceProfitChange({
        target: { name: "marketPlacePrice", value: product.marketPlacePrice }
      });
    }, 1500);
  };

  handleEditTrade = () => {
    const id = this.props.match.params.id;
    id && this.props.getProductItem(id);
  };

  handleBasicChange = e => {
    const data = { ...this.state.data };
    const clearValue = e.target.value.replace(/,/g, "");
    const value = EngNum(clearValue);
    data[e.target.name] = value;
    this.setState({ data });
  };

  handleMarketPlaceProfitChange = e => {
    const data = { ...this.state.data };
    const clearValue = e.target.value.replace(/,/g, "");
    const value = EngNum(clearValue);
    data[e.target.name] = parseInt(value);
    if (value && e.target.name.includes("Percent")) {
      data.marketPlacePrice =
        Math.round(
          (parseInt(data.tradeBuyingPrice) +
            this.getMarketPlaceCosts() +
            this.getCostAndTax()) /
            (1 -
              parseInt(value) / 100 -
              this.getMarketPlaceCommission() -
              this.getAddedValue()) /
            10
        ) * 10;
      data.marketPlaceProfitDiffPrice =
        Math.round(getProfitByPercent(data.marketPlacePrice, value) / 10) * 10;
    } else if (value && e.target.name.includes("Profit")) {
      data.marketPlacePrice =
        Math.round(
          (parseInt(data.tradeBuyingPrice) +
            parseInt(value) +
            this.getMarketPlaceCosts() +
            this.getCostAndTax()) /
            (1 - this.getMarketPlaceCommission() - this.getAddedValue()) /
            10
        ) * 10;

      data.marketPlaceProfitPercent = getPercentByProfit(
        data.marketPlacePrice,
        value
      );
    } else if (value && e.target.name.includes("Price")) {
      data.marketPlaceProfitDiffPrice =
        Math.round(
          (parseInt(value) *
            (1 - this.getMarketPlaceCommission() - this.getAddedValue()) -
            parseInt(data.tradeBuyingPrice) -
            this.getMarketPlaceCosts() -
            this.getCostAndTax()) /
            10
        ) * 10;

      data.marketPlaceProfitPercent =
        Math.round(
          (data.marketPlaceProfitDiffPrice * 10000) / parseInt(value)
        ) / 100;
    } else {
      data.marketPlaceProfitPercent = "";
      data.marketPlaceProfitDiffPrice = "";
      data.marketPlacePrice = "";
    }
    this.setState({ data });
  };

  handleMarketPlaceProfitChangeWithoutValueAdded = e => {
    const data = { ...this.state.data };
    const clearValue = e.target.value.replace(/,/g, "");
    const value = EngNum(clearValue);
    data[e.target.name] = parseInt(value);
    if (value && e.target.name.includes("Percent")) {
      data.marketPlacePriceWithoutValueAdded =
        Math.round(
          (parseInt(data.tradeBuyingPrice) +
            this.getMarketPlaceCosts() +
            this.getCostAndTax() +
            this.getMarketPlaceCosts() * this.getMarketPlaceAddedValue()) /
            (1 -
              parseInt(value) / 100 -
              this.getMarketPlaceCommission() -
              this.getMarketPlaceCommission() *
                this.getMarketPlaceAddedValue()) /
            10
        ) * 10;
      data.marketPlaceProfitDiffPriceWithoutValueAdded =
        Math.round(
          getProfitByPercent(data.marketPlacePriceWithoutValueAdded, value) / 10
        ) * 10;
    } else if (value && e.target.name.includes("Profit")) {
      data.marketPlacePriceWithoutValueAdded =
        Math.round(
          (parseInt(data.tradeBuyingPrice) +
            parseInt(value) +
            this.getMarketPlaceCosts() +
            this.getCostAndTax() +
            this.getMarketPlaceCosts() * this.getMarketPlaceAddedValue()) /
            (1 -
              this.getMarketPlaceCommission() -
              this.getMarketPlaceCommission() *
                this.getMarketPlaceAddedValue()) /
            10
        ) * 10;

      data.marketPlaceProfitPercentWithoutValueAdded = getPercentByProfit(
        data.marketPlacePriceWithoutValueAdded,
        value
      );
    } else if (value && e.target.name.includes("Price")) {
      data.marketPlaceProfitDiffPriceWithoutValueAdded =
        Math.round(
          (parseInt(value) *
            (1 -
              this.getMarketPlaceCommission() -
              this.getMarketPlaceCommission() *
                this.getMarketPlaceAddedValue()) -
            parseInt(data.tradeBuyingPrice) -
            this.getMarketPlaceCosts() -
            this.getCostAndTax() -
            this.getMarketPlaceCosts() * this.getMarketPlaceAddedValue()) /
            10
        ) * 10;

      data.marketPlaceProfitPercentWithoutValueAdded =
        Math.round(
          (data.marketPlaceProfitDiffPriceWithoutValueAdded * 10000) /
            parseInt(value)
        ) / 100;
    } else {
      data.marketPlaceProfitPercentWithoutValueAdded = "";
      data.marketPlaceProfitDiffPriceWithoutValueAdded = "";
      data.marketPlacePriceWithoutValueAdded = "";
    }
    this.setState({ data });
  };

  handleProfitChangeWholePrice = e => {
    const data = { ...this.state.data };
    const clearValue = e.target.value.replace(/,/g, "");
    const value = EngNum(clearValue);
    data[e.target.name] = parseInt(value);
    if (value && e.target.name.includes("Percent")) {
      data.wholePrice =
        Math.round(
          parseInt(data.tradeBuyingPrice) /
            (1 -
              parseInt(value) / 100 -
              this.getAddedValue() -
              this.getWholeShipping()) /
            10
        ) * 10;
      data.wholeProfitDiffPrice =
        Math.round(getProfitByPercent(data.wholePrice, value) / 10) * 10;
    } else if (value && e.target.name.includes("Profit")) {
      data.wholePrice =
        Math.round(
          (parseInt(data.tradeBuyingPrice) + parseInt(value)) /
            (1 - this.getAddedValue() - this.getWholeShipping()) /
            10
        ) * 10;

      data.wholeProfitPercent = getPercentByProfit(data.wholePrice, value);
    } else if (value && e.target.name.includes("Price")) {
      data.wholeProfitDiffPrice =
        Math.round(
          (parseInt(value) *
            (1 - this.getAddedValue() - this.getWholeShipping()) -
            parseInt(data.tradeBuyingPrice)) /
            10
        ) * 10;

      data.wholeProfitPercent =
        Math.round((data.wholeProfitDiffPrice * 10000) / parseInt(value)) / 100;
    } else {
      data.wholeProfitPercent = "";
      data.wholeProfitDiffPrice = "";
      data.wholePrice = "";
    }
    this.setState({ data });
  };

  handleProfitChangeWholePriceWithoutValueAdded = e => {
    const data = { ...this.state.data };
    const clearValue = e.target.value.replace(/,/g, "");
    const value = EngNum(clearValue);
    data[e.target.name] = parseInt(value);
    if (value && e.target.name.includes("Percent")) {
      data.wholePriceWithoutValueAdded =
        Math.round(
          parseInt(data.tradeBuyingPrice) /
            (1 - parseInt(value) / 100 - this.getWholeShipping()) /
            10
        ) * 10;
      data.wholeProfitDiffPriceWithoutValueAdded =
        Math.round(
          getProfitByPercent(data.wholePriceWithoutValueAdded, value) / 10
        ) * 10;
    } else if (value && e.target.name.includes("Profit")) {
      data.wholePriceWithoutValueAdded =
        Math.round(
          (parseInt(data.tradeBuyingPrice) + parseInt(value)) /
            (1 - this.getWholeShipping()) /
            10
        ) * 10;

      data.wholeProfitPercentWithoutValueAdded = getPercentByProfit(
        data.wholePriceWithoutValueAdded,
        value
      );
    } else if (value && e.target.name.includes("Price")) {
      data.wholeProfitDiffPriceWithoutValueAdded =
        Math.round(
          (parseInt(value) * (1 - this.getWholeShipping()) -
            parseInt(data.tradeBuyingPrice)) /
            10
        ) * 10;

      data.wholeProfitPercentWithoutValueAdded =
        Math.round(
          (data.wholeProfitDiffPriceWithoutValueAdded * 10000) / parseInt(value)
        ) / 100;
    } else {
      data.wholeProfitPercentWithoutValueAdded = "";
      data.wholeProfitDiffPriceWithoutValueAdded = "";
      data.wholePriceWithoutValueAdded = "";
    }
    this.setState({ data });
  };

  handleProfitChangeRetailPrice = e => {
    const data = { ...this.state.data };
    const clearValue = e.target.value.replace(/,/g, "");
    const value = EngNum(clearValue);
    data[e.target.name] = parseInt(value);
    if (value && e.target.name.includes("Percent")) {
      data.retailPrice =
        Math.round(
          (parseInt(data.tradeBuyingPrice) + this.getShipping()) /
            (1 - parseInt(value) / 100 - this.getAddedValue()) /
            10
        ) * 10;
      data.retailProfitDiffPrice =
        Math.round(getProfitByPercent(data.retailPrice, value) / 10) * 10;
    } else if (value && e.target.name.includes("Profit")) {
      data.retailPrice =
        Math.round(
          (parseInt(data.tradeBuyingPrice) +
            parseInt(value) +
            this.getShipping()) /
            (1 - this.getAddedValue()) /
            10
        ) * 10;

      data.retailProfitPercent = getPercentByProfit(data.retailPrice, value);
    } else if (value && e.target.name.includes("Price")) {
      data.retailProfitDiffPrice =
        Math.round(
          (parseInt(value) * (1 - this.getAddedValue()) -
            parseInt(data.tradeBuyingPrice) -
            this.getShipping()) /
            10
        ) * 10;

      data.retailProfitPercent =
        Math.round((data.retailProfitDiffPrice * 10000) / parseInt(value)) /
        100;
    } else {
      data.retailProfitPercent = "";
      data.retailProfitDiffPrice = "";
      data.retailPrice = "";
    }
    this.setState({ data });
  };

  handleProfitChangeRetailPriceWithoutValueAdded = e => {
    const data = { ...this.state.data };
    const clearValue = e.target.value.replace(/,/g, "");
    const value = EngNum(clearValue);
    data[e.target.name] = parseInt(value);
    if (value && e.target.name.includes("Percent")) {
      data.retailPriceWithoutValueAdded =
        Math.round(
          (parseInt(data.tradeBuyingPrice) + this.getShipping()) /
            (1 - parseInt(value) / 100) /
            10
        ) * 10;
      data.retailProfitDiffPriceWithoutValueAdded =
        Math.round(
          getProfitByPercent(data.retailPriceWithoutValueAdded, value) / 10
        ) * 10;
    } else if (value && e.target.name.includes("Profit")) {
      data.retailPriceWithoutValueAdded =
        Math.round(
          (parseInt(data.tradeBuyingPrice) +
            parseInt(value) +
            this.getShipping()) /
            1 /
            10
        ) * 10;

      data.retailProfitPercentWithoutValueAdded = getPercentByProfit(
        data.retailPriceWithoutValueAdded,
        value
      );
    } else if (value && e.target.name.includes("Price")) {
      data.retailProfitDiffPriceWithoutValueAdded =
        Math.round(
          (parseInt(value) * 1 -
            parseInt(data.tradeBuyingPrice) -
            this.getShipping()) /
            10
        ) * 10;

      data.retailProfitPercentWithoutValueAdded =
        Math.round(
          (data.retailProfitDiffPriceWithoutValueAdded * 10000) /
            parseInt(value)
        ) / 100;
    } else {
      data.retailProfitPercentWithoutValueAdded = "";
      data.retailProfitDiffPriceWithoutValueAdded = "";
      data.retailPriceWithoutValueAdded = "";
    }
    this.setState({ data });
  };

  getCostAndTax = () => {
    if (!this.props.settings) return 0;
    return parseInt(this.props.settings[0].shippingCosts);
  };

  getAddedValue = () => 0.09;

  getMarketPlaceAddedValue = () => 0.09;

  getMarketPlaceCommission = () => 0.1;
  getWholeShipping = () => 0.01;
  getMarketPlaceCosts = () => {
    const { length, width, height, weight } = this.state.data;
    return getDigiKalaShipping(length, width, height, weight);
  };

  getShipping = () => {
    const { length, width, height, weight } = this.state.data;
    return getDigiKalaShipping(length, width, height, weight);
  };

  handleNotify = name => {
    let msg = this.props.match.params.id
      ? " با موفقیت به روزرسانی شد."
      : " با موفقیت اضافه شد.";
    toast.info(name + msg);
  };

  handleBack = () => {
    const { state } = this.props.location;
    const path = state ? state.from.pathname : "/Products";
    this.props.onRoute(path);
    this.props.history.push(path);
  };

  doSubmit = dt => {
    const { product, match } = this.props;
    const { data } = { ...this.state };
    product.retailPrice = data.retailPrice.toString();
    product.wholePrice = data.wholePrice.toString();
    product.marketPlacePrice = data.marketPlacePrice.toString();

    this.props.updateProductItem({
      item: product,
      id: match.params.id
    });
    this.handleBack();
    this.handleNotify(product.name);
  };

  render() {
    const { settings, loadingSettings } = this.props;
    const user = auth.getCurrentUser();

    if (loadingSettings || !settings) return <h1>Loading...</h1>;

    return (
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="rose">
            <h4 className={this.props.classes.cardTitleWhite}>
              بازرگانی محصولات
            </h4>
            <p className={this.props.classes.cardCategoryWhite}>
              بازرگانی محصولات
            </p>
          </CardHeader>
          <CardBody>
            <form onSubmit={this.handleFormSubmission} id="addnewform1">
              <div className="row m-2">
                {this.renderSubmitBtn()}
                {this.renderCancelBtn("لغو")}
              </div>
              <div className="row">
                {this.renderInput("tradeBuyingPrice", "قیمت خرید")}
                {this.renderInput("weight", "وزن")}
                {this.renderInput("length", "طول")}
                {this.renderInput("width", "عرض")}
                {this.renderInput("height", "ارتفاع")}
                {/* <Input
                  type="text"
                  name="tradeBuyingPrice"
                  label="قیمت خرید"
                  size="2"
                  required="false"
                  value={PersianNum(
                    parseInt(this.state.data.tradeBuyingPrice).toLocaleString()
                  )}
                  onChange={this.handleBasicChange}
                />
                <Input
                  type="text"
                  name="weight"
                  label="وزن"
                  size="2"
                  required="false"
                  value={PersianNum(this.state.data.weight)}
                  onChange={this.handleBasicChange}
                />
                <Input
                  type="text"
                  name="length"
                  label="طول"
                  size="2"
                  required="false"
                  value={PersianNum(this.state.data.length)}
                  onChange={this.handleBasicChange}
                />
                <Input
                  type="text"
                  name="width"
                  label="عرض"
                  size="2"
                  required="false"
                  value={PersianNum(this.state.data.width)}
                  onChange={this.handleBasicChange}
                />

                <Input
                  type="text"
                  name="height"
                  label="ارتفاع"
                  size="2"
                  required="false"
                  value={PersianNum(this.state.data.height)}
                  onChange={this.handleBasicChange}
                /> */}
              </div>
              <hr />
              <div className="row">
                <Input
                  type="text"
                  name="wholeProfitPercent"
                  label="درصد سود مستقیم عمده فروشی"
                  size="3"
                  required={false}
                  value={PersianNum(this.state.data.wholeProfitPercent)}
                  onChange={this.handleProfitChangeWholePrice}
                />
                <Input
                  type="text"
                  name="wholeProfitDiffPrice"
                  label="مبلغ سود مستقیم عمده فروشی"
                  size="3"
                  required={false}
                  value={PersianNum(
                    this.state.data.wholeProfitDiffPrice.toLocaleString()
                  )}
                  onChange={this.handleProfitChangeWholePrice}
                />
                <Input
                  type="text"
                  name="wholePrice"
                  label="قیمت فروش مستقیم عمده فروشی"
                  size="3"
                  required={false}
                  value={PersianNum(
                    this.state.data.wholePrice.toLocaleString()
                  )}
                  onChange={this.handleProfitChangeWholePrice}
                />
              </div>
              <div className="row">
                <Input
                  type="text"
                  name="wholeProfitPercentWithoutValueAdded"
                  label="درصد سود عمده فروشی بدون ارزش افزوده"
                  size="3"
                  required={false}
                  value={PersianNum(
                    this.state.data.wholeProfitPercentWithoutValueAdded
                  )}
                  onChange={this.handleProfitChangeWholePriceWithoutValueAdded}
                />
                <Input
                  type="text"
                  name="wholeProfitDiffPriceWithoutValueAdded"
                  label="مبلغ سود عمده فروشی بدون ارزش افزوده"
                  size="3"
                  required={false}
                  value={PersianNum(
                    this.state.data.wholeProfitDiffPriceWithoutValueAdded.toLocaleString()
                  )}
                  onChange={this.handleProfitChangeWholePriceWithoutValueAdded}
                />
                <Input
                  type="text"
                  name="wholePriceWithoutValueAdded"
                  label="قیمت فروش عمده فروشی بدون ارزش افزوده"
                  size="3"
                  required={false}
                  value={PersianNum(
                    this.state.data.wholePriceWithoutValueAdded.toLocaleString()
                  )}
                  onChange={this.handleProfitChangeWholePriceWithoutValueAdded}
                />
              </div>
              <div className="row">
                <Input
                  type="text"
                  name="retailProfitPercent"
                  label="درصد سود مستقیم خرده فروشی"
                  size="3"
                  required={false}
                  value={PersianNum(this.state.data.retailProfitPercent)}
                  onChange={this.handleProfitChangeRetailPrice}
                />
                <Input
                  type="text"
                  name="retailProfitDiffPrice"
                  label="مبلغ سود مستقیم خرده فروشی"
                  size="3"
                  required={false}
                  value={PersianNum(
                    this.state.data.retailProfitDiffPrice.toLocaleString()
                  )}
                  onChange={this.handleProfitChangeRetailPrice}
                />
                <Input
                  type="text"
                  name="retailPrice"
                  label="قیمت فروش مستقیم خرده فروشی"
                  size="3"
                  required={false}
                  value={PersianNum(
                    this.state.data.retailPrice.toLocaleString()
                  )}
                  onChange={this.handleProfitChangeRetailPrice}
                />
              </div>
              <div className="row">
                <Input
                  type="text"
                  name="retailProfitPercentWithoutValueAdded"
                  label="درصد سود خرده فروشی بدون ارزش افزوده"
                  size="3"
                  required={false}
                  value={PersianNum(
                    this.state.data.retailProfitPercentWithoutValueAdded
                  )}
                  onChange={this.handleProfitChangeRetailPriceWithoutValueAdded}
                />
                <Input
                  type="text"
                  name="retailProfitDiffPriceWithoutValueAdded"
                  label="مبلغ سود خرده فروشی بدون ارزش افزوده"
                  size="3"
                  required={false}
                  value={PersianNum(
                    this.state.data.retailProfitDiffPriceWithoutValueAdded.toLocaleString()
                  )}
                  onChange={this.handleProfitChangeRetailPriceWithoutValueAdded}
                />
                <Input
                  type="text"
                  name="retailPriceWithoutValueAdded"
                  label="قیمت فروش خرده فروشی بدون ارزش افزوده"
                  size="3"
                  required={false}
                  value={PersianNum(
                    this.state.data.retailPriceWithoutValueAdded.toLocaleString()
                  )}
                  onChange={this.handleProfitChangeRetailPriceWithoutValueAdded}
                />
              </div>

              <div className="row">
                <Input
                  type="text"
                  name="marketPlaceProfitPercent"
                  label="درصد سود مارکت پلیس"
                  size="3"
                  required={false}
                  value={PersianNum(this.state.data.marketPlaceProfitPercent)}
                  onChange={this.handleMarketPlaceProfitChange}
                />
                <Input
                  type="text"
                  name="marketPlaceProfitDiffPrice"
                  label="مبلغ سود مارکت پلیس"
                  size="3"
                  required={false}
                  value={PersianNum(
                    this.state.data.marketPlaceProfitDiffPrice.toLocaleString()
                  )}
                  onChange={this.handleMarketPlaceProfitChange}
                />
                <Input
                  type="text"
                  name="marketPlacePrice"
                  label="قیمت فروش مارکت پلیس"
                  size="3"
                  required={false}
                  value={PersianNum(
                    this.state.data.marketPlacePrice.toLocaleString()
                  )}
                  onChange={this.handleMarketPlaceProfitChange}
                />
              </div>
              <div className="row">
                <Input
                  type="text"
                  name="marketPlaceProfitPercentWithoutValueAdded"
                  label="درصد سود مارکت پلیس بدون ارزش افزوده"
                  size="3"
                  required={false}
                  value={PersianNum(
                    this.state.data.marketPlaceProfitPercentWithoutValueAdded
                  )}
                  onChange={this.handleMarketPlaceProfitChangeWithoutValueAdded}
                />
                <Input
                  type="text"
                  name="marketPlaceProfitDiffPriceWithoutValueAdded"
                  label="مبلغ سود مارکت پلیس بدون ارزش افزوده"
                  size="3"
                  required={false}
                  value={PersianNum(
                    this.state.data.marketPlaceProfitDiffPriceWithoutValueAdded.toLocaleString()
                  )}
                  onChange={this.handleMarketPlaceProfitChangeWithoutValueAdded}
                />
                <Input
                  type="text"
                  name="marketPlacePriceWithoutValueAdded"
                  label="قیمت فروش مارکت پلیس بدون ارزش افزوده"
                  size="3"
                  required={false}
                  value={PersianNum(
                    this.state.data.marketPlacePriceWithoutValueAdded.toLocaleString()
                  )}
                  onChange={this.handleMarketPlaceProfitChangeWithoutValueAdded}
                />
              </div>
            </form>
          </CardBody>
        </Card>
      </GridItem>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.setting.settings,
  product: state.product.product,
  loadingProduct: state.product.loading
});

export default connect(
  mapStateToProps,
  { getSettingItems, getProductItem, updateProductItem }
)(withStyles(rtlStyle)(Trade));