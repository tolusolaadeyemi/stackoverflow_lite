'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Question, Answer, Comment, Vote }) {
      this.hasMany(Question, {foreignKey: 'userId'})
      this.hasMany(Answer, {foreignKey: 'userId'})
      this.hasMany(Comment, {foreignKey: 'userId'})
      this.hasMany(Vote, {foreignKey: 'userId'})
    }

  }
  User.init(
    {
    uuid:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumeric: {
          msg: 'username must contain alphanumeric characters only'
        },
        notNull: {
          msg: 'please enter a valid username'
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      notNull: {
        msg: 'please enter a valid password'
      },
    },
  },
  {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};