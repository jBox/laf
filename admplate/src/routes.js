import "./dateFormat";
import React from "react";
import ExtraLayout from "./layouts/ExtraLayout";
import Layout from "./layouts/Layout";
import Home from "./containers/Home";
import Login from "./containers/Login";
import { authenticate } from "./redux/auth"

const routes = [{
    id: "root",
    routes: [{
        path: "/login",
        component: ExtraLayout,
        routes: [{
            path: "/login",
            exact: true,
            component: Login
        }]
    },
    {
        path: "/",
        component: Layout,
        routes: [{
            path: "/",
            exact: true,
            component: Home
        },
        {
            path: "/operation-room/schedule",
            exact: true,
            component: Home
        },
        {
            path: "/operation-room/list",
            exact: true,
            authenticate: authenticate,
            component: Home
        }]
    }]
}];

export default routes;