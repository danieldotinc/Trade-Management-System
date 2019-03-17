import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./components/layouts/Navbar";
import routes from "./routes";
import auth from "./services/authService";

import {
  getBusinessItems,
  deleteBusinessItem,
  getEmployeeItems,
  deleteEmployeeItem,
  getCustomerItems,
  deleteCustomerItem,
  saveBusinessItem,
  savePersonItem
} from "./services/fakeItemService";
import {
  getBusinessTypes,
  getEmployeeTypes,
  getCustomerTypes,
  getProductTypes
} from "./services/fakeTypeService";
import {
  getBusinessColumns,
  getCustomerColumns,
  getEmployeeColumns,
  getProductColumns
} from "./services/fakeColumnService";
import { getProducts, deleteProduct } from "./services/productsServices";

import "./assets/css/style.css";

const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzhjZDllNTJhOTM4YTFmYjAzZGJkMTQiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1NTI4MDgzMjh9.nqzwBTXg0Xx0SL9LuXF5siUhcqXhOuNAyZihAk38hUI";

class App extends Component {
  state = {
    listName: "",
    pageName: "",
    addLink: "",
    items: [],
    types: [],
    columns: [],
    identityTypes: [
      { id: 1, name: "کسب و کار" },
      { id: 2, name: "فرد" },
      { id: 3, name: "کارمند" }
    ],
    selectedGenre: "all",
    sortColumn: { path: "id", order: "desc" },
    currentPage: 1,
    pageSize: 5,
    personInfo: false,
    personId: 1,
    activePage: "Home",
    detailedModal: {
      state: false,
      item: {}
    },
    editForm: false,
    formStep: 0
  };

  handleShowDetailModal = (item, listName) => {
    this.setState({ detailedModal: { state: true, item: item } });
    if (
      listName == "Business" ||
      listName == "Person" ||
      listName == "Employee"
    ) {
      this.props.history.push("/Profiles/Profile");
    } else {
      this.props.history.push("/Product");
    }
  };

  hideDetailModal = () => {
    this.setState({ detailedModal: { state: false, item: {} } });
  };

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
    this.handleRouteChange(this.props.location.pathname);
  }

  handleNewForm = () => {
    this.setState({ editForm: false });
  };

  getProductItems = async () => {
    const { data: items } = await getProducts();
    this.setState({ items });
  };

  deleteProductItem = async id => {
    const originalProducts = [...this.state.items];
    const items = originalProducts.filter(m => m._id !== id);
    this.setState({ items });
    try {
      await deleteProduct(id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("این آیتم قبلا حذف شده است.");
      }
      this.setState({ items: originalProducts });
    }
  };

  saveProductItem = async item => {
    const items = [...this.state.items];
    let itemInDb = items.find(m => m._id === item._id) || {};
    item.imgFiles = [];
    item.imgFile = [];
    item.file = "";
    item.files = [];
    console.log(item);
    if (!itemInDb._id) {
      items.push(item);
      this.setState({ items });
      await axios
        .post("http://localhost:3900/api/products", item, {
          headers: {
            "x-auth-token": authToken //the token is a variable which holds the token
          }
        })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => console.log(err));
    }

    return item;
  };

  handleRouteChange = Route => {
    if (Route == "/Profiles/Business")
      return this.setState({
        listName: "Business",
        pageName: "کسب و کارها",
        addLink: "/AddPerson",
        items: getBusinessItems(),
        columns: getBusinessColumns(),
        types: getBusinessTypes(),
        currentPage: 1
      });
    if (Route == "/Profiles/Employee")
      return this.setState({
        listName: "Employee",
        pageName: "کارمندان",
        addLink: "/AddPerson",
        items: getEmployeeItems(),
        columns: getEmployeeColumns(),
        types: getEmployeeTypes(),
        currentPage: 1
      });
    if (Route == "/Profiles/Person")
      return this.setState({
        listName: "Person",
        pageName: "افراد",
        addLink: "/AddPerson",
        items: getCustomerItems(),
        columns: getCustomerColumns(),
        types: getCustomerTypes(),
        currentPage: 1
      });
    if (Route == "/AddPerson")
      return this.setState({
        pageName: "افزودن شخص"
      });
    if (Route == "/Products") {
      this.getProductItems();
      return this.setState({
        listName: "Product",
        pageName: "محصولات",
        addLink: "/AddProduct",
        columns: getProductColumns(),
        types: getProductTypes(),
        currentPage: 1
      });
    }

    if (Route == "/AddProduct")
      return this.setState({
        pageName: "افزودن محصول",
        types: getProductTypes()
      });
  };

  handleDeleteTableItem = (item, listName) => {
    switch (listName) {
      case "Business":
        deleteBusinessItem(item.id);
        this.setState({
          items: getBusinessItems()
        });
        break;
      case "Employee":
        deleteEmployeeItem(item.id);
        this.setState({
          items: getEmployeeItems()
        });
        break;
      case "Person":
        deleteCustomerItem(item.id);
        this.setState({
          items: getCustomerItems()
        });
        break;
      case "Product":
        this.deleteProductItem(item._id);
        this.getProductItems();
    }
  };

  handleAddItem = item => {
    switch (this.state.listName) {
      case "Business":
        saveBusinessItem(item);
        break;
      case "Person":
        savePersonItem(item);
        break;
      case "Product":
        this.saveProductItem(item);
        break;
    }
    let msg = "";
    if (this.state.editForm) msg = " با موفقیت به روزرسانی شد.";
    else msg = " با موفقیت اضافه شد.";

    toast.info(item.name + msg);
  };

  handleEditTableItem = (item, listName) => {
    this.setState({ detailedModal: { state: false, item }, editForm: true });
    switch (listName) {
      case "Business":
        this.props.history.push("/Profiles/AddPerson");
        break;
      case "Employee":
        this.props.history.push("/Profiles/AddPerson");
        break;
      case "Person":
        this.props.history.push("/Profiles/AddPerson");
        break;
      case "Product":
        this.props.history.push("/AddProduct");
        break;
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
    if (listName == "Business") {
      this.setState({
        items:
          type.name && type.id
            ? getBusinessItems().filter(item => item.type == type.name)
            : getBusinessItems(),
        selectedGenre: type == "all" ? "all" : type.name,
        currentPage: 1
      });
    } else if (listName == "Employee") {
      this.setState({
        items:
          type.name && type.id
            ? getEmployeeItems().filter(item => item.type == type.name)
            : getEmployeeItems(),
        selectedGenre: type == "all" ? "all" : type.name,
        currentPage: 1
      });
    } else if (listName == "Person") {
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
      <React.Fragment>
        <div className="load">
          <ToastContainer />
          <Navigation
            activePage={this.state.activePage}
            onRoute={this.handleRouteChange}
            user={this.state.user}
          />
          <div className="m-3">
            <Switch>
              {routes.map((prop, key) => {
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
                        onFormBack={this.handleFormBack}
                        onFormChange={this.handleFormChange}
                        onRoute={this.handleRouteChange}
                        onAddItem={this.handleAddItem}
                        onNewForm={this.handleNewForm}
                      />
                    )}
                  />
                );
              })}
              <Redirect from="/" to="/Dashboard" />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
