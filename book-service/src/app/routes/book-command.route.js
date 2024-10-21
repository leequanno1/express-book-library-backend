const express = require('express')
const router = express.Router();
const controller = require('../controllers/book-command.controller');
const uploader = require("../services/image-uploader.service");
const upload = uploader.upload;

router.put("/update", upload.array("image_url",10), controller.updateBook);
router.put("/create", upload.array("image_url",10), controller.createBook);
router.delete("/delete", controller.deleteBook);

module.exports = router;