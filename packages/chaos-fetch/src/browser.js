import { format } from "util";

require("whatwg-fetch");
require("./URLSearchParams");
const isObject = require("lodash/isObject");
const common = require("./common");

const createBody = common.createBodyBuilder(URLSearchParams);

module.exports = (url, options = {}) => {
    const formatted = { redirect: "manual", method: "GET", headers: {}, ...options };
    const redirectBaseUrl = formatted.redirectBaseUrl || "/login";
    delete formatted.redirectBaseUrl;
    if (/^p(os|u)t$/ig.test(formatted.method) && isObject(formatted.headers)) {
        const contentType = common.getContentType(formatted.headers);
        formatted.body = createBody(formatted.body, contentType);
    } else {
        delete formatted.body;
    }


    formatted.headers["X-Requested-With"] = "XMLHttpRequest";
    const startTime = Date.now();
    return fetch(url, formatted).then((res) => {
        if (res.status === 401 && res.url.startsWith(location.origin)) {
            const returnUrl = encodeURIComponent(location.pathname + location.search);
            location.href = `${redirectBaseUrl}?returnUrl=${returnUrl}`;
        }

        res.elapsed = Date.now() - startTime;
        return res;
    }).then(common.browserCheckStatus).then((response) => {
        const res = common.format(response);
        switch (res.mimeType) {
            case "application/pdf":
                return response.blob().then((blob) => ({ ...res, data: blob }));
            case "application/json":
                return response.json().then((json) => ({ ...res, data: json }));
            default:
                return response.text().then((text) => ({ ...res, data: text }));
        }
    });
};
