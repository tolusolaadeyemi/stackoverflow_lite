

const { controllerResponseHandler } = require('./handlers');
const { User } = require('../models');

const checkExistence = async (req, res, next) => {
  const { username } = req.body;

  try {
    const user = await User
  .findOne({
    where: { username },
  })

  if (user) {
    return controllerResponseHandler(res,false, 400, 'username already exists, please choose another one', null);
  }
  } catch (error) {
    console.log(error)
    return controllerResponseHandler(res, false, 500, 'server error')
  }
  next();
};

module.exports = checkExistence;