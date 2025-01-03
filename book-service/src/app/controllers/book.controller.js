const Book = require("../models/book");
const ResponseService = require("../services/response.service");
const mongoose = require('mongoose');
const resHandler = ResponseService.responseHandler;
const errorHandler = ResponseService.errorResponseHandler;

class BookController {
  // [GET] /books/getall
  async getAll(req, res) {
    try {
      const books = await Book.find({ delFlg: false }).sort({ initDate: -1 });
      resHandler(res, books);
    } catch (error) {
      errorHandler(res, error);
    }
  }

  // [GET] /books/get_count
  /**
   * 
   * @param {*} req
   * @param {*} res
   */
  async getCount(req, res) {
    try {
      const books = await Book.find({ delFlg: false })
        .sort({ initDate: -1 })
      resHandler(res, books);
    } catch (error) {
      errorHandler(res, error);
    }
  }

  // [GET] /books/total
  async getTotal(req, res) {
    try {
      const total = await Book.countDocuments({ delFlg: false });
      resHandler(res, { total: total });
    } catch (error) {
      errorHandler(res, error);
    }
  }

  // [POST] /books/post-get-by-id
  /**
   * body {
   *    ids: string[]
   * }
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async getByIds(req, res) {
    const { ids } = req.body;
    if (!ids || ids.length === 0) {
      resHandler(res, {});
      return;
    }
    const objectIdList = ids.map((id) => new mongoose.Types.ObjectId(id));
    try {
      const books = await Book.find({
        _id: { $in: objectIdList },
        delFlg: false,
      }).sort({ initDate: -1 });
      resHandler(res, books);
    } catch (error) {
      errorHandler(res, error);
    }
  }

  // [GET] /get-by-title
  /**
   * parma {
   *    title : string
   * }
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async getByTitle(req, res) {
    const { title } = req.query;
    if (!title || title === "") {
      resHandler(res, {});
      return;
    }
    try {
      const books = await Book.find({
        title: { $regex: ".*" + title + ".*" },
        delFlg: false,
      }).sort({ initDate: -1 });
      resHandler(res, books);
    } catch (error) {
      errorHandler(res, error);
    }
  }

  // [POST] /post-get-by-category-ids
  /**
   * body {
   *    categoryIds: string[]
   * }
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async getByCategoryIds(req, res) {
    let { categoryIds } = req.body;
    if (!categoryIds || categoryIds.length == 0) {
      resHandler(res, {});
      return;
    }
    try {
      const objectIdCategoryIds = categoryIds.map(id => new mongoose.Types.ObjectId(id));
      const records = await Book.find({
        categorys: {
            $elemMatch: {
                _id: { $in: objectIdCategoryIds },
            },
        },
        delFlg: false
    });
      resHandler(res, records);
    } catch (error) {
      errorHandler(res, error);
    }
  }
}

module.exports = new BookController();
