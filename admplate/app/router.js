"use strict";

const requireDefault = (obj) => obj && obj.__esModule ? obj.default: obj;

const Path = require("path");
const chaos = requireDefault(require("chaos-magician"));
const routes = requireDefault(require("../lib/routes"));
const middlewares = requireDefault(require("../lib/redux/middleware"));
const reducers = requireDefault(require("../lib/redux/reducers"));

const express = require("express");
const router = express.Router();
const cv = require("config-vars");
const foundation = require("./foundation");

const apiBaseUrl = "cv.env.jx.inExternalHost";

/* GET pages. */
router.get("/:rest*?", (req, res, next) => {
    const { originalUrl } = req;
    const routerContext = {};
    const preloadedState = {
        settings: { apiBaseUrl, ...req.foundation }
    };
    const magician = chaos(routes, reducers, middlewares);
    magician.serverRender({ url: originalUrl, routerContext, preloadedState }).done((comp) => {
        if (routerContext.url) {
            return res.redirect(routerContext.url);
        }

        const models = {
            title: "Admplate",
            apiBaseUrl,
            initialState: JSON.stringify(comp.initials.__INITIAL_STATE__).replace(/</g, "\\x3c"),
            ...comp.components
        };

        // Send the rendered page back to the client
        res.render("index", { models });
    });
});

module.exports = router;