const express = require('express')
const router = express.Router();
const Controller = require("../controllers/report.controller");

router.get("/get-report", Controller.getReport);

module.exports = router;
