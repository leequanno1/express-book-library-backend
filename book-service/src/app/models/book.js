const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Book = new Schema({
    title: {type: String, default: "unknow"},
    author: {type: String, default: "unknow"},
    publisher: {type: String, default: "unknow"},
    year: {type: Number, default: 0},
    categorys: {type: Array},
    totalCopies: {type: Number, default: 0},
    description: {type: String},
    updatedAt: {type: Date, default: new Date()},
    imageUrl: {type: Array, default: []},
    initDate: {type: Date, default: new Date()},
    delFlg: { type: Boolean, default: false }
}) 

module.exports = mongoose.model("Book",Book);