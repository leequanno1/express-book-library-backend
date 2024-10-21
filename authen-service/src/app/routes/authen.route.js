const express = require('express')
const router = express.Router();
const controller = require("../controllers/authen.controller");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/validate", controller.validate);
router.put("/update", controller.update);
router.put("/change-password", controller.changePassword);

module.exports = router;