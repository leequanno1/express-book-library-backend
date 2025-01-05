const express = require('express')
const router = express.Router();
const Controller = require("../controllers/book.controller")

/**
 * @swagger
 * /books/getall:
 *   get:
 *     tags:
 *       - books
 */
router.get("/getall", Controller.getAll);

/**
 * @swagger
 * /books/get_count:
 *   get:
 *     tags:
 *       - books
 */
router.get("/get_count", Controller.getCount);

/**
 * @swagger
 * /books/total:
 *   get:
 *     tags:
 *       - books
 */
router.get("/total", Controller.getTotal);

/**
 * @swagger
 * /books/get-by-title:
 *   get:
 *     tags:
 *       - books
 */
router.get("/get-by-title", Controller.getByTitle);

/**
 * @swagger
 * /books/post-get-by-id:
 *   post:
 *     tags:
 *       - books
 */
router.post("/post-get-by-id", Controller.getByIds);

/**
 * @swagger
 * /books/post-get-by-category-ids:
 *   post:
 *     tags:
 *       - books
 */
router.post("/post-get-by-category-ids", Controller.getByCategoryIds)

module.exports = router;