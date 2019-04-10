import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  getSettingItems,
  updateSettingItem
} from "../../actions/settingActions";
import Form from "../form/form";
import { EngNum } from "../table/common/persiandigit";
import ItemsModalView from "../Modal/itemsModalView";
import GridItem from "../Grid/GridItem";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";
import withStyles from "@material-ui/core/styles/withStyles";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

class EditSettings extends Form {
  state = {
    data: {
      valueAdded: "",
      shippingCosts: "",
      wholeProfit: "",
      retailProfit: "",
      marketPlaceProfit: "",
      addAction: "",
      editAction: "",
      deleteAction: "",
      processAccess: "",
      personsAccess: "",
      companiesAccess: ""
    },
    errors: {}
  };

  componentDidMount() {
    this.props.getSettingItems();
  }

  componentWillReceiveProps(nextProps) {
    const { settings, loading } = nextProps;
    if (loading || !settings) return <h1>Loading...</h1>;
    this.setState({ data: settings[0] });
  }

  handleBack = () => {
    this.props.onRoute("/Settings");
    this.props.history.push("/Settings");
  };

  doSubmit = data => {
    this.props.updateSettingItem(data);

    this.props.onRoute("/Settings");
    this.props.history.push("/Settings");
    toast.info("تنظیمات" + " با موفقیت به روزرسانی شد.");
  };

  render() {
    return (
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="rose">
            <h4 className={this.props.classes.cardTitleWhite}>
              ویرایش تنظیمات
            </h4>
            <p className={this.props.classes.cardCategoryWhite}>
              ویرایش تمامی تنظیمات
            </p>
          </CardHeader>
          <CardBody>
            <form onSubmit={this.handleFormSubmission} id="addnewform1">
              <div className="row m-2">
                {this.renderSubmitBtn()}
                {this.renderCancelBtn("لغو")}
              </div>
              <div className="row">
                {this.renderInput("valueAdded", "ارزش افزوده برای مالیات")}
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
  loading: state.setting.loading
});

export default connect(
  mapStateToProduct,
  {
    getSettingItems,
    updateSettingItem
  }
)(withStyles(rtlStyle)(EditSettings));
