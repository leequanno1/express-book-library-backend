const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookCategory = new Schema({
    categoryName: { type: String, default: "" },
    initDate: { type: Date, default: new Date() },
    delFlg: { type: Boolean, default: false },
}) 

module.exports = mongoose.model("BookCategory",BookCategory);