import Dashboard from "views/Dashboard/Dashboard.jsx";
import UserPage from "views/UserPage/UserPage.jsx";
import Prescription from "views/Prescription/Prescription.jsx";
import Report from "views/Report/Report.jsx";
import Create_Prescription from "components/Prescription_Create/Prescription_Create.jsx";
import Update_Prescription from "components/Prescription_Update/Prescription_Update.jsx";
import CR_Admin from "../components/CR_Admin/CR_Admin.jsx";
import Update_User_Admin from "components/Update_User_Admin/Update_User_Admin.jsx";
import SearchReportAdmin from "../views/SearchReportAdmin/SearchReportAdmin.jsx";
import AdminSearch from "../views/AdminSearch/AdminSearch.jsx";
import AdminSearchUser from "../views/AdminSearchUser/AdminSearchUser.jsx";

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
    path: "/sp_admin",
    name: "Search Prescription",
    icon: "nc-icon nc-zoom-split",
    component: AdminSearch
  },
  {
    path: "/list_users",
    name: "List Users",
    icon: "nc-icon nc-single-02",
    component: UserPage
  },
  {
    path: "/s_u",
    name: "Search User",
    icon: "nc-icon nc-zoom-split",
    component: AdminSearchUser
  },
  {
    path: "/list_report",
    name: "List Report",
    icon: "nc-icon nc-bullet-list-67",
    component: Report
  },
  {
    path: "/cr_admin",
    name: "Add Report",
    icon: "nc-icon nc-cloud-upload-94",
    component: CR_Admin
  },
  {
    path: "/sr_admin",
    name: "Search Report",
    icon: "nc-icon nc-zoom-split",
    component: SearchReportAdmin
  },
  {
    path: "/auth",
    name: "Log Out",
    icon: "nc-icon nc-spaceship"
  },
  {
    path: "/up",
    component: Update_Prescription
  },
  {
    path: "/uua",
    component: Update_User_Admin
  },
  
  { redirect: true, path: "/", pathTo: "/auth", name: "Auth" },
  
];
export default dashRoutes;
