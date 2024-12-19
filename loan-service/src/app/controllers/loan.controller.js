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
  // router.get("/loans/get-borrowed-page", Controller.getBorrowedPage);
  /**
   * param : {
   *    page: number,
   *    limit: number,
   *    month: number,
   *    year: number,
   * }
   * @param {*} req
   * @param {*} res
   */
  async getBorrowedPage(req, res) {
    let { page, limit, month, year } = req.query;
    if (!page || page === 0) page = 1;
    if (!limit || limit === 0) limit = 1;
    const skip = (page - 1) * limit;
    try {
      const records = await handleGetBorrowed(skip, limit, month, year);
      responseHandler(res, records);
    } catch (error) {
      errorResponseHandler(res, error);
    }
  }

  // router.get("/loans/get-borrowed-total", Controller.getBorrowedTotal);
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

  // router.get("/loans/get-return-page", Controller.getReturnPage);
  /**
   * param : {
   *    page: number,
   *    limit: number,
   *    month: number,
   *    year: number,
   * }
   * @param {*} req
   * @param {*} res
   */
  async getReturnPage(req, res) {
    let { page, limit, month, year } = req.query;
    if (!page || page === 0) page = 1;
    if (!limit || limit === 0) limit = 1;
    const skip = (page - 1) * limit;
    try {
      const records = await handleGetReturned(skip, limit, month, year);
      responseHandler(res, records);
    } catch (error) {
      errorResponseHandler(res, error);
    }
  }

  // router.get("/loans/get-return-total", Controller.getReturnTotal);
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

  // router.get("/loans/get-overdue-page", Controller.getOverduePage);
  /**
   * param : {
   *    page: number,
   *    limit: number,
   *    month: number,
   *    year: number,
   * }
   * @param {*} req
   * @param {*} res
   */
  async getOverduePage(req, res) {
    let { page, limit, month, year } = req.query;
    if (!page || page === 0) page = 1;
    if (!limit || limit === 0) limit = 1;
    const skip = (page - 1) * limit;
    try {
      const records = await handleGetOverdue(skip, limit, month, year);
      responseHandler(res, records);
    } catch (error) {
      errorResponseHandler(res, error);
    }
  }

  // router.get("/loans/get-overdue-total", Controller.getOverdueTotal);
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

  // router.get("/loans/get-all-total", Controller.getAllTotal)
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
