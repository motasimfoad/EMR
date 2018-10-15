import Dashboard from "views/Dashboard/Dashboard.jsx";
import UserPage from "views/UserPage/UserPage.jsx";
import Prescription from "views/Prescription/Prescription.jsx";

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
  {
    pro: true,
    path: "/",
    name: "Log Out",
    icon: "nc-icon nc-spaceship"
  },
  { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;
