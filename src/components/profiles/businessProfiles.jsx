import React, { Component } from "react";
import { toast } from "react-toastify";
import ListPage from "../table/listPage";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { getPersonItems, deletePersonItem } from "../../actions/personActions";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

class BusinessProfiles extends Component {
  componentDidMount() {
    this.props.getPersonItems();
  }

  handleProfileDetail = item => {
    this.props.history.push(`/Profiles/${item._id}`);
  };

  handleEditTableItem = item => {
    this.props.history.push(`/EditPerson/${item._id}`);
  };

  handleDeleteTableItem = item => {
    this.props.deletePersonItem(item._id);
    toast.info(`${item.name} با موفقیت حذف شد.`);
  };

  // handleLikeItem = item => {
  //   const items = [...this.state.items];
  //   const index = items.indexOf(item);
  //   items[index].liked = !items[index].liked;
  //   this.setState({
  //     items
  //   });
  // };

  // handleTypesFilter = (type, listName) => {
  //   if (listName == "Business") {
  //     this.setState({
  //       items:
  //         type.name && type.id
  //           ? getBusinessItems().filter(item => item.type == type.name)
  //           : getBusinessItems(),
  //       selectedGenre: type == "all" ? "all" : type.name,
  //       currentPage: 1
  //     });
  //   } else if (listName == "Employee") {
  //     this.setState({
  //       items:
  //         type.name && type.id
  //           ? getEmployeeItems().filter(item => item.type == type.name)
  //           : getEmployeeItems(),
  //       selectedGenre: type == "all" ? "all" : type.name,
  //       currentPage: 1
  //     });
  //   } else if (listName == "Person") {
  //     this.setState({
  //       items:
  //         type.name && type.id
  //           ? getCustomerItems().filter(item => item.type == type.name)
  //           : getCustomerItems(),
  //       selectedGenre: type == "all" ? "all" : type.name,
  //       currentPage: 1
  //     });
  //   }
  // };

  render() {
    const { persons, loadingPersons, ...rest } = this.props;
    if (loadingPersons || !persons) return <h1>Loading...</h1>;
    return (
      <ListPage
        items={persons}
        onDetail={this.handleProfileDetail}
        onEdit={this.handleEditTableItem}
        onDelete={this.handleDeleteTableItem}
        {...rest}
      />
    );
  }
}

const mapStateToProps = state => ({
  persons: state.person.persons,
  loadingPersons: state.person.loading
});

export default connect(
  mapStateToProps,
  { getPersonItems, deletePersonItem }
)(withStyles(rtlStyle)(BusinessProfiles));
