const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { BookStatuses } = require("./enums/book-status");

const BookCopy = new Schema({
    bookId : {type: String ,default: ""},
    status: {type: Number, default: BookStatuses.NOT_AVAILABLE},
    location: { type: String, default: "" },
    updatedAt : { type: Date, default: new Date() },
    initDate : { type: Date, default: new Date() },
    delFlg : { type: Boolean, default: false },
}) 

module.exports = mongoose.model("BookCopy",BookCopy);