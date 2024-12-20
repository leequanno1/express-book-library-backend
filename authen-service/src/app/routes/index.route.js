const authenRoute = require("./authen.route");
const mailRoute = require("./mail.route");
const express = require('express');

function route(app) {
    app.use("/v3",authenRoute);
    app.use("/mail", mailRoute);
    app.use('/public', express.static('public/images'));
}

module.exports = route;