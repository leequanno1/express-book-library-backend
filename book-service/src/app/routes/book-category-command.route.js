const express = require('express')
const router = express.Router();
const Controller = require("../controllers/book-category-command.controller");

router.put("/put-update", Controller.updateCategory);

router.post("/post-create", Controller.createCategorys);

router.delete("/delete-delete", Controller.deleteCategorys)

module.exports = router;