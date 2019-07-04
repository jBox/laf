const getenv = require("getenv");
const isFunction = (fn) => typeof fn === "function";
const isObject = (obj) => obj && typeof obj === "object";

const gb = global;
if (!gb.__jx_config_vars__) {
    gb.__jx_config_vars__ = {};
}

const vars = gb.__jx_config_vars__;

const extendVars = (configurations) => {
    const keys = Object.keys(configurations);
    for (let key of keys) {
        vars[key] = configurations[key];
    }
};

module.exports = {
    setup(init) {
        let configurations = {};
        if (isFunction(init)) {
            configurations = init(getenv);
        } else if (isObject(init)) {
            configurations = init;
        }

        extendVars(configurations);
        return this;
    },
    get env() {
        return { ...vars };
    }
};