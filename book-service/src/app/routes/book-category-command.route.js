const express = require('express')
const router = express.Router();
const Controller = require("../controllers/book-category-command.controller");

/**
 * @swagger
 * /book-categories-command/put-update:
 *   put:
 *     tags:
 *       - book-categories-command
 */
router.put("/put-update", Controller.updateCategory);

/**
 * @swagger
 * /book-categories-command/post-create:
 *   post:
 *     tags:
 *       - book-categories-command
 */
router.post("/post-create", Controller.createCategorys);

/**
 * @swagger
 * /book-categories-command/delete-delete:
 *   delete:
 *     tags:
 *       - book-categories-command
 */
router.delete("/delete-delete", Controller.deleteCategorys)

module.exports = router;