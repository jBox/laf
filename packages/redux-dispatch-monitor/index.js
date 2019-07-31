const ACTION_EXCEPTION_SYMBOL = "[SYNC_ACTION_EXCEPTION]";
const DISPATCH_EXCEPTION_SYMBOL = "[SYNC_DISPATCH_EXCEPTION]";

const isUndefined = (obj) => typeof obj === "undefined";
const isFunction = (fn) => fn && typeof fn === "function";
const isPromise = (p) => (p && isFunction(p.then));

if (isUndefined(console)) {
    console = {};
}

if (!isFunction(console.error)) {
    console.error = (error) => (error);
}

const INIT_ERROR = () => {
    throw new Error(`Compose monitor into Redux store first. e.g. 
const monitor = createMonitor();
const store = createStore(reducers, compose(monitor, applyMiddleware(...middlewares)));
monitor.dispatch(...actions).then((preloadedState) => ());`);
}

const done = (getState, tasks = []) => {
    const p = tasks.length === 0 ?
        Promise.resolve() :
        Promise.all(tasks).then(() => Promise.resolve());

    return p.then(() => getState());
};

export const createMonitor = () => {
    const monitor = (createStore) => (...args) => {
        const store = createStore(...args);
        const { dispatch, getState } = store;
        monitor.dispatch = (...actions) => {
            const tasks = actions.reduce((res, action) => {
                try {
                    const result = dispatch(action);
                    if (isPromise(result)) {
                        res.push(result.catch((error) => {
                            console.error(ACTION_EXCEPTION_SYMBOL, error);
                            return Promise.resolve();
                        }));
                    } else {
                        res.push(Promise.resolve(result));
                    }
                } catch (exception) {
                    console.error(DISPATCH_EXCEPTION_SYMBOL, exception)
                }

                return res;
            }, []);

            return done(getState, tasks);
        };

        return store;
    };

    monitor.dispatch = INIT_ERROR;
    return monitor;
};

export default createMonitor();
