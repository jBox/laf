const fs = require("fs-extra");
const global_assets = {};

const readManifest = (manifestFile) => {
    if (!manifestFile) {
        return Promise.resolve({});
    }

    const assets = global_assets[manifestFile];
    if (assets) {
        return Promise.resolve(assets);
    }

    return fs.readFile(manifestFile, { encoding: "utf8" }).then((data) => {
        if (data) {
            return global_assets[manifestFile] = JSON.parse(data);
        }

        return global_assets[manifestFile] = {};
    }).catch(() => Promise.resolve({}));
};

module.exports = (manifestFile) => {
    return readManifest(manifestFile)
        .then((manifest) => (path) => (manifest[path] || path))
        .catch(() => Promise.resolve((path) => path));
};