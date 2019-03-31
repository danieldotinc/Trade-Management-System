import React, { Component, Fragment } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import auth from "../../services/authService";
import { getProductItem } from "../../actions/productActions";
import { getDigiKalaShipping } from "../../handlers/digikala";
import { PersianNum } from "../table/common/persiandigit";
import ListGroupItem from "../listGroup/listGroupItem";
import GridItem from "../Grid/GridItem";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";
import withStyles from "@material-ui/core/styles/withStyles";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

class Process extends Component {
  componentDidMount = () => {
    const { id } = this.props.match.params;
    this.props.getProductItem(id);
  };

  handleBack = () => {
    const { id } = this.props.match.params;
    this.props.onRoute(`/Product/${id}`);
    this.props.history.push(`/Product/${id}`);
  };

  getPercent = (buyPrice, sellPrice) =>
    Math.round(
      ((parseInt(sellPrice) - parseInt(buyPrice)) / parseInt(buyPrice)) * 1000
    ) /
      10 +
    " %";

  getDiffPrice = (buyPrice, sellPrice) =>
    parseInt(sellPrice) - parseInt(buyPrice);

  render() {
    const { product, loadingProduct } = this.props;
    const user = auth.getCurrentUser();

    if (!product || loadingProduct) return <h1>Loading...</h1>;

    const buyingDiscoutPercent = this.getPercent(
      product.tradeBuyingPrice,
      product.tradeListPrice
    );
    const buyingDiscoutDiffPrice = this.getDiffPrice(
      product.tradeBuyingPrice,
      product.tradeListPrice
    );

    const wholeProfitPercent = this.getPercent(
      product.tradeListPrice,
      product.wholePrice
    );

    const wholeProfitDiffPrice = this.getDiffPrice(
      product.tradeListPrice,
      product.wholePrice
    );

    const retailProfitPercent = this.getPercent(
      product.tradeListPrice,
      product.retailPrice
    );
    const retailProfitDiffPrice = this.getDiffPrice(
      product.tradeListPrice,
      product.retailPrice
    );

    const marketPlaceProfitPercent = this.getPercent(
      product.tradeListPrice,
      product.marketPlacePrice
    );
    const marketPlaceProfitDiffPrice = this.getDiffPrice(
      product.tradeListPrice,
      product.marketPlacePrice
    );

    const shippingPrice = getDigiKalaShipping(
      product.length,
      product.width,
      product.height,
      product.weight
    );
    console.log(shippingPrice);

    return (
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={this.props.classes.cardTitleWhite}>پردازش محصول</h4>
            <p className={this.props.classes.cardCategoryWhite}>
              پردازش {product.name}
            </p>
          </CardHeader>
          <CardBody>
            <React.Fragment>
              <div className="row m-2">
                <button
                  className="btn btn-lg btn-info m-2 shadow rounded"
                  onClick={this.handleBack}
                >
                  <i className="fa fa-arrow-right" />
                </button>
              </div>
              <div className="row">
                <div className="list-group p-4 text-center col-12">
                  <div className="row shadow rounded p-3">
                    <ListGroupItem
                      label="عنوان"
                      value={product.name}
                      float=""
                      size="6"
                    />
                    <ListGroupItem
                      label="دسته بندی"
                      value={product.category}
                      float=""
                      size="6"
                    />
                  </div>
                  <div className="row shadow rounded mt-3">
                    <div className="shadow rounded col-3 pt-3 pb-3">
                      <ListGroupItem
                        label="کد محصول"
                        value={product.proCode}
                        size="12"
                      />
                      <ListGroupItem
                        label="کد تنوع"
                        value={product.diverseCode}
                        size="12"
                      />
                      <ListGroupItem
                        label="کد نیکراد"
                        value={product.nikradCode}
                        size="12"
                      />
                      <ListGroupItem
                        label="کد مای کیچن"
                        value={product.myKitchenCode}
                        size="12"
                      />
                      <ListGroupItem
                        label="کد مای کیچن پلاس"
                        value={product.myKitchenCode}
                        size="12"
                      />
                    </div>
                    <div className="shadow rounded col-3 pt-3 pb-3">
                      <ListGroupItem
                        label="قیمت لیست"
                        value={parseInt(product.tradeListPrice)}
                        size="12"
                      />
                      <ListGroupItem
                        label="قیمت خرید"
                        value={parseInt(product.tradeBuyingPrice)}
                        size="12"
                      />
                      <ListGroupItem
                        label="قیمت عمده فروشی"
                        value={parseInt(product.wholePrice)}
                        size="12"
                      />
                      <ListGroupItem
                        label="قیمت خرده فروشی"
                        value={parseInt(product.retailPrice)}
                        size="12"
                      />
                      <ListGroupItem
                        label="قیمت مارکت پلیس"
                        value={parseInt(product.marketPlacePrice)}
                        size="12"
                      />
                    </div>
                    <div className="shadow rounded col-3 pt-3 pb-3">
                      <ListGroupItem
                        label="درصد تخفیف مرجع"
                        value={buyingDiscoutPercent}
                        size="12"
                      />
                      <ListGroupItem
                        label="درصد تخفیف بازرگان"
                        value={buyingDiscoutPercent}
                        size="12"
                      />
                      <ListGroupItem
                        label="درصد سود عمده فروشی"
                        value={wholeProfitPercent}
                        size="12"
                      />
                      <ListGroupItem
                        label="درصد سود خرده فروشی"
                        value={retailProfitPercent}
                        size="12"
                      />
                      <ListGroupItem
                        label="درصد سود مارکت پلیس"
                        value={marketPlaceProfitPercent}
                        size="12"
                      />
                    </div>
                    <div className="shadow rounded col-3 pt-3 pb-3">
                      <ListGroupItem
                        label="مبلغ تخفیف مرجع"
                        value={buyingDiscoutDiffPrice}
                        size="12"
                      />
                      <ListGroupItem
                        label="مبلغ تخفیف بازرگان"
                        value={buyingDiscoutDiffPrice}
                        size="12"
                      />
                      <ListGroupItem
                        label="مبلغ سود عمده فروشی"
                        value={wholeProfitDiffPrice}
                        size="12"
                      />
                      <ListGroupItem
                        label="مبلغ سود خرده فروشی"
                        value={retailProfitDiffPrice}
                        size="12"
                      />
                      <ListGroupItem
                        label="مبلغ سود مارکت پلیس"
                        value={marketPlaceProfitDiffPrice}
                        size="12"
                      />
                    </div>

                    <div className="shadow rounded col-4 pt-3 pb-3">
                      <ListGroupItem
                        label="هزینه بسته بندی و ارسال به مارکت پلیس"
                        value={2000}
                        size="12"
                      />
                      <ListGroupItem
                        label="هزینه پردازش و حمل و نقل مارکت پلیس"
                        value={shippingPrice}
                        size="12"
                      />
                    </div>

                    <div className="shadow rounded col-4 pt-3 pb-3">
                      <ListGroupItem
                        label="ارزش افزوده "
                        value={shippingPrice}
                        size="12"
                      />
                      <ListGroupItem
                        label="ارزش افزوده مارکت پلیس"
                        value={2000}
                        size="12"
                      />
                    </div>
                    <div className="shadow rounded col-4 pt-3 pb-3">
                      <ListGroupItem
                        label="ارزش افزوده "
                        value={shippingPrice}
                        size="12"
                      />
                      <ListGroupItem
                        label="ارزش افزوده مارکت پلیس"
                        value={2000}
                        size="12"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          </CardBody>
        </Card>
      </GridItem>
    );
  }
}

const mapStateToProps = state => ({
  product: state.product.product,
  loadingProduct: state.product.loading
});

export default connect(
  mapStateToProps,
  { getProductItem }
)(withStyles(rtlStyle)(Process));
