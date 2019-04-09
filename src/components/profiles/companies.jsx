import React, { Component } from "react";
import { toast } from "react-toastify";
import ListPage from "../table/listPage";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import {
  getCompanyItems,
  deleteCompanyItem
} from "../../actions/companyActions";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

class Companies extends Component {
  componentDidMount() {
    this.props.getCompanyItems();
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
    const { companies, loadingCompanies, ...rest } = this.props;
    if (loadingCompanies || !companies) return <h1>Loading...</h1>;
    return (
      <ListPage
        items={companies}
        onDetail={this.handleProfileDetail}
        onEdit={this.handleEditTableItem}
        onDelete={this.handleDeleteTableItem}
        {...rest}
      />
    );
  }
}

const mapStateToProps = state => ({
  companies: state.company.companies,
  loadingCompanies: state.company.loading
});

export default connect(
  mapStateToProps,
  { getCompanyItems, deleteCompanyItem }
)(withStyles(rtlStyle)(Companies));
