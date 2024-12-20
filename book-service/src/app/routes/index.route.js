const express = require('express');
const booksRoute = require("./book.route");
const booksCommandRoute = require("./book-command.route");
const { libraryanValidation } = require("../middle-ware/libraryan-validation-middle-ware")
const bookCategoryRoute = require("./book-category.route");
const bookCategoryCommandRoute = require("./book-category-command.route");
const bookCopyRoute = require("./book-copy.route");
const bookCopyCommandRoute = require("./book-copy-command.route");
const favoriteRoute = require("./favorite.route");

function route(app) {
    app.use("/books", booksRoute);
    app.use("/books-command", libraryanValidation, booksCommandRoute);
    app.use("/book-categories", bookCategoryRoute);
    app.use("/book-categories-command", libraryanValidation, bookCategoryCommandRoute);
    app.use("/book-copy", bookCopyRoute);
    app.use("/book-copy-command", libraryanValidation, bookCopyCommandRoute);
    app.use("/favorite", favoriteRoute)
    app.use('/public', express.static('public/images'));
}

module.exports = route;