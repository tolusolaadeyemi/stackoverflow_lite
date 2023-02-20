'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User , Question, Comment, Vote}) {
      this.belongsTo(User, { foreignKey: 'userId'})
      this.belongsTo(Question, { foreignKey: 'questionId'})
      this.hasMany(Comment, {foreignKey: 'answerId'})
      this.hasMany(Vote, {foreignKey: 'answerId'})
    }
  }
  Answer.init({
    uuid:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    body: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'please enter a valid answer'
        }
      },
    },
    status: { 
      type: DataTypes.ENUM,
      values: ['accepted', 'rejected'],
      defaultValue: 'rejected',
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'answers',
    modelName: 'Answer',
  });
  return Answer;
};