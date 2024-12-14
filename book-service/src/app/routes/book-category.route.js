const express = require('express')
const router = express.Router();
const Controller = require("../controllers/book-category.controller")

router.get("/get-all", Controller.getAll);

router.get("/get-total", Controller.getTottal);

router.get("/get-count", Controller.getCount);

router.get("/get-by-ids", Controller.getByIds);

router.get("/get-by-name", Controller.getByName);

module.exports = router;