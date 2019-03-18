import React, { Component } from "react";
import { PersianNum } from "../table/common/persiandigit";
import GridItem from "../Grid/GridItem";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";
import withStyles from "@material-ui/core/styles/withStyles";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

export class Product extends Component {
  handleBack = () => {
    this.props.onRoute("/Products");
    this.props.history.push("/Products");
  };
  render() {
    const { detailedModal, listName } = this.props.state;
    const head = [
      "آی دی",
      "تصویر",
      "گالری",
      "دسته بندی",
      "آی دی دسته بندی",
      "کد محصول",
      "کد تنوع",
      "عنوان",
      "برند",
      "قیمت خرید",
      "قیمت مرجع",
      "قیمت سر به سر",
      "قیمت عمده فروشی",
      "قیمت خرده فروشی",
      "قیمت مارکت پلیس",
      "موجودی انبار خرده فروشی",
      "موجودی انبار عمده فروشی",
      "موجودی انبار مجازی دیجیکالا",
      "تعداد در جعبه"
    ];
    return (
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="warning">
            <h4 className={this.props.classes.cardTitleWhite}>جزئیات محصول</h4>
            <p className={this.props.classes.cardCategoryWhite}>
              جزئیات {detailedModal.item.name}
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
                <button
                  className="btn btn-lg btn-dark m-2 shadow rounded"
                  onClick={() =>
                    this.props.onEditTableItem(detailedModal.item, listName)
                  }
                >
                  <i className="fa fa-wrench" />
                </button>
                <button
                  className="btn btn-lg btn-danger m-2 shadow rounded"
                  onClick={() => {
                    this.props.onDeleteTableItem(detailedModal.item, listName);
                    this.props.history.push("/Products");
                  }}
                >
                  <i className="fa fa-trash-alt" />
                </button>
              </div>
              <div className="row">
                <div className="m-2 col-6">
                  <img
                    style={{
                      height: "500px",
                      width: "500px",
                      borderRadius: "10px"
                    }}
                    src={require(`../../${detailedModal.item.img}`)}
                  />
                  <br />
                  {detailedModal.item.imgs.map(img => (
                    <img
                      style={{
                        maxHeight: "100px",
                        maxWidth: "100px",
                        borderRadius: "5px"
                      }}
                      className="shadow rounded m-2"
                      src={require(`../../${img}`)}
                    />
                  ))}
                </div>
                <div className="list-group m-2 mt-5 col-5">
                  <div className="row shadow rounded">
                    {Object.keys(detailedModal.item).map((keyName, i) => {
                      if (
                        keyName != "_id" &&
                        keyName != "categoryId" &&
                        keyName != "img" &&
                        keyName != "imgs" &&
                        keyName != "imgFile" &&
                        keyName != "imgFiles" &&
                        keyName != "file" &&
                        keyName != "__v" &&
                        keyName != "files"
                      ) {
                        if (
                          keyName.includes("Price") ||
                          keyName.includes("Stock") ||
                          keyName.includes("Quantity")
                        ) {
                          return (
                            <span className="list-group-item col-6">
                              {head[i] + " : "}
                              <span style={{ fontWeight: "600" }}>
                                {PersianNum(
                                  detailedModal.item[keyName].toLocaleString()
                                )}
                              </span>
                            </span>
                          );
                        } else {
                          return (
                            <span className="list-group-item col-12">
                              {head[i] + " : "}
                              <span style={{ fontWeight: "600" }}>
                                {PersianNum(detailedModal.item[keyName])}
                              </span>
                            </span>
                          );
                        }
                      }
                    })}
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

export default withStyles(rtlStyle)(Product);
