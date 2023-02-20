require('dotenv').config();
const bcrypt = require('bcrypt');
const { responseHandler } = require('../middleware');

const utils = require('../utils')

const { User } = require('../models');

/**
 * @class Users Services (logic)
 */

class UsersService{
  static register = async (newUser) => {
    const salt = await bcrypt.genSalt(10);
  
    newUser.password = await bcrypt.hash(newUser.password, salt);
    const insertObj = await User.create(
      {
          username: newUser.username,
          password: newUser.password,
      }
      )

    const payload = {
      user: {
        username: insertObj.dataValues.username,
        created_at: insertObj.dataValues.createdAt,
      },
    };

    return payload;
  };


  static login = async (newUser) => {
      const user = await User
      .findOne({
        where: {username:  newUser.username},
      })
      
      if (!user) {
        throw responseHandler(false, 404, 'user does not exist', null);
      }
    
      const isMatch = await bcrypt.compare(newUser.password, user.password);
    
      if (!isMatch) {
        throw responseHandler(false, 400, 'incorrect password', null);
      }
    
      const jwtPayload = {
          id: user.id,
      };

      const token = utils.getJwtToken(jwtPayload);
      
      const payload = {
          id: user.id,
          username: user.username,
          token
      };

      return payload;
    };

 static loadUser = async (userId, result) => {
    const response = await User.findOne({ where: { id: userId} }, result);

     return response;
  };

}

module.exports = UsersService;