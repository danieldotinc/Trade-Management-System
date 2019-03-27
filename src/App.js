import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./components/layouts/Navbar";
import ProtectedRoute from "./components/protectedRoute";
import routes from "./routes";
import auth from "./services/authService";

import {
  getBusinessItems,
  deleteBusinessItem,
  getEmployeeItems,
  deleteEmployeeItem,
  getCustomerItems,
  deleteCustomerItem,
  saveBusinessItem
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
import {
  getProducts,
  saveProduct,
  updateProduct
} from "./services/productService";
import { getCategories, deleteCategory } from "./services/categoryService";
import {
  getPersons,
  deletePerson,
  savePerson,
  updatePerson
} from "./services/personService";
import { getIdentities, deleteIdentity } from "./services/identityService";
import { getCompanies, deleteCompany } from "./services/companyService";
import {
  getMarketSectors,
  deleteMarketSector
} from "./services/marketSectorService";

import {
  getOfficeSectors,
  deleteOfficeSector
} from "./services/officeSectorService";

import { connect } from "react-redux";
import { deleteProductItem, addProductItem } from "./actions/productActions";
import { deletePersonItem, addPersonItem } from "./actions/personActions";

import "./assets/css/style.css";
import { Login } from "./components/users/login";
import { Register } from "./components/users/register";

class App extends Component {
  state = {
    listName: "",
    pageName: "",
    addLink: "",
    items: [],
    types: [],
    sectors: [],
    columns: [],
    identities: [],
    companies: [],
    links: [],
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

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
    this.handleRouteChange(this.props.location.pathname);
  }

  handleShowDetailModal = (item, listName) => {
    // this.setState({ detailedModal: { state: true, item: item } });
    if (
      listName == "Business" ||
      listName == "Person" ||
      listName == "Employee"
    ) {
      this.props.history.push(`/Profiles/${item._id}`);
    } else {
      this.props.history.push(`/Product/${item._id}`);
    }
  };

  hideDetailModal = () => {
    this.setState({ detailedModal: { state: false, item: {} } });
  };

  handleNewForm = () => {
    this.setState({ editForm: false });
  };

  // getProductItems = async () => {
  //   const { data: items } = await getProducts();
  //   this.setState({ items });
  // };

  getCategoryItems = async () => {
    const { data: types } = await getCategories();
    this.setState({ types });
  };

  // getPersonItems = async () => {
  //   const { data: items } = await getPersons();
  //   this.setState({ items });
  // };

  getMarketSectorItems = async () => {
    const { data: types } = await getMarketSectors();
    this.setState({ types });
  };

  getIdentityItems = async () => {
    const { data: identities } = await getIdentities();
    this.setState({ identities });
  };

  getCompanyItems = async () => {
    const { data: companies } = await getCompanies();
    this.setState({ companies });
  };

  getOfficeSectorItems = async () => {
    const { data: sectors } = await getOfficeSectors();
    this.setState({ sectors });
  };

  saveProductItem = async item => {
    // const items = [...this.state.items];
    // let itemInDb = items.find(m => m._id === item._id) || {};
    delete item.imgFiles;
    delete item.imgFile;
    delete item.file;
    delete item.files;
    this.props.addProductItem(item);
    // if (!itemInDb._id) {
    //   items.push(item);
    //   this.setState({ items });
    //   await saveProduct(item);
    // } else {
    //   items.splice(items.indexOf(itemInDb), 1);
    //   items.push(item);
    //   this.setState({ items });
    //   await updateProduct(item);
    // }
  };

  savePersonItem = async item => {
    const items = [...this.state.items];
    let itemInDb = items.find(m => m._id === item._id) || {};
    if (!itemInDb._id) {
      items.push(item);
      this.setState({ items });
      await savePerson(item);
    } else {
      items.splice(items.indexOf(itemInDb), 1);
      items.push(item);
      this.setState({ items });
      await updatePerson(item);
    }
  };

  getBusinessLinks = () => {
    const links = [
      { label: "کسب و کار", link: "/Profiles/Business" },
      { label: "فرد", link: "/Profiles/Person" },
      { label: "کارمند", link: "/Profiles/Employee" }
    ];
    this.setState({ links });
  };

  handleRouteChange = Route => {
    if (Route == "/Profiles/Business") {
      this.getMarketSectorItems();
      this.getIdentityItems();
      this.getCompanyItems();
      this.getOfficeSectorItems();
      return this.setState({
        listName: "Business",
        pageName: "کسب و کارها",
        addLink: "/AddPerson",
        columns: getBusinessColumns(),
        currentPage: 1
      });
    }

    if (Route == "/AddPerson") {
      this.getMarketSectorItems();
      this.getIdentityItems();
      this.getCompanyItems();
      return this.setState({
        pageName: "افزودن شخص"
      });
    }
    if (Route == "/Products") {
      this.getCategoryItems();
      return this.setState({
        listName: "Product",
        pageName: "محصولات",
        addLink: "/AddProduct",
        columns: getProductColumns(),
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
        this.props.deletePersonItem(item._id);
        break;
      case "Product":
        this.props.deleteProductItem(item._id);
        break;
    }
  };

  handleAddItem = item => {
    switch (this.state.listName) {
      case "Business":
        this.savePersonItem(item);
        break;
      case "Person":
        this.savePersonItem(item);
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
        this.props.history.push("/AddPerson");
        break;
      case "Employee":
        this.props.history.push("/AddPerson");
        break;
      case "Person":
        this.props.history.push("/AddPerson");
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
    const { user, activePage } = this.state;

    return (
      <div className="load">
        <ToastContainer />
        <Navigation
          activePage={activePage}
          onRoute={this.handleRouteChange}
          user={user}
        />
        <div className="m-3">
          <Switch>
            {routes.map((prop, key) => {
              return (
                <ProtectedRoute
                  path={prop.layout + prop.path}
                  key={key}
                  component={prop.component}
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
              );
            })}
            <Route path="/Login" component={Login} />
            <Route path="/Register" component={Register} />
            <Redirect from="/" to="/Dashboard" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { deleteProductItem, deletePersonItem, addProductItem }
)(withRouter(App));
