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
     *   bookIds: string[]
     * }
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async removeFavorite(req, res) {
        let username = req.body.username;
        let bookIds = req.body.bookIds
        if(!username || !bookIds || bookIds.length === 0) {
            return errorResponseHandler(res, "Missing required fields");
        }
        bookIds = bookIds.map(id => mongoose.Types.ObjectId(id));
        let favorite = await Favorite.findOneAndDelete({
            username: username,
            "book._id": {  $in: bookIds }
        });
        if(!favorite) {
            return errorResponseHandler(res, "Favorite not found");
        }
        return responseHandler(res, favorite);
    }

    // [POST] "/favorite/post-get-favorites"
    /**
     * body {
     *  username: string
     *  page: number,
     *  limit: number,
     * }
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async getFavorites(req, res) {
        let { username, page, limit } = req.body;
        if(!page || page < 1) page = 1;
        if(!limit || limit < 1) limit = 1;
        const skip = (page - 1) * limit;
        if(!username) {
            return errorResponseHandler(res, "Missing required fields");
        }
        let favorites = await Favorite.find({
            username: username,
            delFlg: false
        })
        .skip(skip)
        .limit(limit)
        .sort({initDate: -1});
        return responseHandler(res, favorites);
    }
}

module.exports = new FavoriteController();