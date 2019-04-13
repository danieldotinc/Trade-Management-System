import BusinessProfiles from "./components/profiles/businessProfiles";
import Companies from "./components/profiles/companies";
import CustomerProfiles from "./components/profiles/customerProfiles";
import EmployeeProfiles from "./components/profiles/employeeProfiles";
import Home from "./components/Home";
import AddPerson from "./components/profiles/addPerson";
import AddCompany from "./components/profiles/addCompany";
import Profile from "./components/profiles/Profile";
import PersonProfiles from "./components/profiles/personProfiles";
import Products from "./components/products/products";
import Product from "./components/products/product";
import AddProduct from "./components/products/addProduct";
import Dashboard from "./components/dashboard/dashboard";
import { Register } from "./components/users/register";
import { Login } from "./components/users/login";
import Settings from "./components/settings/settings";
import Trade from "./components/trades/trade";
import TradeProduct from "./components/trades/tradeProduct";
import EditSettings from "./components/settings/editSettings";
import Logout from "./components/users/logout";
import Process from "./components/products/process";

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
    rtlName: "اشخاص",
    layout: "/Profiles",
    component: BusinessProfiles
  },
  {
    path: "/Company",
    name: "Company",
    rtlName: "شرکت ها",
    layout: "/Profiles",
    component: Companies
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
    path: "/AddCompany",
    name: "AddCompany",
    rtlName: "افزودن شرکت",
    layout: "",
    component: AddCompany
  },
  {
    path: "/EditCompany/:id",
    name: "EitCompany",
    rtlName: "ویرایش شرکت",
    layout: "",
    component: AddCompany
  },
  {
    path: "/:id",
    name: "Profile",
    rtlName: "پروفایل اشخاص",
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
    path: "/Settings",
    name: "Settings",
    rtlName: "تنظیمات",
    layout: "",
    component: Settings
  },
  {
    path: "/Trade",
    name: "Trade",
    rtlName: "بازرگانی",
    layout: "",
    component: Trade
  },
  {
    path: "/TradeProduct/:id",
    name: "TradeProduct",
    rtlName: "بازرگانی",
    layout: "",
    component: TradeProduct
  },
  {
    path: "/EditSettings",
    name: "EditSettings",
    rtlName: "ویرایش تنظیمات",
    layout: "",
    component: EditSettings
  },
  {
    path: "/:id",
    name: "Product",
    rtlName: "محصول",
    layout: "/Product",
    component: Product
  },
  {
    path: "/:id",
    name: "Process",
    rtlName: "پردازش محصول",
    layout: "/Process",
    component: Process
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
