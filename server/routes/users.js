const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator');
const validate = require("../middleware/validation.js");

router.post('/', 
    check('firstName', 'The firstName is required').not().isEmpty(),
    check('lastName', 'The lastName is required').not().isEmpty(),
    check('email', 'The email is required').isEmail(),
    check('password', 'The password must contains at least 6 characters').isLength({ min: 6}),
    validate,
    userController.create
);

router.get('/',
    userController.getAll
);

module.exports = router;