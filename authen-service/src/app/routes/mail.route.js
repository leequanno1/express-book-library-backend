const express = require("express");
const router = express.Router();
const Controller = require("../controllers/mail.controller");

/**
 * @swagger
 * /mail/send-active-code:
 *   get:
 *     tags:
 *       - no authorized
 */
router.get("/send-active-code", Controller.sendActiveCode);

module.exports = router;
