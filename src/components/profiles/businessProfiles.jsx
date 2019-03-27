import React, { Component } from "react";
import ListPage from "../table/listPage";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { getPersonItems } from "../../actions/personActions";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

class BusinessProfiles extends Component {
  componentDidMount() {
    this.props.getPersonItems();
  }
  render() {
    const { ...rest } = this.props;
    return <ListPage items={this.props.persons} {...rest} />;
  }
}

const mapStateToProps = state => ({
  persons: state.person.persons
});

export default connect(
  mapStateToProps,
  { getPersonItems }
)(withStyles(rtlStyle)(BusinessProfiles));
