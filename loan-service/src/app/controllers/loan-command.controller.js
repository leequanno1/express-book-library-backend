const { LoanStatuses } = require("../models/enums/loan-status");
const Loan = require("../models/loan");
const {
  responseHandler,
  errorResponseHandler,
} = require("../services/response.service");
const {
  getBookCopyInfo,
  handleBorrowBook,
  handleReturnBook,
} = require("../services/book-data.service");

class LoanCommandController {
  // [POST] "/loans-command/post-borrow-book"
  /**
   * body {
   *    readerUsername : string,
   *    librarianUsername : string,
   *    copyId: string
   * }
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async createLoan(req, res) {
    let { readerUsername, librarianUsername, copyId } = req.body;
    if (!readerUsername || !librarianUsername || !copyId) {
      responseHandler(res, {});
      return;
    }
    try {
      const bookInfo = (await getBookCopyInfo(req, copyId)).data;
      if (!bookInfo) {
        throw new Error("Copy id not exit");
      }
      const loanData = {
        readerUsername: readerUsername,
        librarianUsername: librarianUsername,
        book: {
          _id: bookInfo._id,
          bookId: bookInfo.bookId,
          title: bookInfo.title,
          author: bookInfo.author,
          year: bookInfo.year,
          categorys: bookInfo.categorys,
          totalCopies: bookInfo.totalCopies,
          description: bookInfo.description,
          imageUrl: bookInfo.imageUrl,
          initDate: bookInfo.initDate,
          delFlg: bookInfo.delFlg,
          status: bookInfo.status,
          location: bookInfo.location,
          updatedAt: bookInfo.updatedAt,
        },
        loanDate: new Date(),
        dueDate: new Date(new Date().getDate() + 7),
        returnDate: undefined,
        status: LoanStatuses.BORROWED,
        money: undefined,
        initDate: new Date(),
        delFlg: false,
      };
      //   TODO: Update status of copy
      const result = await handleBorrowBook(req,loanData.book._id);
      const record = await Loan.insertMany([loanData]);
      responseHandler(res, record);
    } catch (error) {
      errorResponseHandler(res, error);
    }
  }

  // [POST] "/loans-command/post-return-book"
  /**
   * boddy {
   *    copyId: string
   * }
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async updateLoan(req, res) {
    const { copyId } = req.body;
    if (!copyId) {
      responseHandler(res, {});
      return;
    }
    try {
      const record = await Loan.findOne({ "book._id": copyId }).sort({
        loanDate: -1,
      });
      if (!record) {
        responseHandler(res, {});
        return;
      }
      const currentDate = new Date();
      if (currentDate > record.dueDate) {
        record.status = LoanStatuses.OVERDUE;
        record.money = 10000;
      } else {
        record.status = LoanStatuses.RETURNED;
      }
      // TODO: Update status of book copy.
      const result = await handleReturnBook(req, record.book._id);
      await record.save();
      responseHandler(res, record);
    } catch (error) {
      errorResponseHandler(res, error);
    }
  }
}

module.exports = new LoanCommandController();
