import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import uuid from "uuid";
import Home from "./components/Home";
import Like from "./components/table/common/like";

import Profiles from "./views/profiles/profiles";

import { getItems, deleteItem } from "./services/fakeItemService";
import { getTypes } from "./services/fakeTypeService";

import "./assets/css/style.css";

class App extends Component {
  state = {
    types: getTypes(),
    columns: [
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
            onClick={() => this.handleDeleteTableItem(item.id)}
          >
            حذف
          </button>
        )
      }
    ],
    selectedGenre: "all",
    sortColumn: "id",
    currentPage: 1,
    pageSize: 2,
    items: getItems(),
    personInfo: false,
    personId: 1,
    activePage: "Home"
  };

  handleDeleteTableItem = id => {
    deleteItem(id);
    this.setState({
      items: getItems()
    });
  };

  handleLikeItem = item => {
    const items = [...this.state.items];
    const index = items.indexOf(item);
    items[index].liked = !items[index].liked;
    this.setState({
      items
    });
  };

  handleTypesFilter = type =>
    this.setState({
      items:
        type.name && type.id
          ? getItems().filter(item => item.type == type.name)
          : getItems(),
      selectedGenre: type == "all" ? "all" : type.name,
      currentPage: 1
    });

  handlePageChange = page => this.setState({ currentPage: page });

  handleSort = sortColumn => this.setState({ sortColumn });

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
          <Navbar activePage={this.state.activePage} />
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
                    columns={this.state.columns}
                    items={this.state.items}
                    genres={this.state.types}
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
