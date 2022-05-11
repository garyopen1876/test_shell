'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      // define association here
      Users.hasMany(models.Labels, { foreignKey: 'card_id' });
    }
  }
  
  Users.init({
    card_id: DataTypes.STRING,
    name: DataTypes.STRING,
    mail: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};