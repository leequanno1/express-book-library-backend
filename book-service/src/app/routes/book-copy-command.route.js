const express = require('express')
const router = express.Router();
const Controller = require("../controllers/book-copy-command.controller");

/**
 * @swagger
 * /book-copy-command/post-borrow:
 *   post:
 *     tags:
 *       - book-copy-command
 */
router.post("/post-borrow", Controller.borrowCopy);

/**
 * @swagger
 * /book-copy-command/post-return:
 *   post:
 *     tags:
 *       - book-copy-command
 */
router.post("/post-return", Controller.returnCopy);

module.exports = router;