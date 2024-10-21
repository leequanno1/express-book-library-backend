const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Account = new Schema({
    email: {type: String},
    username: {type: String, minLength: 6},
    password: {type: String, minLength: 6},
    fullname: {type: String, default: ''},
    createdAt: {type: Date, default: Date.now},
    role: {type: String, default: "user"},
})

module.exports = mongoose.model('Account', Account);