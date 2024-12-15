const express = require('express');
const loansRoute = require("./loan.route");
const loansForUserRoute = require("./loan-for-user.route");
const loansCommandRoute = require("./loan-command.route");
const { libraryanValidation } = require("../middle-ware/libraryan-validation-middle-ware");
const { validatorHandler } = require("../middle-ware/validation-middle-ware");

function route(app) {
    app.use("/loans", libraryanValidation, loansRoute);
    app.use("/loans-for-user", validatorHandler, loansForUserRoute)
    app.use("/loans-command", libraryanValidation, loansCommandRoute)
}

module.exports = route;