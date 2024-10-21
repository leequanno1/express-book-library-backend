const express = require('express')
const router = express.Router();
const Controller = require("../controllers/book.controller")

router.get("/getall", Controller.getAll);
router.get("/get", Controller.getCount);
router.get("/total", Controller.getTotal);
router.get("/get-by-id", Controller.getById);

module.exports = router;