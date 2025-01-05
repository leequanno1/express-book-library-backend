const express = require("express");
const router = express.Router();
const controller = require("../controllers/authen.controller");
const { upload } = require("../services/image-uploader.service");

/**
 * @swagger
 * /v3/register:
 *   post:
 *     tags:
 *       - no authorized
 */
router.post("/register", controller.register);

/**
 * @swagger
 * /v3/login:
 *   post:
 *     tags:
 *       - no authorized
 */
router.post("/login", controller.login);

/**
 * @swagger
 * /v3/validate:
 *   post:
 *     tags:
 *       - need authorized
 */
router.post("/validate", controller.validate);

/**
 * @swagger
 * /v3/get-infos:
 *   post:
 *     tags:
 *       - need authorized
 */
router.post("/get-infos", controller.getUserInfos)

/**
 * @swagger
 * /v3/get-admin-infos:
 *   post:
 *     tags:
 *       - need authorized
 */
router.post("/get-admin-infos", controller.getAdminInfos)

/**
 * @swagger
 * /v3/get-librarian-infos:
 *   post:
 *     tags:
 *       - need authorized
 */
router.post("/get-librarian-infos", controller.getLibrarianInfos)

/**
 * @swagger
 * /v3/get-reader-infos:
 *   post:
 *     tags:
 *       - need authorized
 */
router.post("/get-reader-infos", controller.getReaderInfos)

/**
 * @swagger
 * /v3/find-user-infos-by-fullname:
 *   post:
 *     tags:
 *       - need authorized
 */
router.post("/find-user-infos-by-fullname", controller.findUserInfosByFullName)

/**
 * @swagger
 * /v3/get-user-infos-by-usernames:
 *   post:
 *     tags:
 *       - need authorized
 */
router.post("/get-user-infos-by-usernames", controller.getUserInfosByUsernames)

/**
 * @swagger
 * /v3/update:
 *   put:
 *     tags:
 *       - need authorized
 */
router.put("/update", upload.array("imageFile",1), controller.update);

/**
 * @swagger
 * /v3/change-password:
 *   put:
 *     tags:
 *       - need authorized
*/
router.put("/change-password", controller.changePassword);

/**
 * @swagger
 * /v3/reset-password:
 *   put:
 *     tags:
 *       - need authorized
 */
router.put("/reset-password", controller.resetPassword);

/**
 * @swagger
 * /v3/get-info:
 *   get:
 *     tags:
 *       - need authorized
 */
router.get("/get-info", controller.getAccountInfo);

/**
 * @swagger
 * /v3/get-total:
 *   get:
 *     tags:
 *       - need authorized
 */
router.get("/get-total", controller.getTotalCount);

/**
 * @swagger
 * /v3/delete-accounts:
 *   delete:
 *     tags:
 *       - need authorized
 */
router.delete("/delete-accounts", controller.deleteAccounts);

/**
 * @swagger
 * /v3/activate-account:
 *   post:
 *     tags:
 *       - need authorized
 */
router.post("/activate-account", controller.activateAccount);

module.exports = router;
