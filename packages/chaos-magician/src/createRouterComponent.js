import React from "react";
import structureReactRoutes from "./structureReactRoutes";
import withReduxComponent from "./withReduxComponent";
import {
    Switch,
    StaticRouter,
    Route,
    BrowserRouter
} from "react-router-ads";

export default function createRouterComponent({
    url,
    routes,
    routerContext,
    store,
    monitor
}) {
    const { pathname, href } = url;
    routes = structureReactRoutes(pathname, routes);

    const switches = (<Switch>
        {routes.map((route, index) => (<Route key={index} {...route} />))}
    </Switch>);

    const reduxComponent = withReduxComponent(store, monitor);

    if (SERVER_RENDER) {
        return reduxComponent(<StaticRouter location={href} context={routerContext}>
            {switches}
        </StaticRouter>);
    } else {
        return reduxComponent(<BrowserRouter>{switches}</BrowserRouter>);
    }
};