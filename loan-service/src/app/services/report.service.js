const Loan = require("../models/loan");
const { LoanStatuses } = require("../models/enums/loan-status");

/**
 *
 * @param {Number} month
 * @param {Number} year
 * @returns {Promise<number>} number
 */
const handleGetBorrowedTotal = async (month = null, year = null) => {
  const currentDate = new Date();
  if (!month || !year) {
    return await Loan.countDocuments({
      delFlg: false,
      status: LoanStatuses.BORROWED,
      dueDate: { $lt: currentDate },
    });
  }
  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth =
    month === 11 ? new Date(year + 1, 1, 1) : new Date(year, month, 1);
  return await Loan.countDocuments({
    delFlg: false,
    status: LoanStatuses.BORROWED,
    loanDate: {
      $gte: startOfMonth,
      $lt: endOfMonth,
    },
    dueDate: { $lt: currentDate },
  });
};

/**
 *
 * @param {Number} month
 * @param {Number} year
 * @returns {Promise<Array>}
 */
const handleGetBorrowed = async (month = null, year = null) => {
  const currentDate = new Date();
  if (!month || !year) {
    return await Loan.find({
      delFlg: false,
      status: LoanStatuses.BORROWED,
      dueDate: { $lt: currentDate },
    });
  }
  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth =
    month === 11 ? new Date(year + 1, 1, 1) : new Date(year, month, 1);
  return await Loan.find({
    delFlg: false,
    status: LoanStatuses.BORROWED,
    loanDate: {
      $gte: startOfMonth,
      $lt: endOfMonth,
    },
    dueDate: { $lt: currentDate },
  });
};

/**
 *
 * @param {Number} month
 * @param {Number} year
 * @returns {Promise<number>} number
 */
const handleGetReturnedTotal = async (month, year) => {
  if (!month || !year) {
    return await Loan.countDocuments({
      delFlg: false,
      status: LoanStatuses.RETURNED,
    });
  }
  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth =
    month === 11 ? new Date(year + 1, 1, 1) : new Date(year, month, 1);
  return await Loan.countDocuments({
    delFlg: false,
    status: LoanStatuses.RETURNED,
    loanDate: {
      $gte: startOfMonth,
      $lt: endOfMonth,
    },
  });
};

/**
 *
 * @param {Number} month
 * @param {Number} year
 * @returns {Promise<Array>}
 */
const handleGetReturned = async (month = null, year = null) => {
  if (!month || !year) {
    return await Loan.find({
      delFlg: false,
      status: LoanStatuses.RETURNED,
    });
  }
  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth =
    month === 11 ? new Date(year + 1, 1, 1) : new Date(year, month, 1);
  return await Loan.find({
    delFlg: false,
    status: LoanStatuses.RETURNED,
    loanDate: {
      $gte: startOfMonth,
      $lt: endOfMonth,
    },
  });
};

/**
 *
 * @param {Number} month
 * @param {Number} year
 * @returns {Promise<number>} number
 */
const handleGetOverdueTotal = async (month, year) => {
  const currentDate = new Date();
  if (!month || !year) {
    return await Loan.countDocuments({
      delFlg: false,
      $or: [
        { status: LoanStatuses.OVERDUE },
        { dueDate: { $gte: currentDate } },
      ],
    });
  }
  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth =
    month === 11 ? new Date(year + 1, 1, 1) : new Date(year, month, 1);
  return await Loan.countDocuments({
    delFlg: false,
    loanDate: {
      $gte: startOfMonth,
      $lt: endOfMonth,
    },
    $or: [{ status: LoanStatuses.OVERDUE }, { dueDate: { $gte: currentDate } }],
  });
};

/**
 *
 * @param {Number} month
 * @param {Number} year
 * @returns {Promise<Array>}
 */
const handleGetOverdue = async (month = null, year = null) => {
  const currentDate = new Date();
  if (!month || !year) {
    return await Loan.find({
      delFlg: false,
      $or: [
        { status: LoanStatuses.OVERDUE },
        { dueDate: { $gte: currentDate } },
      ],
    });
  }
  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth =
    month === 11 ? new Date(year + 1, 1, 1) : new Date(year, month, 1);
  return await Loan.find({
    delFlg: false,
    loanDate: {
      $gte: startOfMonth,
      $lt: endOfMonth,
    },
    $or: [{ status: LoanStatuses.OVERDUE }, { dueDate: { $gte: currentDate } }],
  });
};

/**
 *
 * @param {Number} month
 * @param {Number} year
 * @returns {Promise<Object>}
 */
const handleGetReport = async(month, year) => {
    const borrowedTotal = await handleGetBorrowedTotal(month, year);
    const borrowed = await handleGetBorrowed(month, year);
    const returnedTotal = await handleGetReturnedTotal(month, year);
    const returned = await handleGetReturned(month, year);
    const overdueTotal = await handleGetOverdueTotal(month, year);
    const overdue = await handleGetOverdue(month, year);
    return {
        borrowedTotal,
        borrowed,
        returnedTotal,
        returned,
        overdueTotal,
        overdue,
    };
}

module.exports = {
  handleGetBorrowedTotal,
  handleGetBorrowed,
  handleGetReturnedTotal,
  handleGetReturned,
  handleGetOverdueTotal,
  handleGetOverdue,
  handleGetReport,
};
