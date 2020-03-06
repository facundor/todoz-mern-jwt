const mongoose = require('mongoose')
const toJSON = require('../helpers/mongoose')

/**
 * @swagger
 * components:
 *   schemas:
 *     BaseTodoItem:
 *       type: object
 *       required:
 *         - description
 *         - done
 *       properties:
 *         description:
 *           type: string
 *         done:
 *           type: boolean
 *
 *     GetTodoItem:
 *       allOf:
 *         - $ref: '#/components/schemas/BaseTodoItem'
 *         - type: object
 *           required:
 *             - id
 *           properties:
 *             id:
 *               type: string
 *             timestamp:
 *               type: string
 *               format: date-time
 *
 *     ArrayOfGetTodoItem:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/GetTodoItem'
 */
const TodoItemSchema = mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  done: {
    type: Boolean,
    required: true,
    default: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  timestamp: {
    type: Date,
    default: Date.now()
  }
})

TodoItemSchema.options.toJSON = toJSON

module.exports = mongoose.model('TodoItem', TodoItemSchema)
