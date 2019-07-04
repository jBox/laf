import "./dateFormat";
import React from "react";
import ExtraLayout from "./layouts/ExtraLayout";
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
        },{
            path:"/extra",
            exact: true,
            component: ExtraLayout
        }]
    }]
}];

export default routes;