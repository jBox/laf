"use strict";

const Path = require("path");
const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const cv = require("config-vars");

const cryptPwd = (password, salt) => {
    const saltPassword = `${password}:${salt}`;
    const md5 = crypto.createHash("md5");
    return md5.update(saltPassword).digest("hex");
}

const user = {
    id: "8aaf75bd-2c38-437f-bdc3-9daf86324eea",
    username: "admin",
    password: "75c815a0b5892258f58139f3f12c862b", //123456
    salt: "RLkC8HNV9azB9XFsYZW5DnKdAqbVz2vS"
}

const router = express.Router();

/* POST /oauth/token */
router.post("/token", (req, res, next) => {
    /**
     * {
            access_token: access_token,
            token_type: "bearer",
            expires_in: 3600,
            refresh_token: refresh_token
        }
     */
    const { username, password } = req.body;
    if (username === user.username && user.password === cryptPwd(password, user.salt)) {
        return jwt.sign({ user_id: user.id }, cv.env.secret, { algorithm: "HS256", expiresIn: "1h" }, (err, token) => {
            if (err) {
                return next(err)
            }

            return res.send({
                access_token: token,
                token_type: "bearer",
                expires_in: 3600,
                refresh_token: "refresh_token"
            })
        })
    }

    next(new Error("Username or password incorrect."))
});

/* POST /oauth/refresh */
router.post("/refresh", (req, res, next) => {
});

/* POST /oauth/refresh */
router.post("/revoke", (req, res, next) => {
});

module.exports = router;