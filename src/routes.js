import BusinessProfiles from "./components/profiles/businessProfiles";
import CustomerProfiles from "./components/profiles/customerProfiles";
import EmployeeProfiles from "./components/profiles/employeeProfiles";
import Home from "./components/Home";

let dashboardRoutes = [
  {
    path: "/dashboard",
    name: "dashboard",
    rtlName: "داشبورد",
    layout: "/admin",
    component: Home
  },
  {
    path: "/Business",
    name: "business",
    rtlName: "کسب و کارها",
    layout: "/Profiles",
    component: BusinessProfiles
  },
  {
    path: "/Customer",
    name: "customer",
    rtlName: "مشتریان",
    layout: "/Profiles",
    component: CustomerProfiles
  },
  {
    path: "/Employee",
    name: "employee",
    rtlName: "کارمندان",
    layout: "/Profiles",
    component: EmployeeProfiles
  }
];

export default dashboardRoutes;
