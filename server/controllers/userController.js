const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const ErrorHandler = require('../helpers/error')

exports.create = async (req, res, next) => {
  try {
    // Extract email and password
    const { email, password } = req.body

    // Check unique user
    let user = await User.findOne({ email })
    if (user) {
      throw new ErrorHandler(400, 'The user already exists')
    }

    // Create the user
    user = new User(req.body)

    // Hash the password
    const salt = await bcryptjs.genSalt(10)
    user.password = await bcryptjs.hash(password, salt)

    // Save the user
    await user.save()

    // To avoid return the hashed password
    res.json({})
  } catch (error) {
    next(error)
  }
}

exports.getAll = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 })
    res.json(users)
  } catch (error) {
    next(error)
  }
}
