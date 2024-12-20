const {responseHandler, errorResponseHandler} = require("../services/response.service");
const mongoose = require('mongoose');
const Favorite = require("../models/favorite");
const Book = require("../models/book");

class FavoriteController {
    // [POST] "/favorite/post-set-as-favorite"
    /**
     * body: {
     *   username: string,
     *   bookId: string
     * }
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async setAsFavorite(req, res) {
        let username = req.body.username;
        let bookId = req.body.bookId
        if(!username || !bookId) {
            return errorResponseHandler(res, "Missing required fields");
        }
        let book = await Book.findById(bookId);
        if(!book) {
            return errorResponseHandler(res, "Book not found");
        }
        let favorite = await Favorite.create({
            username: username,
            book: book,
            initDate: new Date(),
            delFlg: false
        });
        return responseHandler(res, favorite);
    }

    // [POST] "/favorite/post-remove-favorite"
    /**
     * body: {
     *   username: string,
     *   bookId: string
     * }
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async removeFavorite(req, res) {
        let username = req.body.username;
        let bookId = req.body.bookId
        if(!username || !bookId) {
            return errorResponseHandler(res, "Missing required fields");
        }
        let favorite = await Favorite.findOneAndDelete({
            username: username,
            "book._id": mongoose.Types.ObjectId(bookId)
        });
        if(!favorite) {
            return errorResponseHandler(res, "Favorite not found");
        }
        return responseHandler(res, favorite);
    }
}

module.exports = new FavoriteController();