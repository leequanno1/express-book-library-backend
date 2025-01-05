const express = require('express')
const router = express.Router();
const Controller = require("../controllers/loan-command.controller");

/**
 * @swagger
 * /loans-command/post-borrow-book:
 *   post:
 *     tags:
 *       - loans-command
 */
router.post("/post-borrow-book", Controller.createLoan);

/**
 * @swagger
 * /loans-command/post-return-book:
 *   post:
 *     tags:
 *       - loans-command
 */
router.post("/post-return-book", Controller.updateLoan);

module.exports = router;