import React, { Component } from "react";
import Form from "../form/form";
import GridItem from "../Grid/GridItem";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";
import withStyles from "@material-ui/core/styles/withStyles";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

class Invoice extends Form {
  state = {
    data: {
      invoiceType: "",
      invoiceTypeId: "",
      sellerName: "",
      sellerَAddress: "",
      sellerَPhoneNumber: "",
      buyerName: "",
      buyerAddress: "",
      buyerPhoneNumber: ""
    },
    errors: {}
  };

  render() {
    const ColoredLine = ({ color }) => (
      <hr
        style={{
          backgroundColor: color,
          width: "90%"
        }}
      />
    );
    const invoiceTypes = [
      { name: "فاکتور فروش", value: "sellInvoice" },
      { name: "فاکتور خرید", value: "buyInvoice" },
      { name: "پیش فاکتور فروش", value: "preSellInvoice" },
      { name: "پیش فاکتور خرید", value: "preBuyInvoice" }
    ];
    return (
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={this.props.classes.cardTitleWhite}>صدور فاکتور</h4>
            <p className={this.props.classes.cardCategoryWhite}>صدور فاکتور</p>
          </CardHeader>
          <CardBody>
            <React.Fragment>
              <div className="row">
                <div className="list-group p-4 text-center col-12">
                  <div className="row">
                    {this.renderSelect(
                      "invoiceType",
                      "نوع فاکتور",
                      invoiceTypes,
                      "3"
                    )}
                  </div>
                  <div className="row">
                    {this.renderInput("sellerName", "فروشنده", "3")}
                    {this.renderInput("sellerَAddress", "آدرس فروشنده", "5")}
                    {this.renderInput(
                      "sellerَPhoneNumber",
                      "تلفن فروشنده",
                      "3"
                    )}
                  </div>
                  <div className="row">
                    {this.renderInput("buyerName", "خریدار", "3")}
                    {this.renderInput("buyerAddress", "آدرس خریدار", "5")}
                    {this.renderInput("buyerPhoneNumber", "تلفن خریدار", "3")}
                  </div>
                  <ColoredLine color="black" />
                </div>
              </div>
            </React.Fragment>
          </CardBody>
        </Card>
      </GridItem>
    );
  }
}

export default withStyles(rtlStyle)(Invoice);
