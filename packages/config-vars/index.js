const getenv = require("getenv");
const isFunction = (fn) => typeof fn === "function";
const isObject = (obj) => obj && typeof obj === "object";

if (!global.__config_vars_) {
    global.__config_vars_ = {};
}

const vars = global.__config_vars_;

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