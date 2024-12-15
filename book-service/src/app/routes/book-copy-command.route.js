const express = require('express')
const router = express.Router();
const Controller = require("../controllers/book-copy-command.controller");

router.post("/post-borrow", Controller.borrowCopy);

router.post("/post-return", Controller.returnCopy);

module.exports = router;