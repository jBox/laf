const ACTION_EXCEPTION_SYMBOL = "[PARALLEL_ACTION_EXCEPTION]";
const DISPATCH_EXCEPTION_SYMBOL = "[PARALLEL_DISPATCH_EXCEPTION]";

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
    throw new Error(`Compose parallel into Redux store first. e.g. 
const parallel = createParallel();
const store = createStore(reducers, compose(parallel, applyMiddleware(...middlewares)));
parallel.dispatch(...actions).then((preloadedState) => ());`);
}

const done = (getState, tasks = []) => {
    const p = tasks.length === 0 ?
        Promise.resolve() :
        Promise.all(tasks).then(() => Promise.resolve());

    return p.then(() => getState());
};

export const createParallel = () => {
    const parallel = (createStore) => (...args) => {
        const store = createStore(...args);
        const { dispatch, getState } = store;
        parallel.dispatch = (...actions) => {
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

    parallel.dispatch = INIT_ERROR;
    return parallel;
};

export default createParallel();
