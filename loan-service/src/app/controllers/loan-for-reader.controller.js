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
} = require("../services/loan-for-reader.service");

class LoanForReaderController {
  // [GET] "/loans-for-user/get-borrowed-page"
  /**
   * param : {
   *    readerUsername: string
   *    page: number,
   *    limit: number,
   *    month: number,
   *    year: number,
   * }
   * @param {*} req
   * @param {*} res
   */
  async getBorrowedPage(req, res) {
    let {readerUsername, page, limit, month, year } = req.query;
    if (!page || page === 0) page = 1;
    if (!limit || limit === 0) limit = 1;
    const skip = (page - 1) * limit;
    try {
      const records = await handleGetBorrowed(readerUsername, skip, limit, month, year);
      responseHandler(res, records);
    } catch (error) {
      errorResponseHandler(res, error);
    }
  }

  // [GET] "/loans-for-user/get-borrowed-total"
  /**
   * param: {
   *    readerUsername: string,
   *    month?: numeber,
   *    year?: number,
   * }
   * @param {*} req
   * @param {*} res
   */
  async getBorrowedTotal(req, res) {
    const { readerUsername, month, year } = req.query;
    try {
      const total = await handleGetBorrowedTotal(readerUsername, month, year);
      responseHandler(res, { total: total });
    } catch (error) {
      errorResponseHandler(res, error);
    }
  }

  // [GET] "/loans-for-user/get-return-page"
  /**
   * param : {
   *    readerUsername: string,
   *    page: number,
   *    limit: number,
   *    month: number,
   *    year: number,
   * }
   * @param {*} req
   * @param {*} res
   */
  async getReturnPage(req, res) {
    let {readerUsername, page, limit, month, year } = req.query;
    if (!page || page === 0) page = 1;
    if (!limit || limit === 0) limit = 1;
    const skip = (page - 1) * limit;
    try {
      const records = await handleGetReturned(readerUsername, skip, limit, month, year);
      responseHandler(res, records);
    } catch (error) {
      errorResponseHandler(res, error);
    }
  }

  // [GET] "/loans-for-user/get-return-total"
  /**
   * param: {
   *    readerUsername: string,
   *    month?: numeber,
   *    year?: number,
   * }
   * @param {*} req
   * @param {*} res
   */
  async getReturnTotal(req, res) {
    const { readerUsername, month, year } = req.query;
    try {
      const total = await handleGetReturnedTotal(readerUsername, month, year);
      responseHandler(res, { total: total });
    } catch (error) {
      errorResponseHandler(res, error);
    }
  }

  // [GET] "/loans-for-user/get-overdue-page"
  /**
   * param : {
   *    readerUsername: string,
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
      const records = await handleGetOverdue(readerUsername, skip, limit, month, year);
      responseHandler(res, records);
    } catch (error) {
      errorResponseHandler(res, error);
    }
  }

  // [GET] "/loans-for-user/get-overdue-total"
  /**
   * param: {
   *    readerUsername: string,
   *    month?: numeber,
   *    year?: number,
   * }
   * @param {*} req
   * @param {*} res
   */
  async getOverdueTotal(req, res) {
    const { readerUsername, month, year } = req.query;
    try {
      const total = await handleGetOverdueTotal(readerUsername, month, year);
      responseHandler(res, { total: total });
    } catch (error) {
      errorResponseHandler(res, error);
    }
  }

  // [GET] "/loans-for-user/get-all-total"
  /**
   * parma: {
   *    readerUsername: string,
   *    month?: numeber,
   *    year?: number,
   * }
   * @param {*} req
   * @param {*} res
   */
  async getAllTotal(req, res) {
    const { readerUsername, month, year } = req.query;
    try {
      const borrowedTotal = await handleGetBorrowedTotal(readerUsername, month, year);
      const returnedTotal = await handleGetReturnedTotal(readerUsername, month, year);
      const overdueTotal = await handleGetOverdueTotal(readerUsername, month, year);
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

module.exports = new LoanForReaderController();
