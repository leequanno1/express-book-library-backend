const express = require('express')
const router = express.Router();
const Controller = require("../controllers/book.controller")

router.get("/getall", Controller.getAll);

router.get("/get_count", Controller.getCount);

router.get("/total", Controller.getTotal);

router.get("/get-by-title", Controller.getByTitle);

router.post("/post-get-by-id", Controller.getByIds);

router.post("/post-get-by-category-ids", Controller.getByCategoryIds)

module.exports = router;