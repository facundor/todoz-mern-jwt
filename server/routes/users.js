const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator');
const validate = require("../middleware/validation.js");

/**
 * @swagger
 * /api/users:
 *   post:
 *     description: Creates a user
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: User object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewUser'        
 *     responses:
 *       200:
 *         description: No results
 *       400:
 *         description: The user already exists
 *       500:
 *         description: Unexpected server error
 */
router.post('/', 
    check('firstName', 'The firstName is required').not().isEmpty(),
    check('lastName', 'The lastName is required').not().isEmpty(),
    check('email', 'The email is required').isEmail(),
    check('password', 'The password must contains at least 6 characters').isLength({ min: 6}),
    validate,
    userController.create
);

/**
 * @swagger
 * /api/users:
 *   get:
 *     description: Returns all users
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArrayOfGetUser'
 *       500:
 *         description: Unexpected server error
 */
router.get('/',
    userController.getAll
);

module.exports = router;