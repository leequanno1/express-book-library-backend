const express = require('express');
const booksRoute = require("./book.route");
const booksCommandRoute = require("./book-command.route");
const validatorAdminHandler = require("../services/response.service").validatorAdminHandler;

function route(app) {
    app.use("/books", booksRoute);
    app.use("/books-command", validatorAdminHandler , booksCommandRoute);
    app.use('/public', express.static('public/images'));
}

module.exports = route;