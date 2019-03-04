import React, { Component } from "react";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import Navigation from "./components/layouts/Navbar";
import uuid from "uuid";
import $ from "jquery";
import Home from "./components/Home";
import Like from "./components/table/common/like";
import routes from "./routes";

import Profiles from "./views/profiles/profiles";

import {
  getBusinessItems,
  deleteBusinessItem,
  getEmployeeItems,
  deleteEmployeeItem,
  getCustomerItems,
  deleteCustomerItem
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
    types: [],
    columns: [],
    selectedGenre: "all",
    sortColumn: { path: "id", order: "asc" },
    currentPage: 1,
    pageSize: 3,
    items: [],
    personInfo: false,
    personId: 1,
    activePage: "Home",
    detailedModal: {
      state: false,
      item: { name: "", mobile: "", postalcode: "", telephone: "" }
    },
    formStep: 1
  };

  showDetailModal = (item, listName) => {
    this.setState({ detailedModal: { state: true, item: item } });
  };

  hideDetailModal = () => {
    this.setState({ detailedModal: { state: false, item: {} } });
  };

  componentDidMount() {
    if (this.props.location.pathname == "/Profiles/Business")
      return this.setState({
        items: getBusinessItems(),
        columns: getBusinessColumns(),
        types: getBusinessTypes()
      });
    if (this.props.location.pathname == "/Profiles/Employee")
      return this.setState({
        items: getEmployeeItems(),
        columns: getEmployeeColumns(),
        types: getEmployeeTypes()
      });
    if (this.props.location.pathname == "/Profiles/Customer")
      return this.setState({
        items: getCustomerItems(),
        columns: getCustomerColumns(),
        types: getCustomerTypes()
      });
  }

  handleFormSteps = formName => {
    $("#" + formName + this.state.formStep).hide();
    $("#" + formName + (this.state.formStep + 1)).show();
    this.setState({ formStep: this.state.formStep + 1 });
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

  handleEditTableItem = (id, listName) => {
    console.log(listName);
    if (listName == "business") {
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

  handleSort = (sortColumn, listName) => this.setState({ sortColumn });

  handleDelete = id => {
    this.setState({
      products: [...this.state.products.filter(pro => pro.id !== id)]
    });
  };

  render() {
    const { products } = this.state;

    return (
      <BrowserRouter>
        <React.Fragment>
          <Navigation activePage={this.state.activePage} />
          <div className="m-3">
            <Switch>
              {/* <Route
                path="/Profiles"
                render={props => (
                  <Profiles
                    listName={prop.name}
                        columns={columns}
                        items={items}
                        genres={genres}
                        selectedGenre={selectedGenre}
                        sortColumn={sortColumn}
                        onDeleteTableItem={onDeleteTableItem}
                        onEditTableItem={onEditTableItem}
                        onLikeItem={onLikeItem}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        onPageChange={onPageChange}
                        onGenreChange={onGenreChange}
                        onSort={onSort}
                  />
                )}
              /> */}
              {routes.map((prop, key) => {
                if (prop.layout === "/Profiles") {
                  return (
                    <Route
                      path={prop.layout + prop.path}
                      key={key}
                      render={props => (
                        <prop.component
                          {...props}
                          listName={prop.name}
                          detailedModal={this.state.detailedModal}
                          showDetailModal={this.showDetailModal}
                          hideDetailModal={this.hideDetailModal}
                          columns={this.state.columns}
                          items={this.state.items}
                          genres={this.state.types}
                          selectedGenre={this.state.selectedGenre}
                          sortColumn={this.state.sortColumn}
                          onDeleteTableItem={this.handleDeleteTableItem}
                          onEditTableItem={this.handleEditTableItem}
                          onLikeItem={this.handleLikeItem}
                          currentPage={this.state.currentPage}
                          pageSize={this.state.pageSize}
                          onPageChange={this.handlePageChange}
                          onGenreChange={this.handleTypesFilter}
                          onSort={this.handleSort}
                          onStep={this.handleFormSteps}
                        />
                      )}
                    />
                  );
                }
              })}
            </Switch>
          </div>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default withRouter(App);
