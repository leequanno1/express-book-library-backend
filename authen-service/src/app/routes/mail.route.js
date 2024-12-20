const express = require("express");
const router = express.Router();
const Controller = require("../controllers/mail.controller");

router.get("/send-active-code", Controller.sendActiveCode);

module.exports = router;
