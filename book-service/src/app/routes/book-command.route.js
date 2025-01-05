const express = require('express')
const router = express.Router();
const controller = require('../controllers/book-command.controller');
const uploader = require("../services/image-uploader.service");
const upload = uploader.upload;

/**
 * @swagger
 * /books-command/update:
 *   put:
 *     tags:
 *       - books-command
 */
router.put("/update", upload.array("imageFile",10), controller.updateBook);

/**
 * @swagger
 * /books-command/create:
 *   put:
 *     tags:
 *       - books-command
 */
router.put("/create", upload.array("imageFile",10), controller.createBook);

/**
 * @swagger
 * /books-command/create-many:
 *   put:
 *     tags:
 *       - books-command
 */
router.put("/create-many", controller.createManyBook)

/**
 * @swagger
 * /books-command/delete:
 *   delete:
 *     tags:
 *       - books-command
 */
router.delete("/delete", controller.deleteBook);

module.exports = router;