const express = require("express");
const router = express.Router();
const controller = require("../controllers/authen.controller");

/**
 * @swagger
 * /v3/register:
 *   post:
 *     tags:
 *       - no authorized
 *     summary: Register a new user
 *     description: Creates a new user with a username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username.
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: mysecretpassword
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 */
router.post("/register", controller.register);

/**
 * @swagger
 * /v3/login:
 *   post:
 *     tags:
 *       - no authorized
 *     summary: Login account
 *     description: Login using username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username.
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: mysecretpassword
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: mytokenheader.mytokenpayload.mytokensignature
 */
router.post("/login", controller.login);

/**
 * @swagger
 * /v3/validate:
 *   post:
 *     tags:
 *       - need authorized
 *     summary: Validate token
 *     description: Validate if access token is valid.
 *     responses:
 *       200:
 *         description: Token is validated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token is valid
 *                 payload:
 *                   type: object
 *                   example: {"id": "6715d6b5122482caa50ec214","username": "leequanno4","role": "admin","iat": 1729532326,"exp": 1729535926}
 */
router.post("/validate", controller.validate);

/**
 * @swagger
 * /v3/update:
 *   put:
 *     tags:
 *       - need authorized
 *     summary: Update user data
 *     description: Update email and fullname
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullname
 *               - email
 *             properties:
 *               fullname:
 *                 type: string
 *                 description: The user's username.
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 description: The user's password.
 *                 example: email@mail.com
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 6715d6b5122482caa50ec214
 *                 username:
 *                   type: string
 *                   example: leequanno4
 *                 fullname:
 *                   type: string
 *                   example: leequanno4
 *                 role:
 *                   type: string
 *                   example: admin
 *                 createdAt:
 *                   type: string
 *                   example: 2024-10-21T04:21:09.816Z
 *                 email:
 *                   type: string
 *                   example: mymail@gmail.com
 */
router.put("/update", controller.update);

/**
 * @swagger
 * /v3/change-password:
 *   put:
 *     tags:
 *       - need authorized
 *     summary: Change user password
 *     description: Change user password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: The user's username.
 *                 example: myoldsecretpassword
 *               newPassword:
 *                 type: string
 *                 description: The user's password.
 *                 example: mynewsecretpassword
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Change password successfuly
*/
router.put("/change-password", controller.changePassword);

/**
 * @swagger
 * /v3/get-info:
 *   get:
 *     tags:
 *       - need authorized
 *     summary: Get account data
 *     description: Get account data
 *     requestBody:
 *     responses:
 *       200:
 *         description: Get account successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 6715d6b5122482caa50ec214
 *                 username:
 *                   type: string
 *                   example: leequanno4
 *                 fullname:
 *                   type: string
 *                   example: leequanno4
 *                 role:
 *                   type: string
 *                   example: admin
 *                 createdAt:
 *                   type: string
 *                   example: 2024-10-21T04:21:09.816Z
 *                 email:
 *                   type: string
 *                   example: mymail@gmail.com
 */
router.get("/get-info", controller.getAccountInfo);

module.exports = router;
