const {
  responseHandler,
  errorResponseHandler,
} = require("../services/response.service");

const {
  handleGetBorrowedTotal,
  handleGetBorrowed,
  handleGetReturnedTotal,
  handleGetReturned,
  handleGetOverdueTotal,
  handleGetOverdue,
} = require("../services/loan.service");
const loan = require("../models/loan");

class LoanController {
  // [GET]"/loans/get-borrowed-page"
  /**
   * param : {
   *    month: number,
   *    year: number,
   * }
   * @param {*} req
   * @param {*} res
   */
  async getBorrowedPage(req, res) {
    let { month, year } = req.query;
    try {
      const records = await handleGetBorrowed(month, year);
      responseHandler(res, records);
    } catch (error) {
      errorResponseHandler(res, error);
    }
  }

  // [GET]"/loans/get-borrowed-total"
  /**
   * param: {
   *    month?: numeber,
   *    year?: number,
   * }
   * @param {*} req
   * @param {*} res
   */
  async getBorrowedTotal(req, res) {
    const { month, year } = req.query;
    try {
      const total = await handleGetBorrowedTotal(month, year);
      responseHandler(res, { total: total });
    } catch (error) {
      errorResponseHandler(res, error);
    }
  }

  // [GET]"/loans/get-return-page"
  /**
   * param : {
   *    month: number,
   *    year: number,
   * }
   * @param {*} req
   * @param {*} res
   */
  async getReturnPage(req, res) {
    let { month, year } = req.query;
    try {
      const records = await handleGetReturned(month, year);
      responseHandler(res, records);
    } catch (error) {
      errorResponseHandler(res, error);
    }
  }

  // [GET]"/loans/get-return-total"
  /**
   * param: {
   *    month?: numeber,
   *    year?: number,
   * }
   * @param {*} req
   * @param {*} res
   */
  async getReturnTotal(req, res) {
    const { month, year } = req.query;
    try {
      const total = await handleGetReturnedTotal(month, year);
      responseHandler(res, { total: total });
    } catch (error) {
      errorResponseHandler(res, error);
    }
  }

  // [GET]"/loans/get-overdue-page"
  /**
   * param : {
   *    month: number,
   *    year: number,
   * }
   * @param {*} req
   * @param {*} res
   */
  async getOverduePage(req, res) {
    let { month, year } = req.query;
    try {
      const records = await handleGetOverdue(month, year);
      responseHandler(res, records);
    } catch (error) {
      errorResponseHandler(res, error);
    }
  }

  // [GET]"/loans/get-overdue-total"
  /**
   * param: {
   *    month?: numeber,
   *    year?: number,
   * }
   * @param {*} req
   * @param {*} res
   */
  async getOverdueTotal(req, res) {
    const { month, year } = req.query;
    try {
      const total = await handleGetOverdueTotal(month, year);
      responseHandler(res, { total: total });
    } catch (error) {
      errorResponseHandler(res, error);
    }
  }

  // [GET]"/loans/get-all-total"
  /**
   * param: {
   *    month?: numeber,
   *    year?: number,
   * }
   * @param {*} req
   * @param {*} res
   */
  async getAllTotal(req, res) {
    const { month, year } = req.query;
    try {
      const borrowedTotal = await handleGetBorrowedTotal(month, year);
      const returnedTotal = await handleGetReturnedTotal(month, year);
      const overdueTotal = await handleGetOverdueTotal(month, year);
      responseHandler(res, {
        borrowedTotal: borrowedTotal,
        returnedTotal: returnedTotal,
        overdueTotal: overdueTotal,
      });
    } catch (error) {
      errorResponseHandler(res, error);
    }
  }
}

module.exports = new LoanController();
