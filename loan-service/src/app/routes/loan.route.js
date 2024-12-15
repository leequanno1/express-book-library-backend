const express = require('express')
const router = express.Router();
const Controller = require("../controllers/loan.controller");

router.get("/get-borrowed-page", Controller.getBorrowedPage);

router.get("/get-borrowed-total", Controller.getBorrowedTotal);

router.get("/get-return-page", Controller.getReturnPage);

router.get("/get-return-total", Controller.getReturnTotal);

router.get("/get-overdue-page", Controller.getOverduePage);

router.get("/get-overdue-total", Controller.getOverdueTotal);

router.get("/get-all-total", Controller.getAllTotal)

module.exports = router;