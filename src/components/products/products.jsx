import React, { Component } from "react";
import ListPage from "../table/listPage";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { getProductItems } from "../../actions/productActions";

import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

class Products extends Component {
  componentDidMount() {
    this.props.getProductItems();
  }
  render() {
    const { ...rest } = this.props;
    return <ListPage items={this.props.products} {...rest} />;
  }
}

const mapStateToProps = state => ({
  products: state.product.products
});

export default connect(
  mapStateToProps,
  { getProductItems }
)(withStyles(rtlStyle)(Products));
