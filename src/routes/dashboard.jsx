import Dashboard from "views/Dashboard/Dashboard.jsx";
import UserPage from "views/UserPage/UserPage.jsx";
import Prescription from "views/Prescription/Prescription.jsx";
import Create_Prescription from "components/Prescription_Create/Prescription_Create.jsx";
import Update_Prescription from "components/Prescription_Update/Prescription_Update.jsx";
import CR_Admin from "../components/CR_Admin/CR_Admin.jsx"

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard
  },
  {
    path: "/prescription",
    name: "List Presciption",
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
    path: "/list_users",
    name: "List Users",
    icon: "nc-icon nc-single-02",
    component: UserPage
  },
  {
    path: "/cr_admin",
    name: "Create Report",
    icon: "nc-icon nc-ruler-pencil",
    component: CR_Admin
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
  { redirect: true, path: "/", pathTo: "/auth", name: "Auth" },
  //{ redirect: true, path: "/Auth", pathTo: "/Auth", name: "Auth" }
];
export default dashRoutes;
