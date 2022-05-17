'use strict';
const {
  User
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Paciente extends User {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Paciente.init({
    datos_emergencia: DataTypes.TEXT,
    grupo_sanguineo: DataTypes.STRING,
    fecha_nac: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Paciente',
  });
  return Paciente;
};