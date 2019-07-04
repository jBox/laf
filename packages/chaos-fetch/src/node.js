const realFetch = require("node-fetch");
const { URLSearchParams } = require("url");
const common = require("./common");
const isObject = require("lodash/isObject");

const fetch = (url, options) => {
  const env = process.env;
  const host = env.HOST_NAME || "localhost";
  const port = env.PORT || 3795;

  // Support schemaless URIs on the server for parity with the browser.
  // Ex: //github.com/ -> https://github.com/
  if (/^\/\//.test(url)) {
    url = "https:" + url;
  } else if (/^\/[^\/]+/.test(url)) {
    url = `http://${host}:${port}${url}`;
  }

  return realFetch.call({}, url, options);
};

fetch.fetch = fetch;
fetch.Response = realFetch.Response;
fetch.Headers = realFetch.Headers;
fetch.Request = realFetch.Request;
fetch.polyfill = true;

if (!global.fetch) {
  global.fetch = fetch;
  global.Response = fetch.Response;
  global.Headers = fetch.Headers;
  global.Request = fetch.Request;
}

const createBody = common.createBodyBuilder(URLSearchParams);

module.exports = (url, options = {}) => {
  const formatted = { method: "GET", headers: {}, ...options };
  if (/^p(os|u)t$/ig.test(formatted.method)) {
    if (isObject(formatted.headers)) {
      const contentType = common.getContentType(formatted.headers);
      formatted.body = createBody(formatted.body, contentType);
    }
  } else {
    delete formatted.body;
  }

  const startTime = Date.now();
  return fetch(url, formatted).then((res) => {
    res.elapsed = Date.now() - startTime;
    return res;
  }).then(common.checkStatus).then((response) => {
    const res = common.format(response);
    switch (res.mimeType) {
      case "application/pdf":
        return response.buffer().then((buffer) => ({ ...res, data: buffer }));
      case "application/json":
        return response.json().then((json) => ({ ...res, data: json }));
      default:
        return response.text().then((text) => ({ ...res, data: text }));
    }
  });
};