import Dashboard from "views/Dashboard/Dashboard.jsx";
import UserPage from "views/UserPage/UserPage.jsx";
import Auth from "views/Auth/Auth.jsx";
import Prescription from "views/Prescription/Prescription.jsx";
import Create_Prescription from "components/Prescription_Create/Prescription_Create.jsx";
import Update_Prescription from "components/Prescription_Update/Prescription_Update.jsx";

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
    path: "/cp",
    name: "Create Prescription",
    icon: "nc-icon nc-ruler-pencil",
    component: Create_Prescription
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage
  },
  {
    path: "/up",
    component: Update_Prescription
  },
  {
    pro: true,
    path: "/",
    name: "Log Out",
    icon: "nc-icon nc-spaceship"
  },
  { redirect: true, path: "/", pathTo: "/login", name: "Login" },
  //{ redirect: true, path: "/Auth", pathTo: "/Auth", name: "Auth" }
];
export default dashRoutes;
