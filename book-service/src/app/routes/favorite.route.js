const express = require('express')
const router = express.Router();
const Controller = require("../controllers/favorite.controller");

router.post("/post-set-as-favorite", Controller.setAsFavorite);
router.post("/post-remove-favorite", Controller.removeFavorite);

module.exports = router;