import BusinessProfiles from "./components/profiles/businessProfiles";
import CustomerProfiles from "./components/profiles/customerProfiles";
import EmployeeProfiles from "./components/profiles/employeeProfiles";
import Home from "./components/Home";
import AddPerson from "./components/profiles/addPerson";
import Profile from "./components/profiles/Profile";
import PersonProfiles from "./components/profiles/personProfiles";
import Products from "./components/products/products";
import Product from "./components/products/product";
import AddProduct from "./components/products/addProduct";
import Dashboard from "./components/dashboard/dashboard";
import { Register } from "./components/users/register";
import { Login } from "./components/users/login";
import Logout from "./components/users/logout";

let dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "داشبورد",
    layout: "/admin",
    component: Home
  },
  {
    path: "/Business",
    name: "Business",
    rtlName: "کسب و کارها",
    layout: "/Profiles",
    component: BusinessProfiles
  },
  {
    path: "/Person",
    name: "Person",
    rtlName: "فرد",
    layout: "/Profiles",
    component: PersonProfiles
  },
  {
    path: "/Employee",
    name: "Employee",
    rtlName: "کارمندان",
    layout: "/Profiles",
    component: EmployeeProfiles
  },
  {
    path: "/AddPerson",
    name: "addPerson",
    rtlName: "افزودن شخص",
    layout: "",
    component: AddPerson
  },
  {
    path: "/:id",
    name: "Profile",
    rtlName: "پروفایل کسب و کار",
    layout: "/Profiles",
    component: Profile
  },
  {
    path: "/Products",
    name: "Products",
    rtlName: "محصولات",
    layout: "",
    component: Products
  },
  {
    path: "/:id",
    name: "Product",
    rtlName: "محصول",
    layout: "/Product",
    component: Product
  },
  {
    path: "/AddProduct",
    name: "AddProduct",
    rtlName: "افزودن محصول",
    layout: "",
    component: AddProduct
  },
  {
    path: "/EditProduct/:id",
    name: "EitProduct",
    rtlName: "ویرایش محصول",
    layout: "",
    component: AddProduct
  },
  {
    path: "/EditPerson/:id",
    name: "EitPerson",
    rtlName: "ویرایش شخص",
    layout: "",
    component: AddPerson
  },
  {
    path: "/Dashboard",
    name: "Dashboard",
    rtlName: "داشبورد",
    layout: "",
    component: Dashboard
  },
  {
    path: "/Logout",
    name: "Logout",
    rtlName: "خروج از حساب",
    layout: "",
    component: Logout
  }
];

export default dashboardRoutes;
