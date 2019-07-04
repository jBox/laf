const cv = require("config-vars");

const version = require("../package").version;

module.exports = cv.setup((getenv) => ({
    version,
    port: getenv("PORT", 3799),
    host: getenv("HOST", "localhost")
}));