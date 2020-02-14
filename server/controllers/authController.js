const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const ErrorHandler = require("../helpers/error");
const jwt = require('jsonwebtoken')

module.exports.signIn = async (req, res, next) => {
  try {
    // Extract email and password
    const { email, password } = req.body;

    // Check the user is registered
    let user = await User.findOne({ email });
    if (!user) {
      console.log("ERROR: User not exits");
      throw new ErrorHandler(400, "User or password not valid");
    }

    // Check the password
    const passOk = await bcryptjs.compare(password, user.password);
    if (!passOk) {
      console.log("ERROR: Password not matches");
      throw new ErrorHandler(400, "User or password not valid");
    }

    // All ok, create and sign JWT token
    const payload = {
        id: user.id,
        email: user.email
    };

    jwt.sign(
      payload,
      process.env.JWTKEY,
      {
        expiresIn: 3600 // 1 hour
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );

  } catch (error) {
    next(error);
  }
};
