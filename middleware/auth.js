require('dotenv').config();

const { responseHandler, controllerResponseHandler } = require('./handlers');
const JWT = require('jsonwebtoken');


const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];


  // Verify token
  try {
    if (!token) {
      return controllerResponseHandler(res,false, 401, 'user must be logged in', null);
    };
    JWT.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return controllerResponseHandler(res,false, 400, 'invalid token', null);
      }
      req.user = decoded;
      next();
    });
  } catch (err) {
    console.error(`error: ${err}`);
    return controllerResponseHandler(res,false, err.statusCode, err.message, null);

  }
};

module.exports = auth;