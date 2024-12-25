const {
  responseHandler,
  errorResponseHandler,
} = require("../services/response.service");
const mongoose = require("mongoose");
const BookCopy = require("../models/book-copy");
const { BookStatuses } = require("../models/enums/book-status");

class BookCopyCommandController {
  // [POST] "/book-copy-command/post-borrow"
  /**
   * param {
   *    copyId: string
   * }
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  async borrowCopy(req, res) {
    const { copyId } = req.body;
    if (!copyId) {
      responseHandler(res, {});
      return;
    }
    try {
      const record = await BookCopy.findById(copyId);
      if (!record) {
        responseHandler(res, {});
        return;
      }
      record.status = BookStatuses.BORROWED;
      record.updatedAt = new Date();
      await record.save();
      responseHandler(res, record);
    } catch (error) {
      errorResponseHandler(res, error);
    }
  }

  // [POST] "/book-copy-command/post-return"
  /**
   * param {
   *    copyId: string
   * }
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  async returnCopy(req, res) {
    const { copyId } = req.body;
    if (!copyId) {
      responseHandler(res, {});
      return;
    }
    try {
      const record = await BookCopy.findById(copyId);
      if (!record) {
        responseHandler(res, {});
        return;
      }
      record.status = BookStatuses.AVAILABLE;
      record.updatedAt = new Date();
      await record.save();
      responseHandler(res, record);
    } catch (error) {
      errorResponseHandler(res, error);
    }
  }
}

module.exports = new BookCopyCommandController();
