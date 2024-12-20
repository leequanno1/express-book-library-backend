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
   *  currentImageUrl,
   * }
   * @param {*} req 
   * @param {*} res 
   */
  async updateBook(req, res) {
    const reqBody = req.body;
    reqBody.categoryIds = reqBody.categoryIds ? JSON.parse(reqBody.categoryIds) : [];
    const fileNames = fileToFileName(req.files);
    const objectIdList = reqBody.categoryIds.map(id => new mongoose.Types.ObjectId(id));
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
        imageUrl : (!fileNames || fileNames.length == 0)? [reqBody.currentImageUrl] : fileNames,
        updatedAt : new Date(),
      }
      var book = await Book.findById(data.id,);
      book = {
        ...book,
        ...data,
      }
      const result = await Book.findByIdAndUpdate(data._id, book);
      resHandler(res, book);
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
    let reqBody = req.body;
    reqBody.categoryIds = reqBody.categoryIds ? JSON.parse(reqBody.categoryIds) : [];
    const fileNames = fileToFileName(req.files);
    const objectIdList = reqBody.categoryIds.map(id => new mongoose.Types.ObjectId(id));
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
      let BookCategorys = result.categorys.map(cate => { cate.books += 1; return cate; });
      await BookCategory.updateMany({ _id: { $in: objectIdList } }, BookCategorys);
      let bookCopys = [];
      for (let i = 0; i < newBook.totalCopies; i++) {
        bookCopys.push({
          bookId: newBook._id,
          status: BookStatuses.AVAILABLE,
          location: "",
          updatedAt: new Date(),
          initDate: new Date(),
          delFlg: false,
        })
      }
      await BookCopy.insertMany(bookCopys);
      resHandler(res, result);
    } catch (err) {
      errResponseHandler(res, err);
    }
  }

  // [PUT] /books-command/create-many
  /**
   * body {
   *  bookInfos: [
   *    {
   *     title: string,
   *     author: string,
   *     publisher: string,
   *     year: number, 
   *     categoryIds : string[], 
   *     totalCopies: number,
   *     description: string,
   *    }
   *  ]
   * }
   * @param {*} req 
   * @param {*} res 
   */
  async createManyBook(req, res) {
    let { bookInfos } = req.body;
    if( !bookInfos || bookInfos.length === 0 ) {
      resHandler(res, {})
      return;
    }
    try {
      // get category id
      let categoryIds = [];
      bookInfos.forEach(book => {
        book.categoryIds.forEach(id => categoryIds.push(id));
      });
      // remove collap item 
      const uniqueCategoryIds = [...new Set(categoryIds)];
      const categories = await BookCategory.find({_id: {$in : uniqueCategoryIds}, delFlg : false});
      const newBookData = bookInfos.map((item) => {
        return {
          title : item.title,
          author : item.author,
          publisher : item.publisher,
          year : item.year, 
          categorys : categories.filter(cate => {
            let rs = item.categoryIds.includes(cate._id.toString());
            if(rs) {
              cate.books += 1;
            }
            return rs;
          }), 
          totalCopies : item.totalCopies,
          description : item.description,
          updatedAt : new Date(),
          initDate : new Date(),
          delFlg : false,
        }
      })
      // save book
      const bookRecords = await Book.insertMany(newBookData);
      await BookCategory.updateMany({ _id: { $in: uniqueCategoryIds } }, categories);
      // create book copies
      let bookCopyData = [];
      bookRecords.forEach(book => {
        for(let i = 0; i < book.totalCopies; i++) {
          bookCopyData.push({
            bookId : book._id,
            status: BookStatuses.AVAILABLE,
            location: "",
            updatedAt: new Date(),
            initDate : new Date(),
            delFlg : false,
          })
        }
      })
      await BookCopy.insertMany(bookCopyData);
      resHandler(res, bookRecords);
    } catch (error) {
      errResponseHandler(res, error);
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
    const objectIdList = ids.map(id => new mongoose.Types.ObjectId(id));
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
