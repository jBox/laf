"use strict";

const requireDefault = (obj) => obj && obj.__esModule ? obj.default : obj;

const Path = require("path");
const chaos = requireDefault(require("chaos-magician"));
const routes = requireDefault(require("admplate/lib/routes"));
const middlewares = requireDefault(require("admplate/lib/redux/middleware"));
const reducers = requireDefault(require("admplate/lib/redux/reducers"));

const express = require("express");
const router = express.Router();
const cv = require("config-vars");
const foundation = require("./foundation");

const apiBaseUrl = "cv.env.inExternalHost";

/* GET pages. */
router.get("/:rest*?", async (req, res, next) => {
    const { originalUrl } = req;
    const routerContext = {};
    const preloadedState = {
        settings: { apiBaseUrl, ...req.foundation }
    };
    const magician = chaos(routes, reducers, middlewares);
    const comp = await magician.serverRender({ url: originalUrl, routerContext, preloadedState });
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

module.exports = router;