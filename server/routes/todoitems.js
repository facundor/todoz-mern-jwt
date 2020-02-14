const express = require('express');
const router = express.Router();
const todoitemController = require('../controllers/todoitemController');
const { check } = require('express-validator');
const validate = require("../middleware/validation.js");

const checks = [
    check('description', 'The description is required').not().isEmpty(),
    check('done', 'The done field must be a boolean').optional().isBoolean()
]

router.post('/', 
    checks,
    validate,
    todoitemController.create
);

router.get('/',
    todoitemController.getAll
);

router.delete('/:id',
    todoitemController.delete
);

router.patch('/', 
    checks,
    validate,
    todoitemController.update
);

module.exports = router;