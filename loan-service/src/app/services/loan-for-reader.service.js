const { LoanStatuses } = require("../models/enums/loan-status");
const Loan = require("../models/loan");

/**
 *
 * @param {String} readerUsername
 * @param {Number} month
 * @param {Number} year
 * @returns {Promise<number>} number
 */
const handleGetBorrowedTotal = async (readerUsername, month = null, year = null) => {
  const currentDate = new Date();
  if (!readerUsername || readerUsername === "") {
    return 0;
  }
  if (!month || !year) {
    return await Loan.countDocuments({
      readerUsername: readerUsername,
      delFlg: false,
      status: LoanStatuses.BORROWED,
      dueDate: { $lt: currentDate },
    });
  }
  const startOfNovember = new Date(year, month - 1, 1);
  const endOfNovember =
    month === 12 ? new Date(year + 1, 1, 1) : new Date(year, month, 1);
  return await Loan.countDocuments({
    readerUsername: readerUsername,
    delFlg: false,
    status: LoanStatuses.BORROWED,
    loanDate: {
      $gte: startOfNovember,
      $lt: endOfNovember,
    },
    dueDate: { $lt: currentDate },
  });
};

/**
 *
 * @param {String} readerUsername
 * @param {Number} month
 * @param {Number} year
 * @returns {Promise<Array>}
 */
const handleGetBorrowed = async (
  readerUsername,
  month = null,
  year = null
) => {
  const currentDate = new Date();
  if (!readerUsername || readerUsername === "") {
    return [];
  }
  if (!month || !year) {
    return await Loan.find({
      readerUsername: readerUsername,
      delFlg: false,
      status: LoanStatuses.BORROWED,
      dueDate: { $lt: currentDate },
    });
  }
  const startOfNovember = new Date(year, month - 1, 1);
  const endOfNovember =
    month === 12 ? new Date(year + 1, 1, 1) : new Date(year, month, 1);
  return await Loan.find({
    readerUsername: readerUsername,
    delFlg: false,
    status: LoanStatuses.BORROWED,
    loanDate: {
      $gte: startOfNovember,
      $lt: endOfNovember,
    },
    dueDate: { $lt: currentDate },
  });
};

/**
 *
 * @param {String} readerUsername
 * @param {Number} month
 * @param {Number} year
 * @returns {Promise<number>} number
 */
const handleGetReturnedTotal = async (readerUsername, month, year) => {
  if (!readerUsername || readerUsername === "") {
    return 0;
  }
  if (!month || !year) {
    return await Loan.countDocuments({
      readerUsername: readerUsername,
      delFlg: false,
      status: LoanStatuses.RETURNED,
    });
  }
  const startOfNovember = new Date(year, month - 1, 1);
  const endOfNovember =
    month === 12 ? new Date(year + 1, 1, 1) : new Date(year, month, 1);
  return await Loan.countDocuments({
    readerUsername: readerUsername,
    delFlg: false,
    status: LoanStatuses.BORROWED,
    loanDate: {
      $gte: startOfNovember,
      $lt: endOfNovember,
    },
  });
};

/**
 *
 * @param {String} readerUsername
 * @param {Number} month
 * @param {Number} year
 * @returns {Promise<Array>}
 */
const handleGetReturned = async (
  readerUsername,
  month = null,
  year = null
) => {
  if (!readerUsername || readerUsername === "") {
    return [];
  }
  if (!month || !year) {
    return await Loan.find({
      readerUsername: readerUsername,
      delFlg: false,
      status: LoanStatuses.RETURNED,
    });
  }
  const startOfNovember = new Date(year, month - 1, 1);
  const endOfNovember =
    month === 12 ? new Date(year + 1, 1, 1) : new Date(year, month, 1);
  return await Loan.find({
    readerUsername: readerUsername,
    delFlg: false,
    status: LoanStatuses.BORROWED,
    loanDate: {
      $gte: startOfNovember,
      $lt: endOfNovember,
    },
  });
};

/**
 *
 * @param {String} readerUsername
 * @param {Number} month
 * @param {Number} year
 * @returns {Promise<number>} number
 */
const handleGetOverdueTotal = async (readerUsername, month, year) => {
  const currentDate = new Date();
  if (!readerUsername || readerUsername === "") {
    return 0;
  }
  if (!month || !year) {
    return await Loan.countDocuments({
      readerUsername: readerUsername,
      delFlg: false,
      $or: [
        { status: LoanStatuses.OVERDUE },
        { dueDate: { $gte: currentDate } },
      ],
    });
  }
  const startOfNovember = new Date(year, month - 1, 1);
  const endOfNovember =
    month === 12 ? new Date(year + 1, 1, 1) : new Date(year, month, 1);
  return await Loan.countDocuments({
    readerUsername: readerUsername,
    delFlg: false,
    loanDate: {
      $gte: startOfNovember,
      $lt: endOfNovember,
    },
    $or: [{ status: LoanStatuses.OVERDUE }, { dueDate: { $gte: currentDate } }],
  });
};

/**
 *
 * @param {String} readerUsername
 * @param {Number} month
 * @param {Number} year
 * @returns {Promise<Array>}
 */
const handleGetOverdue = async (
  readerUsername,
  month = null,
  year = null
) => {
  const currentDate = new Date();
  if (!readerUsername || readerUsername === "") {
    return [];
  }
  if (!month || !year) {
    return await Loan.find({
      readerUsername: readerUsername,
      delFlg: false,
      $or: [
        { status: LoanStatuses.OVERDUE },
        { dueDate: { $gte: currentDate } },
      ],
    });
  }
  const startOfNovember = new Date(year, month - 1, 1);
  const endOfNovember =
    month === 12 ? new Date(year + 1, 1, 1) : new Date(year, month, 1);
  return await Loan.find({
    readerUsername: readerUsername,
    delFlg: false,
    loanDate: {
      $gte: startOfNovember,
      $lt: endOfNovember,
    },
    $or: [{ status: LoanStatuses.OVERDUE }, { dueDate: { $gte: currentDate } }],
  });
};

module.exports = {
  handleGetBorrowedTotal,
  handleGetBorrowed,
  handleGetReturnedTotal,
  handleGetReturned,
  handleGetOverdueTotal,
  handleGetOverdue,
};
