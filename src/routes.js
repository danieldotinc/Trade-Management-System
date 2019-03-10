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
    layout: "/Profiles",
    component: AddPerson
  },
  {
    path: "/Profile",
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
    path: "/Product",
    name: "Product",
    rtlName: "محصول",
    layout: "",
    component: Product
  },
  {
    path: "/AddProduct",
    name: "AddProduct",
    rtlName: "افزودن محصول",
    layout: "",
    component: AddProduct
  }
];

export default dashboardRoutes;
