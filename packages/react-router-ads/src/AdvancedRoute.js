import React from "react";
import { Route, Redirect } from "react-router";

const DEFAULT_AUTH = () => ({ success: true });

const redirect = (redirect, location) => {
    const from = `${location.pathname}${location.search}`;
    const to = (redirect || "").replace(/{\d+}/ig, encodeURIComponent(from));

    return (<Redirect to={to} from={from} />);
};

export default (route) => {
    const { routes, authenticate = DEFAULT_AUTH } = route;

    const routeProps = {
        path: route.path,
        exact: route.exact,
        strict: route.strict,
        location: route.location,
        sensitive: route.sensitive
    };

    // https://reacttraining.com/react-router/web/api/Route/Route-props
    // render props: { match, lacation, history }
    if (route.component) {
        routeProps.render = (props) => {
            const auth = authenticate(props);
            if (!auth.success) {
                return redirect(auth.redirect, props.location);
            }

            return (<route.component {...props} routes={routes} />);
        };
    } else if (route.render) {
        routeProps.render = (props) => {
            const auth = authenticate(props);
            if (!auth.success) {
                return redirect(auth.redirect, props.location);
            }

            return (route.render({ ...props, routes }));
        };
    } else if (route.children) {
        routeProps.children = (props) => {
            const auth = authenticate(props);
            if (!auth.success) {
                return redirect(auth.redirect, props.location);
            }

            if (typeof route.children === "function") {
                return (route.children({ ...props, routes }));
            }

            return (<route.children {...props} routes={routes} />);
        };
    }

    return (<Route {...routeProps} />);
};