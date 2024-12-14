const express = require('express')
const router = express.Router();
const Controller = require("../controllers/book-copy.controller");

// [GET] /book-copy/get-total
router.get("/get-total", Controller.getTotal);

// [GET] /book-copy/get-available-total
router.get("/get-available-total", Controller.getAvailableTotal);

// [GET] /book-copy/get-copy-info
router.get("/get-copy-info", Controller.getCopyInfo);

// [POST] /book-copy/get-copy-ids
router.post("/get-copy-ids", Controller.getCopyIds);

module.exports = router;