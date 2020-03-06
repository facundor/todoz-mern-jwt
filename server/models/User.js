const mongoose = require('mongoose')
const toJSON = require('../helpers/mongoose')

/**
 * @swagger
 * components:
 *   schemas:
 *     BaseUser:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *     NewUser:
 *       allOf:
 *         - $ref: '#/components/schemas/BaseUser'
 *         - type: object
 *           required:
 *             - password
 *           properties:
 *             password:
 *               type: string
 *               format: password
 *     GetUser:
 *       allOf:
 *         - $ref: '#/components/schemas/BaseUser'
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
 *     ArrayOfGetUser:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/GetUser'
 */
const UsersSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  timestamp: {
    type: Date,
    default: Date.now()
  }
})

UsersSchema.options.toJSON = toJSON

module.exports = mongoose.model('User', UsersSchema)
