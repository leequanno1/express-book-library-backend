const express = require('express')
const router = express.Router();
const controller = require("../controllers/authen.controller");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/validate", controller.validate);

module.exports = router;