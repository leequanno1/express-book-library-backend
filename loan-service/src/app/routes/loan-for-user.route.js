const express = require('express')
const router = express.Router();
const Controller = require("../controllers/loan-for-reader.controller");

/**
 * @swagger
 * /loans-for-user/get-borrowed-page:
 *   get:
 *     tags:
 *       - loans-for-user
 */
router.get("/get-borrowed-page", Controller.getBorrowedPage);

/**
 * @swagger
 * /loans-for-user/get-borrowed-total:
 *   get:
 *     tags:
 *       - loans-for-user
 */
router.get("/get-borrowed-total", Controller.getBorrowedTotal);

/**
 * @swagger
 * /loans-for-user/get-return-page:
 *   get:
 *     tags:
 *       - loans-for-user
 */
router.get("/get-return-page", Controller.getReturnPage);

/**
 * @swagger
 * /loans-for-user/get-return-total:
 *   get:
 *     tags:
 *       - loans-for-user
 */
router.get("/get-return-total", Controller.getReturnTotal);

/**
 * @swagger
 * /loans-for-user/get-overdue-page:
 *   get:
 *     tags:
 *       - loans-for-user
 */
router.get("/get-overdue-page", Controller.getOverduePage);

/**
 * @swagger
 * /loans-for-user/get-overdue-total:
 *   get:
 *     tags:
 *       - loans-for-user
 */
router.get("/get-overdue-total", Controller.getOverdueTotal);

/**
 * @swagger
 * /loans-for-user/get-all-total:
 *   get:
 *     tags:
 *       - loans-for-user
 */
router.get("/get-all-total", Controller.getAllTotal)

module.exports = router;