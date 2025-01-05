const express = require("express");
const router = express.Router();
const Controller = require("../controllers/book-category.controller");

/**
 * @swagger
 * /book-categories/get-all:
 *   get:
 *     tags:
 *       - book-categories
 */
router.get("/get-all", Controller.getAll);

/**
 * @swagger
 * /book-categories/get-total:
 *   get:
 *     tags:
 *       - book-categories
 */
router.get("/get-total", Controller.getTotal);

/**
 * @swagger
 * /book-categories/get-count:
 *   get:
 *     tags:
 *       - book-categories
 */
router.get("/get-count", Controller.getCount);

/**
 * @swagger
 * /book-categories/post-get-by-ids:
 *   get:
 *     tags:
 *       - book-categories
 */
router.post("/post-get-by-ids", Controller.postGetByIds);

/**
 * @swagger
 * /book-categories/get-by-name:
 *   get:
 *     tags:
 *       - book-categories
 */
router.get("/get-by-name", Controller.getByName);

/**
 * @swagger
 * /book-categories/get-large-amount-category:
 *   get:
 *     tags:
 *       - book-categories
 */
router.get("/get-large-amount-category", Controller.getLargeAmount);

module.exports = router;