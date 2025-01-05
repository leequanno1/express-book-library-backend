const express = require('express')
const router = express.Router();
const Controller = require("../controllers/loan.controller");

/**
 * @swagger
 * /loans/send-active-code:
 *   get:
 *     tags:
 *       - loans
 */
router.get("/get-borrowed-page", Controller.getBorrowedPage);

/**
 * @swagger
 * /loans/get-borrowed-total:
 *   get:
 *     tags:
 *       - loans
 */
router.get("/get-borrowed-total", Controller.getBorrowedTotal);

/**
 * @swagger
 * /loans/get-return-page:
 *   get:
 *     tags:
 *       - loans
 */
router.get("/get-return-page", Controller.getReturnPage);

/**
 * @swagger
 * /loans/get-return-total:
 *   get:
 *     tags:
 *       - loans
 */
router.get("/get-return-total", Controller.getReturnTotal);

/**
 * @swagger
 * /loans/get-overdue-page:
 *   get:
 *     tags:
 *       - loans
 */
router.get("/get-overdue-page", Controller.getOverduePage);

/**
 * @swagger
 * /loans/get-overdue-total:
 *   get:
 *     tags:
 *       - loans
 */
router.get("/get-overdue-total", Controller.getOverdueTotal);

/**
 * @swagger
 * /loans/get-all-total:
 *   get:
 *     tags:
 *       - loans
 */
router.get("/get-all-total", Controller.getAllTotal);

module.exports = router;