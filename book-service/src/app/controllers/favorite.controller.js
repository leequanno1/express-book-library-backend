const { responseHandler, errorResponseHandler } = require("../services/response.service");
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
        if (!username || !bookId) {
            return errorResponseHandler(res, "Missing required fields");
        }
        let book = await Book.findById(bookId);
        if (!book) {
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
        if (!username || !bookIds || bookIds.length === 0) {
            return errorResponseHandler(res, "Missing required fields");
        }
        bookIds = bookIds.map(id => new mongoose.Types.ObjectId(id));
        let favorite = await Favorite.deleteMany({
            username: username,
            "book._id": { $in: bookIds }
        });
        if (!favorite) {
            return errorResponseHandler(res, "Favorite not found");
        }
        return responseHandler(res, favorite);
    }

    // [POST] "/favorite/post-get-favorites"
    /**
     * body {
     *  username: string
     * }
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async getFavorites(req, res) {
        let { username } = req.body;
        if (!username) {
            return errorResponseHandler(res, "Missing required fields");
        }
        let favorites = await Favorite.find({
            username: username,
            delFlg: false
        })
            .sort({ initDate: -1 });
        return responseHandler(res, favorites);
    }

    // [POST] "/favorite/post-check-favorite"
    /**
     * body: {
     *   username: string,
     *   bookId: string
     * }
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async checkFavorite(req, res) {
        let { username, bookId } = req.body;

        if (!username || !bookId) {
            return errorResponseHandler(res, "Missing required fields");
        }

        let favoriteExists = await Favorite.findOne({
            username: username,
            "book._id": new mongoose.Types.ObjectId(bookId),
            delFlg: false
        });

        return responseHandler(res, { exists: !!favoriteExists });
    }

}

module.exports = new FavoriteController();