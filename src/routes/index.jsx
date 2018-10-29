import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import Auth from "../views/Auth/Auth.jsx";

var indexRoutes = [
    {
        path: "/auth",
        name: "Auth",
        component: Auth
    },
    { path: "/", name: "Home", component: Dashboard },
];

export default indexRoutes;
