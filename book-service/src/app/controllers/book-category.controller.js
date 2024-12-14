const {responseHandler, errorResponseHandler} = require("../services/response.service");
const BookCategory = require("../models/book-category");
const mongoose = require('mongoose');

class BookCategoryController {
    // [GET] "/get-all"
    async getAll(req, res) {
        try {
            const result = await BookCategory
                                .find({})
                                .sort({ initDate: -1 });
            responseHandler(res, result);
        } catch (error) {
            errorResponseHandler(res, err);
        }
    }
    
    // [GET] "/get-total"
    async getTottal(req, res) {
        try {
            const result = await BookCategory.countDocuments();
            responseHandler(res, result);
        } catch (error) {
            errorResponseHandler(res, err);
        }
    }
    
    // [GET] "/get-count"
    /**
     * param {
     *  page: number
     *  limit: number
     * }
     * @param {*} req 
     * @param {*} res 
     */
    async getCount(req, res) {
        const {page, limit} = req.query;
        if(!page || page === 0) page = 1;
        if(!limit || limit === 0) limit = 1;
        const skip = (page - 1) * limit;
        try {
            const records = await BookCategory.find({})
                        .sort({ initDate: -1 })
                        .skip(skip)
                        .limit(limit);
            responseHandler(res, records);
        } catch (error) {
            errorResponseHandler(res, error);
        }
    }

    // [GET] "/get-by-ids"
    /**
     * param {
     *  ids: string[]
     * }
     * @param {*} req 
     * @param {*} res 
     */
    async getByIds(req, res) {
        const {ids} = req.query;
        const objectIdList = ids.map(id => mongoose.Types.ObjectId(id));
        try {
            const records = await BookCategory
                                .find({_id : { $in: objectIdList }})
                                .sort({ initDate: -1 });
            responseHandler(res, records);
        } catch (error) {
            errorResponseHandler(res, error);
        }
    }

    // [GET] "/get-by-name"
    /**
     * param {
     *  categoryName: string
     * }
     * @param {*} req 
     * @param {*} res 
     */
    async getByName(req, res) {
        const {categoryName} = req.query;
        if(!categoryName) {
            responseHandler(res, {});
            return;
        }
        try {
            const records = await BookCategory
                                .find({categoryName : { $regex: categoryName, $options: 'i' }})
                                .sort({ initDate: -1 });
            responseHandler(res, records);
        } catch (error) {
            errorResponseHandler(res, error);
        }
    }

}

module.exports = new BookCategoryController();