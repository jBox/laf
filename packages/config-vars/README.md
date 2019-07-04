``` js
const cv = require("@jx/config-vars");

cv.setup((getenv /* getenv */) => ({
    port: getenv("PORT")
}));

const port = cv.env.port;
```