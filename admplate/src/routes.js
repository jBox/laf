import "./dateFormat";
import React from "react";
import Layout from "./layouts/Layout";
import Home from "./containers/Home";

const routes = [{
    id: "wrapper",
    routes: [{
        path: "/",
        component: Layout,
        routes:[{
            path:"/",
            exact: true,
            component: Home
        }]
    }]
}];

export default routes;