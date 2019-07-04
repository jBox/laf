const ContentType = require("content-type");

const getHeaders = (response) => {
    const headers = {};
    response.headers.forEach((value, name) => {
        headers[name] = value;
    });

    return headers;
};

const getContentType = module.exports.getContentType = (headers = {}) => {
    const keys = Object.keys(headers);
    for (let key of keys) {
        if (/^content-type$/ig.test(key)) {
            const contentType = ContentType.parse(headers[key]) || { type: "" };
            return contentType.type;
        }
    }

    return "";
};

const checkStatus = module.exports.checkStatus = (response) => {
    const headers = getHeaders(response);
    const contentType = getContentType(headers);
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    } else {
        const error = new Error(response.statusText);
        error.statusText = response.statusText;
        error.status = response.status;
        error.url = response.url;
        error.elapsed = response.elapsed;
        error.headers = headers;

        switch (contentType) {
            case "application/json":
                return response.json().then((json) => {
                    error.error = json;
                    return Promise.reject(error);
                });
            default:
                return response.text().then((text) => {
                    error.error = text;
                    return Promise.reject(error);
                });
        }
    }
};

module.exports.browserCheckStatus = (response) => {
    if (response.status === 302) {
        const headers = getHeaders(response);
        if (headers.location) {
            location.href = headers.location;
            return Promise.resolve(response);
        }
    }

    return checkStatus(response);
};

module.exports.format = (response) => {
    const headers = getHeaders(response);
    const mimeType = getContentType(headers);
    return {
        mimeType,
        status: response.status,
        statusText: response.statusText,
        elapsed: response.elapsed,
        headers,
        url: response.url
    }
};

module.exports.createBodyBuilder = (URLSearchParams) => (body, contentType) => {
    switch (contentType) {
        case "application/x-www-form-urlencoded":
            const form = body || {};
            return Object.keys(form).reduce((params, key) => {
                const items = form[key];
                if (Array.isArray(items)) {
                    for (let item of items) {
                        params.append(key, item);
                    }
                } else {
                    params.append(key, items);
                }
                return params;
            }, new URLSearchParams()).toString();
        case "application/json":
            try {
                return JSON.stringify(body);
            } catch (ex) {
                console.log(ex);
                return "";
            }
        default:
            return (body || "").toString();
    }
};