const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { UserRoles } = require("./enums/user-role")

const User = new Schema({
    username: {type: String, minLength: 6},
    password: {type: String, minLength: 6},
    email: {type: String},
    fullname: {type: String, default: ''},
    phoneNumber: {type: String, default: ""},
    roleId: {type: Number, default: UserRoles.READER},
    updatedAt: {type: Date, default: new Date()},
    isActivated : {type: Boolean, default: false},
    initDate: {type: Date, default: new Date()},
    delFlg: {type: Boolean, default: false},
})

module.exports = mongoose.model('User', User);