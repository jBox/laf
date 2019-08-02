import "./dateFormat";
import ExtraLayout from "./layouts/ExtraLayout";
import Layout from "./layouts/Layout";
import Home from "./containers/Home";
import ApplyOperation from "./containers/Operation/Apply";
import ScheduleOperation from "./containers/Operation/Schedule";
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
            component: ScheduleOperation
        },
        {
            path: "/operation-room/apply",
            exact: true,
            component: ApplyOperation
        },
        {
            path: "/operation-room/cancel",
            exact: true,
            authenticate: authenticate,
            component: Home
        },
        {
            path: "/operation-room/notice",
            exact: true,
            authenticate: authenticate,
            component: Home
        }]
    }]
}];

export default routes;