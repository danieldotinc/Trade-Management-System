import React, { Component } from "react";
import Form from "../form/form";
import uuid from "uuid";
import { getAccountItems } from "../../actions/accountActions";
import { getAccountTypeItems } from "../../actions/accountTypeActions";
import GridItem from "../Grid/GridItem";
import { connect } from "react-redux";
import { BeatLoader } from "react-spinners";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";
import withStyles from "@material-ui/core/styles/withStyles";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

class Payment extends Form {
  state = {
    data: {
      accountType: "",
      accountTypeId: "",
      account: "",
      accountId: "",
      name: "",
      price: "",
      type: "",
      status: "",
      person: "",
      personId: ""
    },
    errors: {}
  };

  componentDidMount() {
    this.props.getAccountItems();
    this.props.getAccountTypeItems();
  }

  handleBack = () => {
    const { state } = this.props.location;
    const path = state ? state.from.pathname : "/FinDashboard";
    this.props.onRoute(path);
    this.props.history.push(path);
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
    const { accounts, accountTypes, loadingAccount } = this.props;
    if (!accounts || loadingAccount || !accountTypes)
      return (
        <div className="loader">
          <BeatLoader sizeUnit={"px"} size={20} color={"#C70039"} />
        </div>
      );
    const status = [
      { _id: uuid.v4(), name: "معلق", value: "suspended" },
      { _id: uuid.v4(), name: "لغو شد", value: "canceled" },
      { _id: uuid.v4(), name: "به تعویق افتاد", value: "postponed" },
      { _id: uuid.v4(), name: "در حال انجام", value: "inProcess" },
      { _id: uuid.v4(), name: "انجام شده", value: "done" }
    ];
    const types = [
      { _id: uuid.v4(), name: "دریافت", value: true },
      { _id: uuid.v4(), name: "پرداخت", value: false }
    ];

    const accountTypeId = this.state.data.accountTypeId
      ? this.state.data.accountTypeId
      : accountTypes[0]._id;

    const filteredAccounts = accounts.filter(
      e => e.accountTypeId == accountTypeId
    );

    return (
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="rose">
            <h4 className={this.props.classes.cardTitleWhite}>
              دریافت / پرداخت
            </h4>
            <p className={this.props.classes.cardCategoryWhite}>
              دریافت / پرداخت
            </p>
          </CardHeader>
          <CardBody>
            <form onSubmit={this.handleFormSubmission} id="addPaymentform">
              <div className="row m-2">
                {this.renderSubmitBtn()}
                {this.renderCancelBtn("لغو")}
              </div>
              <div className="row col-12">
                <div className="row col-12">
                  {this.renderSelect("type", "نوع عملیات", types, "3")}
                  {this.renderSelect(
                    "accountType",
                    "نوع حساب",
                    accountTypes,
                    "4"
                  )}
                  {this.renderSelect(
                    "account",
                    "عنوان حساب",
                    filteredAccounts,
                    "4"
                  )}
                  {this.renderSelect("status", "وضعیت", status)}
                </div>
                <ColoredLine color="black" />
                <div className="row col-12">
                  {this.renderInput("name", "شرح عملیات", "5")}
                  {this.renderInput("person", "نام شخص", "3")}
                  {this.renderInput("price", "مبلغ", "3")}
                </div>
              </div>
            </form>
          </CardBody>
        </Card>
      </GridItem>
    );
  }
}

const mapStateToProps = state => ({
  accounts: state.account.accounts,
  accountTypes: state.accountType.accountTypes,
  loadingAccount: state.account.loading
});

export default connect(
  mapStateToProps,
  {
    getAccountItems,
    getAccountTypeItems
  }
)(withStyles(rtlStyle)(Payment));
