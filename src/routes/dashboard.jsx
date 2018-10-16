import Dashboard from "views/Dashboard/Dashboard.jsx";
import UserPage from "views/UserPage/UserPage.jsx";
import Prescription from "views/Prescription/Prescription.jsx";
import Create_Prescription from "components/Prescription_Create/Prescription_Create.jsx";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard
  },
  {
    path: "/prescription",
    name: "Presciption",
    icon: "nc-icon nc-paper",
    component: Prescription
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage
  },
  { hide: true,
    path: "/cp",
    name: "Create Prescription",
    icon: "nc-icon nc-single-02",
    component: Create_Prescription
  },
  {
    pro: true,
    path: "/",
    name: "Log Out",
    icon: "nc-icon nc-spaceship"
  },
  { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;
