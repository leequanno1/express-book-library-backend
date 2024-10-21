const booksRoute = require("./book.route");
const booksCommandRoute = require("./book-command.route")

function route(app) {
    app.use("/books", booksRoute);
    app.use("/books-command", booksCommandRoute);
}

module.exports = route;