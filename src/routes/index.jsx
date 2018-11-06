import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import Auth from "../views/Auth/Auth.jsx";
import Unauth from "../views/Unauth/Unauth.jsx";

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
    { path: "/", name: "Home", component: Dashboard },
];

export default indexRoutes;
