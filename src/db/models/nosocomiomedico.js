'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NosocomioMedico extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  NosocomioMedico.init({
    nosocomioId: DataTypes.INTEGER,
    medicoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'NosocomioMedico',
  });
  return NosocomioMedico;
};