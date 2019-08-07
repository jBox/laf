import "./dateFormat";
import ExtraLayout from "./layouts/ExtraLayout";
import Layout from "./layouts/Layout";
import Home from "./containers/Home";
import ApplyOperation from "./containers/Operation/Apply";
import ScheduleOperation from "./containers/Operation/Schedule";
import Login from "./containers/Login";
import Landing from "./containers/Landing";
import { authenticate } from "./redux/auth"

const routes = [{
    id: "root",
    routes: [{
        path: "/(login|landing)",
        component: ExtraLayout,
        routes: [{
            path: "/login",
            exact: true,
            component: Login
        },
        {
            path: "/landing",
            exact: true,
            component: Landing
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
            path: "/operation/schedule/room",
            exact: true,
            component: ScheduleOperation
        },
        {
            path: "/operation/apply/room",
            exact: true,
            component: ApplyOperation
        },
        {
            path: "/operation/cancel/room",
            exact: true,
            authenticate: authenticate,
            component: Home
        },
        {
            path: "/operation/notice/room",
            exact: true,
            authenticate: authenticate,
            component: Home
        }]
    }]
}];

export default routes;