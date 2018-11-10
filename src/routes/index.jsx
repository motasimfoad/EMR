import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import Auth from "../views/Auth/Auth.jsx";
import Unauth from "../views/Unauth/Unauth.jsx";
import Search from "../views/Search/Search.jsx";
import Docdash from "../views/Docdash/Docdash.jsx";
import CP_doc from "../components/CP_doc/CP_doc.jsx";
import Docsearch from "../views/Docsearch/Docsearch.jsx";
import Doc_Prescription_Update from "../components/Doc_Prescription_Update/Doc_Prescription_Update.jsx";


var indexRoutes = [
    {
        path: "/auth",
        name: "Auth",
        component: Auth
    },
    {
        path: "/unauth",
        name: "Unauth",
        component: Unauth
    },
    {
        path: "/search",
        name: "Search",
        component: Search
    },
    {
        path: "/docdash",
        name: "Docdash",
        component: Docdash
    },
    {
        path: "/cp_doc",
        name: "CP_doc",
        component: CP_doc
    },
    {
        path: "/docsearch",
        name: "Docsearch",
        component: Docsearch
    },
    {
        path: "/doc_prescription_update",
        name: "Doc_Prescription_Update",
        component: Doc_Prescription_Update
    },
    { path: "/", name: "Home", component: Dashboard },
];

export default indexRoutes;
