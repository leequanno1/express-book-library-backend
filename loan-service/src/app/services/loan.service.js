const { LoanStatuses } = require("../models/enums/loan-status");
const Loan = require("../models/loan");

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
    month === 12 ? new Date(year + 1, 1, 1) : new Date(year, month, 1);
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
 * @param {Number} skip
 * @param {Number} limit
 * @param {Number} month
 * @param {Number} year
 * @returns {Promise<Array>}
 */
const handleGetBorrowed = async (skip, limit, month = null, year = null) => {
  const currentDate = new Date();
  if (!month || !year) {
    return await Loan.find({
      delFlg: false,
      status: LoanStatuses.BORROWED,
      dueDate: { $lt: currentDate },
    })
      .skip(skip)
      .limit(limit);
  }
  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth =
    month === 12 ? new Date(year + 1, 1, 1) : new Date(year, month, 1);
  return await Loan.find({
    delFlg: false,
    status: LoanStatuses.BORROWED,
    loanDate: {
      $gte: startOfMonth,
      $lt: endOfMonth,
    },
    dueDate: { $lt: currentDate },
  })
    .skip(skip)
    .limit(skip);
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
    month === 12 ? new Date(year + 1, 1, 1) : new Date(year, month, 1);
  return await Loan.countDocuments({
    delFlg: false,
    status: LoanStatuses.BORROWED,
    loanDate: {
      $gte: startOfMonth,
      $lt: endOfMonth,
    },
  });
};

/**
 *
 * @param {Number} skip
 * @param {Number} limit
 * @param {Number} month
 * @param {Number} year
 * @returns {Promise<Array>}
 */
const handleGetReturned = async (skip, limit, month = null, year = null) => {
  if (!month || !year) {
    return await Loan.find({
      delFlg: false,
      status: LoanStatuses.RETURNED,
    })
      .skip(skip)
      .limit(limit);
  }
  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth =
    month === 12 ? new Date(year + 1, 1, 1) : new Date(year, month, 1);
  return await Loan.find({
    delFlg: false,
    status: LoanStatuses.BORROWED,
    loanDate: {
      $gte: startOfMonth,
      $lt: endOfMonth,
    },
  })
    .skip(skip)
    .limit(limit);
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
    month === 12 ? new Date(year + 1, 1, 1) : new Date(year, month, 1);
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
 * @param {Number} skip
 * @param {Number} limit
 * @param {Number} month
 * @param {Number} year
 * @returns {Promise<Array>}
 */
const handleGetOverdue = async (skip, limit, month = null, year = null) => {
  const currentDate = new Date();
  if (!month || !year) {
    return await Loan.find({
      delFlg: false,
      $or: [
        { status: LoanStatuses.OVERDUE },
        { dueDate: { $gte: currentDate } },
      ],
    })
      .skip(skip)
      .limit(limit);
  }
  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth =
    month === 12 ? new Date(year + 1, 1, 1) : new Date(year, month, 1);
  return await Loan.find({
    delFlg: false,
    loanDate: {
      $gte: startOfMonth,
      $lt: endOfMonth,
    },
    $or: [{ status: LoanStatuses.OVERDUE }, { dueDate: { $gte: currentDate } }],
  })
    .skip(skip)
    .limit(limit);
};

module.exports = {
  handleGetBorrowedTotal,
  handleGetBorrowed,
  handleGetReturnedTotal,
  handleGetReturned,
  handleGetOverdueTotal,
  handleGetOverdue,
};
