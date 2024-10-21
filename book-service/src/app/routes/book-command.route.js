const express = require('express')
const router = express.Router();
const controller = require('../controllers/book-command.controller');

router.put("/update", controller.updateBook);
router.put("/create", controller.createBook);
router.delete("/delete", controller.deleteBook);

module.exports = router;