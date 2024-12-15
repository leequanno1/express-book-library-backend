const { LoanStatuses } = require("../models/enums/loan-status");
const Loan = require("../models/loan");

/**
 *
 * @param {String} readerId
 * @param {Number} month
 * @param {Number} year
 * @returns {Promise<number>} number
 */
const handleGetBorrowedTotal = async (readerId, month = null, year = null) => {
  if (!readerId || readerId === "") {
    return 0;
  }
  if (!month || !year) {
    return await Loan.countDocuments({
      readerId: readerId,
      delFlg: false,
      status: LoanStatuses.BORROWED,
      dueDate: { $lt: currentDate },
    });
  }
  const currentDate = new Date();
  const startOfNovember = new Date(year, month - 1, 1);
  const endOfNovember =
    month === 12 ? new Date(year + 1, 1, 1) : new Date(year, month, 1);
  return await Loan.countDocuments({
    readerId: readerId,
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
 * @param {String} readerId
 * @param {Number} skip
 * @param {Number} limit
 * @param {Number} month
 * @param {Number} year
 * @returns {Promise<Array>}
 */
const handleGetBorrowed = async (
  readerId,
  skip,
  limit,
  month = null,
  year = null
) => {
  if (!readerId || readerId === "") {
    return [];
  }
  if (!month || !year) {
    return await Loan.find({
      readerId: readerId,
      delFlg: false,
      status: LoanStatuses.BORROWED,
      dueDate: { $lt: currentDate },
    })
      .skip(skip)
      .limit(limit);
  }
  const currentDate = new Date();
  const startOfNovember = new Date(year, month - 1, 1);
  const endOfNovember =
    month === 12 ? new Date(year + 1, 1, 1) : new Date(year, month, 1);
  return await Loan.find({
    readerId: readerId,
    delFlg: false,
    status: LoanStatuses.BORROWED,
    loanDate: {
      $gte: startOfNovember,
      $lt: endOfNovember,
    },
    dueDate: { $lt: currentDate },
  })
    .skip(skip)
    .limit(skip);
};

/**
 *
 * @param {String} readerId
 * @param {Number} month
 * @param {Number} year
 * @returns {Promise<number>} number
 */
const handleGetReturnedTotal = async (readerId, month, year) => {
  if (!readerId || readerId === "") {
    return 0;
  }
  if (!month || !year) {
    return await Loan.countDocuments({
      readerId: readerId,
      delFlg: false,
      status: LoanStatuses.RETURNED,
    });
  }
  const startOfNovember = new Date(year, month - 1, 1);
  const endOfNovember =
    month === 12 ? new Date(year + 1, 1, 1) : new Date(year, month, 1);
  return await Loan.countDocuments({
    readerId: readerId,
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
 * @param {String} readerId
 * @param {Number} skip
 * @param {Number} limit
 * @param {Number} month
 * @param {Number} year
 * @returns {Promise<Array>}
 */
const handleGetReturned = async (
  readerId,
  skip,
  limit,
  month = null,
  year = null
) => {
  if (!readerId || readerId === "") {
    return [];
  }
  if (!month || !year) {
    return await Loan.find({
      readerId: readerId,
      delFlg: false,
      status: LoanStatuses.RETURNED,
    })
      .skip(skip)
      .limit(limit);
  }
  const startOfNovember = new Date(year, month - 1, 1);
  const endOfNovember =
    month === 12 ? new Date(year + 1, 1, 1) : new Date(year, month, 1);
  return await Loan.find({
    readerId: readerId,
    delFlg: false,
    status: LoanStatuses.BORROWED,
    loanDate: {
      $gte: startOfNovember,
      $lt: endOfNovember,
    },
  })
    .skip(skip)
    .limit(limit);
};

/**
 *
 * @param {String} readerId
 * @param {Number} month
 * @param {Number} year
 * @returns {Promise<number>} number
 */
const handleGetOverdueTotal = async (readerId, month, year) => {
  if (!readerId || readerId === "") {
    return 0;
  }
  if (!month || !year) {
    return await Loan.countDocuments({
      readerId: readerId,
      delFlg: false,
      $or: [
        { status: LoanStatuses.OVERDUE },
        { dueDate: { $gte: currentDate } },
      ],
    });
  }
  const currentDate = new Date();
  const startOfNovember = new Date(year, month - 1, 1);
  const endOfNovember =
    month === 12 ? new Date(year + 1, 1, 1) : new Date(year, month, 1);
  return await Loan.countDocuments({
    readerId: readerId,
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
 * @param {String} readerId
 * @param {Number} skip
 * @param {Number} limit
 * @param {Number} month
 * @param {Number} year
 * @returns {Promise<Array>}
 */
const handleGetOverdue = async (
  readerId,
  skip,
  limit,
  month = null,
  year = null
) => {
  if (!readerId || readerId === "") {
    return [];
  }
  if (!month || !year) {
    return await Loan.find({
      readerId: readerId,
      delFlg: false,
      $or: [
        { status: LoanStatuses.OVERDUE },
        { dueDate: { $gte: currentDate } },
      ],
    })
      .skip(skip)
      .limit(limit);
  }
  const currentDate = new Date();
  const startOfNovember = new Date(year, month - 1, 1);
  const endOfNovember =
    month === 12 ? new Date(year + 1, 1, 1) : new Date(year, month, 1);
  return await Loan.find({
    readerId: readerId,
    delFlg: false,
    loanDate: {
      $gte: startOfNovember,
      $lt: endOfNovember,
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
