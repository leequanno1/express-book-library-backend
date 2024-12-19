const authenRoute = require("./authen.route");
const express = require('express');

function route(app) {
    app.use("/v3",authenRoute);
    app.use('/public', express.static('public/images'));
}

module.exports = route;