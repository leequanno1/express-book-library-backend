const express = require('express')
const router = express.Router();
const Controller = require("../controllers/book-copy.controller");

// [GET] /book-copy/get-total
/**
 * @swagger
 * /book-copy/get-total:
 *   get:
 *     tags:
 *       - book-copy
 */
router.get("/get-total", Controller.getTotal);

// [GET] /book-copy/get-available-total
/**
 * @swagger
 * /book-copy/get-available-total
 *     tags:
 *       - book-copy
 */
router.get("/get-available-total", Controller.getAvailableTotal);

// [GET] /book-copy/get-copy-info
/**
 * @swagger
 * /book-copy/get-copy-info:
 *   get:
 *     tags:
 *       - book-copy
 */
router.get("/get-copy-info", Controller.getCopyInfo);

// [POST] /book-copy/get-copy-ids
/**
 * @swagger
 * /book-copy/get-copy-ids:
 *   post:
 *     tags:
 *       - book-copy
 */
router.post("/get-copy-ids", Controller.getCopyIds);

module.exports = router;