'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Labels extends Model {
    static associate(models) {
      // define association here
      Labels.belongsTo(models.Users,{ foreignKey: 'card_id', targetKey: 'card_id'});
    }
  }
  Labels.init({
    card_id: DataTypes.STRING,
    date: DataTypes.STRING,
    label_id: DataTypes.STRING,
    note: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Labels',
  });
  return Labels;
};