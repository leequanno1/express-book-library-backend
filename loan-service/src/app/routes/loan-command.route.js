const express = require('express')
const router = express.Router();
const Controller = require("../controllers/loan-command.controller");

router.post("/post-borrow-book", Controller.createLoan);

router.post("/post-return-book", Controller.updateLoan);

module.exports = router;