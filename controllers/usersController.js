const { usersService } = require('../services');
const { controllerResponseHandler, asyncHandler, errorHandler } = require('../middleware');



/**
 * @class User Activities Controller
 */

class UsersController{       
  static register = asyncHandler(async (req, res) => {
    try {
        const data = await usersService.register(req.body)
        return controllerResponseHandler(res,true, 201, 'user succesfully registered', data);
    } catch (err) {
      console.log(err);
      return errorHandler(err, req, res);
    }
  });

  static loadUser = asyncHandler(async (req, res) => {
    try {
      const data = await usersService.loadUser(req.user.id)
      return controllerResponseHandler(res,true, 200, 'success', `logged in as ${data.username}`);
    } catch (err) {
      console.log(err);
      return errorHandler(err,req,res);
    }
  });

  static login = asyncHandler(async (req, res) => {
    try {
      const data = await usersService.login(req.body)
      return controllerResponseHandler(res,true, 200, 'user logged in', data);
    }catch (err) {
      console.log(err);
      return errorHandler(err, req, res);
    }
  });

}

module.exports = UsersController;