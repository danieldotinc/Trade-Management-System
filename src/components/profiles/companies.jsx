import React, { Component } from "react";
import { toast } from "react-toastify";
import ListPage from "../table/listPage";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import {
  getCompanyItems,
  deleteCompanyItem
} from "../../actions/companyActions";
import { getSettingItems } from "../../actions/settingActions";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

class Companies extends Component {
  componentDidMount() {
    this.props.getCompanyItems();
    this.props.getSettingItems();
  }

  handleProfileDetail = item => {
    // this.props.history.push(`/Profiles/${item._id}`);
  };

  handleEditTableItem = item => {
    this.props.history.push(`/EditCompany/${item._id}`);
  };

  handleDeleteTableItem = item => {
    this.props.deleteCompanyItem(item._id);
    toast.info(`${item.name} با موفقیت حذف شد.`);
  };

  render() {
    const {
      companies,
      loadingCompanies,
      settings,
      loadingSetting,
      ...rest
    } = this.props;
    if (loadingCompanies || !companies) return <h1>Loading...</h1>;
    return (
      <ListPage
        items={companies}
        onDetail={this.handleProfileDetail}
        onEdit={this.handleEditTableItem}
        onDelete={this.handleDeleteTableItem}
        settings={settings}
        {...rest}
      />
    );
  }
}

const mapStateToProps = state => ({
  companies: state.company.companies,
  loadingCompanies: state.company.loading,
  settings: state.setting.settings,
  loadingSetting: state.setting.loading
});

export default connect(
  mapStateToProps,
  { getCompanyItems, deleteCompanyItem, getSettingItems }
)(withStyles(rtlStyle)(Companies));
