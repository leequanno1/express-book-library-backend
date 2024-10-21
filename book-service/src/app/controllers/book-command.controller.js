const Book = require("../models/book");
const responseService = require("../services/response.service")
const resHandler = responseService.responseHandler;
const errResponseHandler = responseService.errorResponseHandler;
const validatorAdminHandler = responseService.validatorAdminHandler;

class BookCommandController {

    // [PUT] /books-command/update
    async updateBook(req, res) {
        await validatorAdminHandler(req, res, async (req, res) => {
            const data = req.body;
            try {
                const result = await Book.findByIdAndUpdate(
                    data?.id,
                    data,
                    {new: true}
                );
                resHandler(res, result);
            } catch(err) {
                errResponseHandler(res, err);
            }
        });
    }

    // [PUT] /books-command/create
    async createBook(req, res) {
        await validatorAdminHandler(req, res, async (req,res) => {
            const data = req.body;
            try {
                const newBook = new Book(data);
                await newBook.save();
                resHandler(res, {message: 'Create ok'});
            } catch(err) {
                errResponseHandler(res, err);
            }
        });
    }

    // [DELETE] /books-command/delete
    async deleteBook(req, res) {
        await validatorAdminHandler(req, res, async (req, res) => {
            const {id} = req.body;
            try {
                const result = await Book.findByIdAndDelete(id);
                resHandler(res, {message: `Delete document successfully! Id: ${id}.`})
            } catch(err) {
                errResponseHandler(res, err);
            }
        });
    }
}

module.exports = new BookCommandController();