const Book = require("../models/book");
const responseService = require("../services/response.service");
const resHandler = responseService.responseHandler;
const errResponseHandler = responseService.errorResponseHandler;
const fileToFileName =
  require("../services/image-uploader.service").fileToFileName;

class BookCommandController {
  // [PUT] /books-command/update
  async updateBook(req, res) {
    const data = req.body;
    const updateData = {
      ...data,
      genre: JSON.parse(data.genre),
      price: Number(data.price),
      previous_price: Number(data.previous_price),
      image_url: fileToFileName(req.files),
    };
    try {
      const result = await Book.findByIdAndUpdate(updateData?._id, updateData, {
        new: true,
      });
      resHandler(res, result);
    } catch (err) {
      errResponseHandler(res, err);
    }
  }

  // [PUT] /books-command/create
  async createBook(req, res) {
    const data = req.body;
    const updateData = {
      ...data,
      genre: JSON.parse(data.genre),
      price: Number(data.price),
      previous_price: Number(data.previous_price),
      image_url: fileToFileName(req.files),
    };
    try {
      const newBook = new Book(updateData);
      const result = await newBook.save();
      resHandler(res, result);
    } catch (err) {
      errResponseHandler(res, err);
    }
  }

  // [DELETE] /books-command/delete
  async deleteBook(req, res) {
    const { id } = req.body;
    try {
      const result = await Book.findByIdAndDelete(id);
      resHandler(res, { message: `Delete document successfully! Id: ${id}.` });
    } catch (err) {
      errResponseHandler(res, err);
    }
  }
}

module.exports = new BookCommandController();
