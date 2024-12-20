const {responseHandler, errorResponseHandler} = require("../services/response.service");
const mongoose = require('mongoose');
const BookCopy = require("../models/book-copy");
const Book = require("../models/book");

class BookCopyController {
    
    // [GET] /book-copy/get-total
    async getTotal (req, res) {
        try {
            const records = await BookCopy.countDocuments({delFlg: false});
            responseHandler(res, {total: records});
        } catch (error) {
            errorResponseHandler(res, error);
        }
    }
    
    // [POST] /book-copy/get-copy-ids
    /**
     * body {
     *  ids: stirng[]
     * }
     * @param {*} req 
     * @param {*} res 
     */
    async getCopyIds (req, res) {
        const { ids } = req.body;
        if(!ids || ids.length === 0) {
            responseHandler(res, {});
            return;
        }
        try {
            const objectIds = ids.map(id => new mongoose.Types.ObjectId(id));
            const records = await BookCopy.find({_id : {$in : objectIds}, delFlg: false});
            responseHandler(res, records);
        } catch (error) {
            errorResponseHandler(res, error);
        }
    }
    
    // [GET] /book-copy/get-available-total
    /**
     * param {
     *  bookId : string
     * }
     * @param {*} req 
     * @param {*} res 
     */
    async getAvailableTotal (req, res) {
        const { bookId } = req.query;
        if( !bookId || bookId === "" ) {
            responseHandler(res, {});
            return;
        }
        try {
            const objectId = new mongoose.Types.ObjectId(bookId);
            const record = await BookCopy.countDocuments({bookId: objectId, delFlg: false});
            responseHandler(res, {total: record});
        } catch (error) {
            errorResponseHandler(res, error);
        }
    }

    // [GET] /book-copy/get-copy-info
    /**
     * param {
     *  copyId: string
     * }
     * @param {*} req 
     * @param {*} res 
     */
    async getCopyInfo (req, res) {
        const { copyId } = req.query;
        if( !copyId || copyId === "" ) {
            responseHandler(res, {});
            return;
        }
        try {
            const objectId = new mongoose.Types.ObjectId(copyId);
            const copyRecord = await BookCopy.findById(objectId);
            if(!copyRecord) {
                responseHandler(res, {});
                return;
            }
            const bookId = copyRecord.bookId;
            const bookRecord = await Book.findById(bookId);
            const result = {
                _id: copyRecord._id,
                bookId: bookRecord._id,
                title: bookRecord.title,
                author: bookRecord.author,
                year: bookRecord.year,
                categorys: bookRecord.categorys,
                totalCopies: bookRecord.totalCopies,
                description: bookRecord.description,
                imageUrl: bookRecord.imageUrl,
                initDate: bookRecord.initDate,
                delFlg: copyRecord.delFlg,
                status: copyRecord.status,
                location: copyRecord.location,
                updatedAt: copyRecord.updatedAt,
            }
            responseHandler(res, result);
        } catch (error) {
            errorResponseHandler(res, error);
        }
    }
}

module.exports = new BookCopyController();