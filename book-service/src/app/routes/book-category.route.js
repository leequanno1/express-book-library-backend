const express = require('express')
const router = express.Router();
const Controller = require("../controllers/book-category.controller")

router.get("/get-all", Controller.getAll);

router.get("/get-total", Controller.getTotal);

router.get("/get-count", Controller.getCount);

router.post("/get-by-ids", Controller.postGetByIds);

router.get("/get-by-name", Controller.getByName);

module.exports = router;