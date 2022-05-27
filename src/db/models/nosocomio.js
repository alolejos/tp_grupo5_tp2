'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Nosocomio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     }
  }
  Nosocomio.init({
    userId: {
      type: DataTypes.INTEGER,
      references: { model: 'Users', key: 'id' },
      allowNull: false
    },
    bussinesName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Nosocomio',
    tableName: 'Nosocomios',
  });
  return Nosocomio;
};