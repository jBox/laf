import React from "react";
import warning from "./utils/warning";
import parseUrl from "./utils/parseUrl";
import matchRoutes from "./matchRoutes";
import createReduxStore, {createReduxParallel} from "./createReduxStore";
import createRouterComponent from "./createRouterComponent";
import ReactDOM from "react-dom";
import { renderToString } from "react-dom/server";
import { createParallel } from "redux-parallel";

const universe = typeof window !== "undefined" ? window : global;

const getInitials = () => {
    return {
        initialState: universe.__INITIAL_STATE__
    }
};

const setInitials = (initialState) => {
    return {
        __INITIAL_STATE__: initialState
    }
};

export default (routes, rootReducer, middlewares) => {
    const render = () => {
        universe.SERVER_RENDER = false;
        if (typeof location === "undefined" || typeof document === "undefined") {
            warning("Using `serverRender` instead of `render` on server end.");
        }

        const { initialState } = getInitials();
        const parallel = createParallel();
        const store = createReduxStore(rootReducer, initialState, middlewares, parallel);
        for (const route of routes) {
            const id = route.id;
            const element = document.getElementById(id);
            if (element) {
                const url = parseUrl(location.href);
                const Comp = createRouterComponent({
                    url,
                    routes: route.routes,
                    store,
                    parallel,
                    initialState
                });
                ReactDOM.hydrate(<Comp />, element);
            }
        }
    };

    const serverRender = ({ url, routerContext = {}, request, preloadedState = {} } = {
        routerContext: {}, preloadedState: {}
    }) => {
        universe.SERVER_RENDER = true;
        if (!url) {
            warning("Parameter `url` cannot be null or empty.");
        }

        url = parseUrl(url);
        const { pathname } = url;
        const targets = matchRoutes(pathname, routes);
        const initialActions = targets.reduce((actions, route) => {
            let initializers = route.initializer;
            if (!Array.isArray(initializers)) {
                initializers = [initializers];
            }

            for (const initializer of initializers) {
                if (typeof initializer === "function") {
                    const preInitialized = initializer(url);
                    if (preInitialized) {
                        actions.push(preInitialized);
                    }
                } else if (initializer) {
                    actions.push(initializer);
                }
            }

            return actions;
        }, []);

        const renderComponentsToString = (routes, options) => {
            const components = {};
            for (const route of routes) {
                const id = route.id;
                try {
                    const RouterComponent = createRouterComponent({ ...options, routes: route.routes });
                    components[id] = renderToString(<RouterComponent />);
                } catch (error) {
                    components[id] = `<div class="error">${error.toString()}</div>`;
                    console.error(error);
                }
            }

            return {
                components,
                initials: setInitials(options.store.getState())
            };
        };

        const parallel = createReduxParallel(rootReducer, middlewares);
        return parallel.dispatch(...initialActions).then((initialState) => {
            const store = createReduxStore(
                rootReducer,
                { ...initialState, ...preloadedState },
                middlewares,
                parallel);
            return renderComponentsToString(routes, {
                url,
                request,
                routerContext,
                parallel,
                store
            });
        });
    };

    return { render, serverRender }
}