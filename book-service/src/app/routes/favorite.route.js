const express = require('express')
const router = express.Router();
const Controller = require("../controllers/favorite.controller");

/**
 * @swagger
 * /favorite/post-set-as-favorite:
 *   post:
 *     tags:
 *       - favorite
 */
router.post("/post-set-as-favorite", Controller.setAsFavorite);

/**
 * @swagger
 * /favorite/post-remove-favorite:
 *   post:
 *     tags:
 *       - favorite
 */
router.post("/post-remove-favorite", Controller.removeFavorite);

/**
 * @swagger
 * /favorite/post-get-favorites:
 *   post:
 *     tags:
 *       - favorite
 */
router.post("/post-get-favorites", Controller.getFavorites);

/**
 * @swagger
 * /favorite/post-check-favorite:
 *   post:
 *     tags:
 *       - favorite
 */
router.post("/post-check-favorite", Controller.checkFavorite);

module.exports = router;