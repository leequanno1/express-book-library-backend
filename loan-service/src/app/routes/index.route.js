const express = require('express');
const loansRoute = require("./loan.route");
const { libraryanValidation } = require("../middle-ware/libraryan-validation-middle-ware")

function route(app) {
    app.use("/loans", loansRoute);
}

module.exports = route;