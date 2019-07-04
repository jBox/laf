const fs = require("fs-extra");
const manifestFactory = require("./manifest");
const isDevelopment = process.env.NODE_ENV === "development";

const fsOptions = { encoding: "utf8" };
const htmls = {};

const retrieveHtml = isDevelopment ?
    (path) => fs.readFile(path, fsOptions) :
    (path) => {
        if (htmls[path]) {
            return Promise.resolve(htmls[path]);
        }

        return fs.readFile(path, fsOptions).then((data) => {
            return htmls[path] = data;
        });
    };

const translate = (models) => (token) => {
    if (!models || typeof models !== "object") {
        return null;
    }

    const tokens = token.split(".");
    if (tokens.length === 1) {
        return models[token];
    }

    const [piece, ...rest] = tokens;
    return translate(models[piece])(rest.join("."));
};

/**
 * @param {string}   file
 * @param {object}   opts
 * @param {function} cb
 */
module.exports = (file, opts, cb) => {
    const tasks = [
        Promise.resolve(translate(opts.models)),
        manifestFactory(opts.settings.manifest),
        retrieveHtml(file)
    ];
    Promise.all(tasks).then(([models, manifest, html]) => {
        const markup = html.replace(/{{[\w\.-]+}}/ig, (m) => {
            const token = m.substr(2, m.length - 4);

            if (/.*?\.(js|css)$/ig.test(token)) {
                return manifest(token);
            }

            return models(token);
        });

        cb(null, markup);
    }).catch((error) => cb(error));
};