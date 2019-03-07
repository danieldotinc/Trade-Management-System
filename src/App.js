import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Navigation from "./components/layouts/Navbar";
import routes from "./routes";
import { PersianNum } from "./components/table/common/persiandigit";
import FormValidate from "./components/form/formValidate";

import {
  getBusinessItems,
  deleteBusinessItem,
  getEmployeeItems,
  deleteEmployeeItem,
  getCustomerItems,
  deleteCustomerItem,
  saveItem
} from "./services/fakeItemService";
import {
  getBusinessTypes,
  getEmployeeTypes,
  getCustomerTypes
} from "./services/fakeTypeService";

import {
  getBusinessColumns,
  getCustomerColumns,
  getEmployeeColumns
} from "./services/fakeColumnService";

import "./assets/css/style.css";

class App extends Component {
  state = {
    listName: "",
    items: [],
    types: [],
    columns: [],
    selectedGenre: "all",
    sortColumn: { path: "id", order: "asc" },
    currentPage: 1,
    pageSize: 5,
    personInfo: false,
    personId: 1,
    activePage: "Home",
    detailedModal: {
      state: false,
      item: {
        name: "",
        company: "",
        type: "",
        mobile: "",
        postalCode: "",
        telephone: "",
        telExtention: "",
        state: "",
        city: "",
        address: "",
        credit: "",
        identityType: ""
      }
    },
    addNewForm: {
      name: "",
      company: "",
      type: "",
      mobile: "",
      postalCode: "",
      telephone: "",
      telExtention: "",
      state: "",
      city: "",
      address: "",
      credit: "",
      identityType: "کسب و کار"
    },
    formStep: 0,
    formValidation: false
  };

  handleShowDetailModal = (item, listName) => {
    this.setState({ detailedModal: { state: true, item: item } });
    this.props.history.push("/Profiles/BusinessProfile");
  };

  hideDetailModal = () => {
    this.setState({ detailedModal: { state: false, item: {} } });
  };

  componentDidMount() {
    this.handleRouteChange(this.props.location.pathname);
  }

  // handleFormSteps = formName => {
  //   if (this.state.formValidation) {
  //     $("#" + formName + this.state.formStep).hide();
  //     $("#" + formName + (this.state.formStep + 1)).show();
  //     $("#prevBtn").show();
  //     $("#cancelBtn").hide();
  //     this.setState({ formStep: this.state.formStep + 1 });
  //   } else {
  //     this.checkForm(formName);
  //   }
  // };

  // handleFormBack = formName => {
  //   $("#" + formName + this.state.formStep).hide();
  //   $("#" + formName + (this.state.formStep - 1)).show();
  //   $("#prevBtn").hide();
  //   $("#cancelBtn").show();
  //   this.setState({ formStep: this.state.formStep - 1 });
  // };

  // handleNewForm = formName => {
  //   $("#" + formName + 1).show();
  //   $("#" + formName + 2 + ",#" + formName + 3 + ",#" + formName + 4).hide();
  //   $("#prevBtn").hide();
  //   $("#cancelBtn").show();
  //   this.setState({ formStep: 1 });
  // };

  handleNewForm = () => {
    const addNewForm = { ...this.state.addNewForm };
    Object.keys(addNewForm).map((keyName, i) => (addNewForm[keyName] = ""));
    this.setState({ addNewForm });
  };

  handleRouteChange = Route => {
    if (Route == "/Profiles/Business")
      return this.setState({
        listName: "business",
        items: getBusinessItems(),
        columns: getBusinessColumns(),
        types: getBusinessTypes()
      });
    if (Route == "/Profiles/Employee")
      return this.setState({
        listName: "employee",
        items: getEmployeeItems(),
        columns: getEmployeeColumns(),
        types: getEmployeeTypes()
      });
    if (Route == "/Profiles/Customer")
      return this.setState({
        listName: "customer",
        items: getCustomerItems(),
        columns: getCustomerColumns(),
        types: getCustomerTypes()
      });
  };

  handleDeleteTableItem = (id, listName) => {
    if (listName == "business") {
      deleteBusinessItem(id);
      this.setState({
        businessItems: getBusinessItems()
      });
    } else if (listName == "employee") {
      deleteEmployeeItem(id);
      this.setState({
        employeeItems: getEmployeeItems()
      });
    } else if (listName == "customer") {
      deleteCustomerItem(id);
      this.setState({
        employeeItems: getCustomerItems()
      });
    }
  };

  handleAddItem = item => {
    saveItem(item);
  };

  handleEditTableItem = (item, listName) => {
    if (listName == "business") {
      this.setState({ addNewForm: item });
      this.props.history.push("/Profiles/addBusinessPerson");
    } else if (listName == "employee") {
    } else if (listName == "customer") {
    }
  };

  handleLikeItem = item => {
    const items = [...this.state.items];
    const index = items.indexOf(item);
    items[index].liked = !items[index].liked;
    this.setState({
      items
    });
  };

  handleTypesFilter = (type, listName) => {
    if (listName == "business") {
      this.setState({
        items:
          type.name && type.id
            ? getBusinessItems().filter(item => item.type == type.name)
            : getBusinessItems(),
        selectedGenre: type == "all" ? "all" : type.name,
        currentPage: 1
      });
    } else if (listName == "employee") {
      this.setState({
        items:
          type.name && type.id
            ? getEmployeeItems().filter(item => item.type == type.name)
            : getEmployeeItems(),
        selectedGenre: type == "all" ? "all" : type.name,
        currentPage: 1
      });
    } else if (listName == "customer") {
      this.setState({
        items:
          type.name && type.id
            ? getCustomerItems().filter(item => item.type == type.name)
            : getCustomerItems(),
        selectedGenre: type == "all" ? "all" : type.name,
        currentPage: 1
      });
    }
  };

  handlePageChange = (page, listName) => this.setState({ currentPage: page });

  handleFormChange = e => {
    const addNewForm = { ...this.state.addNewForm };
    addNewForm[e.target.name] = PersianNum(e.target.value);
    const formValidation = FormValidate(e);

    this.setState({ addNewForm, formValidation });
  };

  handleSort = (sortColumn, listName) => this.setState({ sortColumn });

  handleDelete = id => {
    this.setState({
      products: [...this.state.products.filter(pro => pro.id !== id)]
    });
  };

  render() {
    const { products } = this.state;

    return (
      <React.Fragment>
        <Navigation
          activePage={this.state.activePage}
          onRoute={this.handleRouteChange}
        />
        <div className="m-3">
          <Switch>
            {routes.map((prop, key) => {
              if (prop.layout === "/Profiles") {
                return (
                  <Route
                    path={prop.layout + prop.path}
                    key={key}
                    render={props => (
                      <prop.component
                        {...props}
                        state={this.state}
                        listName={prop.name}
                        onShowDetailModal={this.handleShowDetailModal}
                        onDeleteTableItem={this.handleDeleteTableItem}
                        onEditTableItem={this.handleEditTableItem}
                        onLikeItem={this.handleLikeItem}
                        onPageChange={this.handlePageChange}
                        onGenreChange={this.handleTypesFilter}
                        onSort={this.handleSort}
                        onStep={this.handleFormSteps}
                        onNewForm={this.handleNewForm}
                        onFormBack={this.handleFormBack}
                        onFormChange={this.handleFormChange}
                        onRoute={this.handleRouteChange}
                        onAddItem={this.handleAddItem}
                      />
                    )}
                  />
                );
              }
            })}
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
