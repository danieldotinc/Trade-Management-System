import React, { Component } from "react";
import Form from "../form/form";
import uuid from "uuid";
import { NotificationManager } from "react-notifications";
import {
  addPaymentItem,
  getPaymentItem,
  updatePaymentItem
} from "../../actions/paymentActions";
import { getAccountItems } from "../../actions/accountActions";
import { getPersonItems } from "../../actions/personActions";
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
    allOptions: [],
    suggestions: [],
    value: "",
    id: "",
    errors: {}
  };

  componentDidMount() {
    this.props.getPersonItems();
    this.props.getAccountItems();
    this.props.getAccountTypeItems();
    this.handleEditPayment();
  }

  handleEditPayment = () => {
    const id = this.props.match.params.id;
    id && this.props.getPaymentItem(id);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.persons) this.setState({ allOptions: nextProps.persons });
    if (this.props.match.params.id) {
      if (nextProps.payment) {
        this.setState({
          data: nextProps.payment,
          value: nextProps.payment.person,
          id: nextProps.payment.person
        });
      }
    }
  }

  handleNotify = name => {
    let msg = this.props.match.params.id
      ? " با موفقیت به روزرسانی شد."
      : " با موفقیت اضافه شد.";
    NotificationManager.success(name + msg);
  };

  handlePreparingForm = data => {
    const { accounts, accountTypes } = this.props;

    const accountTypeId = this.state.data.accountTypeId
      ? this.state.data.accountTypeId
      : accountTypes[0]._id;

    const subIndex = accounts.filter(e => e.accountTypeId == accountTypeId);

    data.account = !data.accountId ? subIndex[0].name : data.account;
    data.accountId = !data.accountId ? subIndex[0]._id : data.accountId;

    data.person = this.state.value;
    data.personId = this.state.id;

    delete data.typeId;
    delete data.statusId;

    return data;
  };

  handleBack = () => {
    const { state } = this.props.location;
    const path = state ? state.from.pathname : "/FinDashboard";
    this.props.onRoute(path);
    this.props.history.push(path);
  };

  doSubmit = data => {
    const prepared = this.handlePreparingForm(data);
    this.props.match.params.id
      ? this.props.updatePaymentItem({
          item: prepared,
          id: this.props.match.params.id
        })
      : this.props.addPaymentItem(prepared);

    this.handleBack();
    this.handleNotify(prepared.name);
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
      : accountTypes[0] && accountTypes[0]._id;

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
                  {this.renderSelect("type", "نوع عملیات", types)}
                  {this.renderSelect("accountType", "نوع حساب", accountTypes)}
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
                  {/* {this.renderInput("person", "نام شخص", "3")} */}
                  {this.renderAutoSuggestInput("person", "نام شخص", true)}
                  {this.renderInput("price", "مبلغ", "3", true)}
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
  payment: state.payment.payment,
  persons: state.person.persons,
  accounts: state.account.accounts,
  accountTypes: state.accountType.accountTypes,
  loadingAccount: state.account.loading
});

export default connect(
  mapStateToProps,
  {
    getAccountItems,
    getAccountTypeItems,
    addPaymentItem,
    updatePaymentItem,
    getPersonItems,
    getPaymentItem
  }
)(withStyles(rtlStyle)(Payment));
