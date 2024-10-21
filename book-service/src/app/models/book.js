const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Book = new Schema({
    title: {type: String, default: "unknow"},
    author: {type: String, default: "unknow"},
    publisher: {type: String, default: "unknow"},
    genre: {type: Array},
    description: {type: String},
    price: {type: Number, default: 0},
    previous_price: {type: Number, default: 0},
    image_url: {type: Array, default: []}
}) 

module.exports = mongoose.model("Book",Book);