"use strict";

const express = require("express");
const Path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cv = require("config-vars");

const viewEngine = require("./engines/html");
const router = require("./router");

const app = express();
const ROOT = Path.resolve(__dirname, "../");
const VIEWS = Path.resolve(__dirname, "views");
const ASSETS = Path.relative(ROOT, "admplate/static")

// sets react rendering engine
app.engine("html", viewEngine);
app.set("views", VIEWS);
app.set("manifest", Path.resolve(ASSETS, "dist/manifest.json"));
app.set("view engine", "html");

// uncomment after placing your favicon in /public
app.use(favicon(Path.resolve(ASSETS, "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// streams static files
app.use("/static", express.static(ASSETS));

// setup router
app.use(router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    res.render("404");
});

// error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.render("error");
});

module.exports = app;