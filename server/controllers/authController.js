const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const ErrorHandler = require("../helpers/error");
const jwt = require('jsonwebtoken')

const generateToken = (user, res) => {
  const jwtExpires = 5 * 60; // 5 minutes to expire
  const softExpires = 4 * 60; // at 4 min, should be renewed
  const maxRenews = 30; // how many times can renew the token

  // All ok, create and sign JWT token
  const payload = {
      id: user.id,
      email: user.email,
      softexp: Math.floor(Date.now() / 1000) + softExpires,
      rem: user.rem ? user.rem - 1 : maxRenews
  };

  jwt.sign(
    payload,
    process.env.JWTKEY,
    {
      expiresIn: jwtExpires
    },
    (error, token) => {
      if (error) throw error;
      res.json({ token });
    }
  );
}

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

    generateToken(user, res);

  } catch (error) {
    next(error);
  }
};

module.exports.tokenRenew = async (req, res, next) => {
  try {
    console.log("req.user.rem:" + req.user.rem);
    // Avoid infinite renews
    if(req.user.rem > 0) {
      generateToken(req.user, res);
    } else {
      throw new ErrorHandler(401, "Invalid token");
    }
  } catch (error) {
    next(error);
  }
};
