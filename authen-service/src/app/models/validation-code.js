const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ValidationCode = new Schema({
    email: { type: String , default: ''},
    code: { type: String, default: ''},
    initDate: { type: Date, default: new Date()},
})

module.exports = mongoose.model('ValidationCode', ValidationCode);