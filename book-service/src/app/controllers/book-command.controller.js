const Book = require("../models/book");
const responseService = require("../services/response.service");
const resHandler = responseService.responseHandler;
const errResponseHandler = responseService.errorResponseHandler;
const fileToFileName =
  require("../services/image-uploader.service").fileToFileName;
const BookCategory = require("../models/book-category");
const BookCopy = require("../models/book-copy");
const mongoose = require('mongoose');
const { BookStatuses } = require("../models/enums/book-status");

class BookCommandController {
  // [PUT] /books-command/update
  /**
   * body {
   *  id,
   *  title,
   *  author,
   *  publisher,
   *  year, 
   *  categoryIds, 
   *  totalCopies,
   *  description,
   *  imageFile,
   *  imageUrl,
   * }
   * @param {*} req 
   * @param {*} res 
   */
  async updateBook(req, res) {
    const reqBody = req.body;
    const fileNames = fileToFileName(req.files);
    const objectIdList = reqBody.categoryIds.map(id => mongoose.Types.ObjectId(id));
    try {
      const data = {
        _id : reqBody.id,
        title : reqBody.title,
        author : reqBody.author,
        publisher : reqBody.publisher,
        year : reqBody.year, 
        categorys : await BookCategory.find({ _id: { $in: objectIdList } }), 
        totalCopies : reqBody.totalCopies,
        description : reqBody.description,
        imageUrl : (!fileNames || fileNames.length == 0)? [reqBody.imageUrl] : fileNames,
        updatedAt : new Date(),
      }
      var book = await Book.findById(data.id,);
      book = {
        ...book,
        ...data,
      }
      const result = await Book.findByIdAndUpdate(data._id, book, {
        new: true
      });
      resHandler(res, result);
    } catch (error) {
      errResponseHandler(res, err); 
    }
  }

  // [PUT] /books-command/create
  /**
   * body {
   *  title,
   *  author,
   *  publisher,
   *  year, 
   *  categoryIds, 
   *  totalCopies,
   *  description,
   *  imageFile
   * }
   * @param {*} req 
   * @param {*} res 
   */
  async createBook(req, res) {
    const reqBody = req.body;
    const fileNames = fileToFileName(req.files);
    const objectIdList = reqBody.categoryIds.map(id => mongoose.Types.ObjectId(id));
    try {
      const data = {
        title : reqBody.title,
        author : reqBody.author,
        publisher : reqBody.publisher,
        year : reqBody.year, 
        categorys : await BookCategory.find({ _id: { $in: objectIdList }, delFlg : false }), 
        totalCopies : reqBody.totalCopies,
        description : reqBody.description,
        imageUrl : (!fileNames)? [] : fileNames,
        updatedAt : new Date(),
        initDate : new Date(),
        delFlg : false,
      };
      const newBook = new Book(data);
      const result = await newBook.save();
      let bookCopys = [];
      for (let i = 0; i < newBook.totalCopies; i++) {
        bookCopys.append({
          bookId: newBook._id,
          status: BookStatuses.AVAILABLE,
          location: "",
          updatedAt: new Date(),
          initDate: new Date(),
          delFlg: fasle,
        })
      }
      await BookCopy.insertMany(bookCopys);
      resHandler(res, result);
    } catch (err) {
      errResponseHandler(res, err);
    }
  }

  // [DELETE] /books-command/delete
  /**
   * body {
   *  ids: string
   * }
   * @param {*} req 
   * @param {*} res 
   */
  async deleteBook(req, res) {
    const { ids } = req.body;
    if(!ids || ids.length === 0){
      resHandler(res, {});
      return;
    }
    const objectIdList = ids.map(id => mongoose.Types.ObjectId(id));
    try {
      const result = await Book.updateMany(
        { _id: { $in: objectIdList } }, 
        { $set: { delFlg: true } } 
      );
      resHandler(res, { message: `Delete document successfully! Id: ${ids}.` });
    } catch (err) {
      errResponseHandler(res, err);
    }
  }
}

module.exports = new BookCommandController();
