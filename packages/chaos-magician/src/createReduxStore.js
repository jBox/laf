import { createStore, compose, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { createParallel } from "redux-parallel";

const PROD = (process.env.NODE_ENV === "production");
export default (rootReducer, initialState, middlewares, parallel) => {
    let enhancer = null;
    if (SERVER_RENDER || PROD) {
        enhancer = compose(parallel, applyMiddleware(...middlewares));
    } else {
        middlewares = middlewares.concat([createLogger()]);
        if (window.devToolsExtension) {
            enhancer = compose(parallel, applyMiddleware(...middlewares), window.devToolsExtension());
        } else {
            enhancer = compose(parallel, applyMiddleware(...middlewares));
        }
    }

    return createStore(rootReducer, initialState, enhancer);
};

export const createReduxParallel = (rootReducer, middlewares) => {
    const parallel = createParallel();
    let enhancer = null;
    if (SERVER_RENDER || PROD) {
        enhancer = compose(parallel, applyMiddleware(...middlewares));
    } else {
        middlewares = middlewares.concat([createLogger()]);
        if (window.devToolsExtension) {
            enhancer = compose(parallel, applyMiddleware(...middlewares), window.devToolsExtension());
        } else {
            enhancer = compose(parallel, applyMiddleware(...middlewares));
        }
    }

    createStore(rootReducer, undefined, enhancer);
    return parallel
};
