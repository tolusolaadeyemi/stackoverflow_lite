'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Answer}) {
      this.belongsTo(User, { foreignKey: 'userId'})
      this.belongsTo(Answer, { foreignKey: 'answerId'})
    }
  }
  Comment.init({
    uuid:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    body: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'please enter a valid comment'
        }
      }
    },
  }, {
    sequelize,
    tableName: 'comments',
    modelName: 'Comment',
  });
  return Comment;
};