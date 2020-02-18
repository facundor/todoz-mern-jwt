const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');
const validate = require("../middleware/validation.js");
const auth = require('../middleware/auth');

 /**
 * @swagger
 * components:
 *   schemas:
 *     SignInInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *     SignInOutput:
 *       type: object
 *       required:
 *         - token
 *       properties:
 *         token:
 *           type: string
 */

 /**
 * @swagger
 * /api/auth:
 *   post:
 *     description: Token generation
 *     tags: [Auth]
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: SignIn data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignInInput'
 *     responses:
 *       200:
 *         description: Token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignInOutput'
 *       400:
 *         description: User or password not valid
 *       500:
 *         description: Unexpected server error
 */
 router.post('/', 
    check('email', 'The email is required').isEmail(),
    check('password', 'The password must contains at least 6 characters').isLength({ min: 6}),
    validate,
    authController.signIn
);

/**
 * @swagger
 * /api/auth:
 *   get:
 *     description: Token renew
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignInOutput'
 *       401:
 *         description: Invalid token header
 *       500:
 *         description: Unexpected server error
 */
router.get('/',
    auth(),
    authController.tokenRenew
);

module.exports = router;