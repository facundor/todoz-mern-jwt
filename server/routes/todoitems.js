const express = require('express')
const router = express.Router()
const todoitemController = require('../controllers/todoitemController')
const { check } = require('express-validator')
const validate = require('../middleware/validation.js')

const checks = [
  check('description', 'The description is required').not().isEmpty(),
  check('done', 'The done field must be a boolean').optional().isBoolean()
]

/**
 * @swagger
 * /api/todoitems:
 *   post:
 *     description: Creates a todo item
 *     tags: [TodoItems]
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: TodoItem object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BaseTodoItem'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetTodoItem'
 *       500:
 *         description: Unexpected server error
 */
router.post('/',
  checks,
  validate,
  todoitemController.create
)

/**
 * @swagger
 * /api/todoitems:
 *   get:
 *     description: Returns the TodoItems of the user
 *     tags: [TodoItems]
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArrayOfGetTodoItem'
 *       500:
 *         description: Unexpected server error
 */
router.get('/',
  todoitemController.getAll
)

/**
 * @swagger
 * /api/todoitems/{id}:
 *   delete:
 *     description: Deletes a TodoItem by id
 *     tags: [TodoItems]
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetTodoItem'
 *       404:
 *         description: TodoItem not found for the user
 *       500:
 *         description: Unexpected server error
 */
router.delete('/:id',
  todoitemController.delete
)

/**
 * @swagger
 * /api/todoitems:
 *   patch:
 *     description: Updates a todo item
 *     tags: [TodoItems]
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: TodoItem object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BaseTodoItem'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetTodoItem'
 *       404:
 *         description: TodoItem not found for the user
 *       500:
 *         description: Unexpected server error
 */
router.patch('/',
  checks,
  validate,
  todoitemController.update
)

module.exports = router
