'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vote extends Model {
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
  Vote.init({
    uuid:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    vote_type: { 
      type: DataTypes.ENUM,
      values: ['up', 'down'],
    },
  }, {
    sequelize,
    tableName: 'votes',
    modelName: 'Vote',
  });
  return Vote;
};