import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import Navigation from "./components/layouts/Navbar";
import uuid from "uuid";
import Home from "./components/Home";
import Like from "./components/table/common/like";

import Profiles from "./views/profiles/profiles";

import {
  getBusinessItems,
  deleteBusinessItem,
  getEmployeesItems,
  deleteEmployeeItem
} from "./services/fakeItemService";
import { getBusinessTypes, getEmployeeTypes } from "./services/fakeTypeService";

import "./assets/css/style.css";

class App extends Component {
  state = {
    businessTypes: getBusinessTypes(),
    employeeTypes: getEmployeeTypes(),
    businessColumns: [
      { label: "ID", path: "id" },
      { label: "نام", path: "name" },
      { label: "حوزه فعالیت", path: "type" },
      { label: "تراکنش مالی", path: "transaction" },
      { label: "شهر", path: "city" },
      {
        key: uuid.v4(),
        content: item => (
          <Like movie={item} onClick={() => this.handleLikeItem(item)} />
        )
      },
      {
        key: uuid.v4(),
        content: item => (
          <button
            className="btn btn-danger"
            onClick={() => this.handleDeleteTableItem(item.id, "business")}
          >
            حذف
          </button>
        )
      }
    ],
    employeesColumns: [
      { label: "ID", path: "id" },
      { label: "نام", path: "name" },
      { label: "واحد فعالیت", path: "type" },
      { label: "تلفن اینترنتی", path: "telephone" },
      {
        key: uuid.v4(),
        content: item => (
          <Like movie={item} onClick={() => this.handleLikeItem(item)} />
        )
      },
      {
        key: uuid.v4(),
        content: item => (
          <button
            className="btn btn-danger"
            onClick={() => this.handleDeleteTableItem(item.id, "employee")}
          >
            حذف
          </button>
        )
      }
    ],
    selectedGenre: "all",
    sortColumn: "id",
    currentPage: 1,
    pageSize: 3,
    businessItems: getBusinessItems(),
    employeeItems: getEmployeesItems(),
    personInfo: false,
    personId: 1,
    activePage: "Home"
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
        employeeItems: getEmployeesItems()
      });
    }
  };

  handleLikeItem = item => {
    const businessItems = [...this.state.businessItems];
    const index = businessItems.indexOf(item);
    businessItems[index].liked = !businessItems[index].liked;
    this.setState({
      businessItems
    });
  };

  handleTypesFilter = (type, listName) => {
    if (listName == "businessItems") {
      this.setState({
        businessItems:
          type.name && type.id
            ? getBusinessItems().filter(item => item.type == type.name)
            : getBusinessItems(),
        selectedGenre: type == "all" ? "all" : type.name,
        currentPage: 1
      });
    } else if (listName == "employeeItems") {
      this.setState({
        employeeItems:
          type.name && type.id
            ? getEmployeesItems().filter(item => item.type == type.name)
            : getEmployeesItems(),
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
      <Router>
        <React.Fragment>
          <Navigation activePage={this.state.activePage} />
          <div className="m-3">
            <Switch>
              {/* <Route
                exact
                path="/Home"
                render={props => (
                  <Home products={products} onDelete={this.handleDelete} />
                )}
              /> */}
              <Route
                exact
                path="/Profiles"
                render={props => (
                  <Profiles
                    listName={"businessItems"}
                    columns={this.state.businessColumns}
                    items={this.state.businessItems}
                    genres={this.state.businessTypes}
                    selectedGenre={this.state.selectedGenre}
                    sortColumn={this.state.sortColumn}
                    onDeleteTableItem={this.handleDeleteTableItem}
                    onLikeItem={this.handleLikeItem}
                    currentPage={this.state.currentPage}
                    pageSize={this.state.pageSize}
                    onPageChange={this.handlePageChange}
                    onGenreChange={this.handleTypesFilter}
                    onSort={this.handleSort}
                  />
                )}
              />
              <Route
                exact
                path="/Profiles/Employees"
                render={props => (
                  <Profiles
                    listName={"employeeItems"}
                    columns={this.state.employeesColumns}
                    items={this.state.employeeItems}
                    genres={this.state.employeeTypes}
                    selectedGenre={this.state.selectedGenre}
                    sortColumn={this.state.sortColumn}
                    onDeleteTableItem={this.handleDeleteTableItem}
                    onLikeItem={this.handleLikeItem}
                    currentPage={this.state.currentPage}
                    pageSize={this.state.pageSize}
                    onPageChange={this.handlePageChange}
                    onGenreChange={this.handleTypesFilter}
                    onSort={this.handleSort}
                  />
                )}
              />
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
