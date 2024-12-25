const express = require('express')
const router = express.Router();
const controller = require('../controllers/book-command.controller');
const uploader = require("../services/image-uploader.service");
const upload = uploader.upload;

router.put("/update", upload.array("imageFile",10), controller.updateBook);

router.put("/create", upload.array("imageFile",10), controller.createBook);

router.put("/create-many", controller.createManyBook)

router.delete("/delete", controller.deleteBook);

module.exports = router;