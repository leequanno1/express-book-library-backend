const {handleGetReport} = require('../services/report.service');
const {responseHandler, errorResponseHandler} = require('../services/response.service');

class ReportController {
    // [GET] /reports/get-report 
    async getReport(req, res) {
        const { month, year } = req.query;
        if (!month || !year) {
            errorResponseHandler(res, new Error("Month and year are required"));
            return;
        }
        try {
            const report = await handleGetReport(month, year);
            responseHandler(res, report);
        } catch (error) {
            errorResponseHandler(res, error);
        }
    }

}

module.exports = new ReportController();