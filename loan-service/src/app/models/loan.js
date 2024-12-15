const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { LoanStatuses } = require("./enums/loan-status")

const Loan = new Schema({
  title: { type: String, default: "unknow" },
  readerId: { type: String, default: "" },
  librarianId: { type: String, default: "" },
  book: {
    type: Object,
    default: {
      _id: undefined,
      bookId: undefined,
      title: undefined,
      author: undefined,
      year: undefined,
      categorys: undefined,
      totalCopies: undefined,
      description: undefined,
      imageUrl: undefined,
      initDate: undefined,
      delFlg: undefined,
      status: undefined,
      location: undefined,
      updatedAt: undefined,
    },
  },
  loanDate: { type: Date, default: new Date() },
  dueDate: { type: Date, default: undefined },
  returnDate: { type: Date, default: undefined },
  status: { type: Number, default: LoanStatuses.BORROWED},
  money: { type: Number, default: 0 },
  initDate: { type: Date, default: new Date() },
  delFlg: { type: Boolean, default: false }
});

module.exports = mongoose.model("Loan", Loan);
