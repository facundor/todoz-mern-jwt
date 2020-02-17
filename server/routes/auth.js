const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');
const validate = require("../middleware/validation.js");
const auth = require('../middleware/auth');

// Token request
router.post('/', 
    check('email', 'The email is required').isEmail(),
    check('password', 'The password must contains at least 6 characters').isLength({ min: 6}),
    validate,
    authController.signIn
);

// Token renew
router.get('/',
    auth(),
    authController.tokenRenew
);

module.exports = router;