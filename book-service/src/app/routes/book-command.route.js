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
 *       - need authorized
 *     summary: Update a book's details
 *     description: Updates a book's information, including title, author, publisher, genre, description, price, previous price, and image URL.
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 default: "unknow"
 *                 description: The title of the book.
 *                 example: title1
 *               author:
 *                 type: string
 *                 default: "unknow"
 *                 description: The author of the book.
 *                 example: author1
 *               publisher:
 *                 type: string
 *                 default: "unknow"
 *                 description: The publisher of the book.
 *                 example: publisher1
 *               genre:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of genres.
 *                 example: ["genre1"]
 *               description:
 *                 type: string
 *                 description: A brief description of the book.
 *                 example: abc
 *               price:
 *                 type: number
 *                 default: 0
 *                 description: The price of the book.
 *                 example: 10
 *               previous_price:
 *                 type: number
 *                 default: 0
 *                 description: The previous price of the book.
 *                 example: 15
 *               image_url:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array of image files.
 *                 default: []
 *     responses:
 *       200:
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 price:
 *                   type: number
 *                   example: 10
 *                 previous_price:
 *                   type: number
 *                   example: 15
 *                 image_url:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["/public/image1.img","/public/image2.img"]
 *                 _id:
 *                   type: string
 *                   example: "6715424b12cbc53974f1cc11"
 *                 title:
 *                   type: string
 *                   example: "title1"
 *                 author:
 *                   type: string
 *                   example: "author1"
 *                 publisher:
 *                   type: string
 *                   example: "publisher1"
 *                 genre:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["genre1"]
 *                 description:
 *                   type: string
 *                   example: "abc"
 */
router.put("/update", upload.array("imageFile",10), controller.updateBook);

/**
 * @swagger
 * /books-command/create:
 *   put:
 *     tags:
 *       - need authorized
 *     summary: Create a new book
 *     description: This endpoint allows you to create a new book by sending form-data.
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 default: "unknow"
 *                 description: The title of the book.
 *                 example: "title1"
 *               author:
 *                 type: string
 *                 default: "unknow"
 *                 description: The author of the book.
 *                 example: "author1"
 *               publisher:
 *                 type: string
 *                 default: "unknow"
 *                 description: The publisher of the book.
 *                 example: "publisher1"
 *               genre:
 *                 type: array
 *                 description: The genres of the book.
 *                 items:
 *                   type: string
 *                 example: ["genre1", "genre2"]
 *               description:
 *                 type: string
 *                 description: The description of the book.
 *                 example: "A brief description of the book."
 *               price:
 *                 type: number
 *                 default: 0
 *                 description: The price of the book.
 *                 example: 15.99
 *               previous_price:
 *                 type: number
 *                 default: 0
 *                 description: The previous price of the book.
 *                 example: 20.99
 *               image_url:
 *                 type: array
 *                 description: The images of the book (as files).
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 price:
 *                   type: number
 *                   example: 0
 *                 previous_price:
 *                   type: number
 *                   example: 0
 *                 image_url:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["/public/image1.img","/public/image2.img"]
 *                 _id:
 *                   type: string
 *                   description: The unique identifier for the book.
 *                   example: "6715424b12cbc53974f1cc11"
 *                 title:
 *                   type: string
 *                   example: "title1"
 *                 author:
 *                   type: string
 *                   example: "author1"
 *                 publisher:
 *                   type: string
 *                   example: "publisher1"
 *                 genre:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["genre1"]
 *                 description:
 *                   type: string
 *                   example: "abc"
 */
router.put("/create", upload.array("imageFile",10), controller.createBook);

router.put("/create-many", controller.createManyBook)

/**
 * @swagger
 * /books-command/delete:
 *   delete:
 *     tags:
 *       - need authorized
 *     summary: Delete a book by ID
 *     description: Deletes a book from the database using the provided book ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the book to be deleted.
 *                 example: "123123123123"
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Delete document successfully! Id: 123123123123."
 */
router.delete("/delete", controller.deleteBook);

module.exports = router;