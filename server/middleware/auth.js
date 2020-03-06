// https://jasonwatmore.com/post/2018/11/28/nodejs-role-based-authorization-tutorial-with-example-api

const expressJwt = require('express-jwt')
const ErrorHandler = require('../helpers/error')

module.exports = authorize

function authorize (roles = []) {
  // roles param can be a single role string (e.g. Role.User or 'User')
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  if (typeof roles === 'string') {
    roles = [roles]
  }

  return [
    // authenticate JWT token and attach user to request object (req.user)
    expressJwt({ secret: process.env.JWTKEY }),

    // authorize based on user role
    (req, res, next) => {
      if (roles.length && !roles.includes(req.user.role)) {
        // user's role is not authorized
        throw new ErrorHandler(401, 'Unauthorized')
      }
      // authentication and authorization successful
      next()
    }
  ]
}
