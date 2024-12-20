const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Favorite = new Schema({
    username: {type: String, default: ""},
    book: {type: Object, default: {
        title: undefined,
        author: undefined,
        publisher: undefined,
        year: undefined,
        categorys: undefined,
        totalCopies: undefined,
        description: undefined,
        updatedAt: undefined,
        imageUrl: undefined,
        initDate: undefined,
        delFlg: undefined
    }},
    initDate: {type: Date, default: new Date()},
    delFlg: { type: Boolean, default: false }
}) 

module.exports = mongoose.model("Favorite",Favorite);