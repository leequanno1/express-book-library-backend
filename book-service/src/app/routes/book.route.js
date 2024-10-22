const express = require('express')
const router = express.Router();
const Controller = require("../controllers/book.controller")

/**
 * @swagger
 * /books/getall:
 *   get:
 *     tags:
 *       - no authorized
 *     summary: Retrieve a list of all books
 *     description: Returns a list of books with details such as price, author, publisher, and genre.
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   price:
 *                     type: number
 *                     description: The current price of the book
 *                     example: 0
 *                   previous_price:
 *                     type: number
 *                     description: The previous price of the book before any discounts
 *                     example: 0
 *                   image_url:
 *                     type: array
 *                     description: URLs of the book's images
 *                     items:
 *                       type: string
 *                       example: "http://example.com/image1.jpg"
 *                   _id:
 *                     type: string
 *                     description: Unique identifier for the book
 *                     example: "6715424b12cbc53974f1cc11"
 *                   title:
 *                     type: string
 *                     description: The title of the book
 *                     example: "title1"
 *                   author:
 *                     type: string
 *                     description: The author of the book
 *                     example: "author1"
 *                   publisher:
 *                     type: string
 *                     description: The publisher of the book
 *                     example: "publisher1"
 *                   genre:
 *                     type: array
 *                     description: The genre(s) of the book
 *                     items:
 *                       type: string
 *                       example: "genre1"
 *                   description:
 *                     type: string
 *                     description: A short description of the book
 *                     example: "abc"
 */
router.get("/getall", Controller.getAll);

/**
 * @swagger
 * /books/getcount:
 *   get:
 *     tags:
 *       - no authorized
 *     summary: Get a count of books within a price range
 *     description: Retrieve a list of books that fall within the specified price range using the "from" and "to" query parameters.
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: number
 *         required: true
 *         description: The minimum price of the books.
 *         example: 0
 *       - in: query
 *         name: to
 *         schema:
 *           type: number
 *         required: true
 *         description: The maximum price of the books.
 *         example: 100
 *     responses:
 *       200:
 *         description: A list of books within the specified price range
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   price:
 *                     type: number
 *                     description: The current price of the book.
 *                     example: 0
 *                   previous_price:
 *                     type: number
 *                     description: The previous price of the book.
 *                     example: 0
 *                   image_url:
 *                     type: array
 *                     description: An array of image URLs associated with the book.
 *                     items:
 *                       type: string
 *                     example: ["https://example.com/image1.jpg"]
 *                   _id:
 *                     type: string
 *                     description: The unique identifier of the book.
 *                     example: "6715424b12cbc53974f1cc11"
 *                   title:
 *                     type: string
 *                     description: The title of the book.
 *                     example: "title1"
 *                   author:
 *                     type: string
 *                     description: The author of the book.
 *                     example: "author1"
 *                   publisher:
 *                     type: string
 *                     description: The publisher of the book.
 *                     example: "publisher1"
 *                   genre:
 *                     type: array
 *                     description: An array of genres that the book belongs to.
 *                     items:
 *                       type: string
 *                     example: ["genre1"]
 *                   description:
 *                     type: string
 *                     description: A brief description of the book.
 *                     example: "abc"
 */
router.get("/get_count", Controller.getCount);

/**
 * @swagger
 * /books/total:
 *   get:
 *     tags:
 *       - no authorized
 *     summary: Get the total number of books
 *     description: Returns the total number of books available in the system.
 *     responses:
 *       200:
 *         description: The total number of books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   description: The total number of books.
 *                   example: 10
 */
router.get("/total", Controller.getTotal);

/**
 * @swagger
 * /books/get-by-id:
 *   get:
 *     tags:
 *       - no authorized
 *     summary: Get book details by ID
 *     description: Retrieve detailed information about a book using its ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the book
 *     responses:
 *       200:
 *         description: Successful response with book details
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
 *                     example: "http://example.com/image1.jpg"
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
 *                     example: "genre1"
 *                 description:
 *                   type: string
 *                   example: "abc"
 */
router.get("/get-by-id", Controller.getById);

/**
 * @swagger
 * /books/get-by-title:
 *   get:
 *     tags:
 *       - no authorized
 *     summary: Get book details by name
 *     description: Retrieve detailed information about a book using its name.
 *     parameters:
 *       - in: query
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: The title of the book
 *     responses:
 *       200:
 *         description: Successful response with book details
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
 *                     example: "http://example.com/image1.jpg"
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
 *                     example: "genre1"
 *                 description:
 *                   type: string
 *                   example: "abc"
 */
router.get("/get-by-title", Controller.getByTitle);

module.exports = router;