'use strict';
const {
  Model
} = require('sequelize');



module.exports = (sequelize, DataTypes) => {
  class MedicoPacientes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
       
      
    }
  }
  MedicoPacientes.init({
    medicoId: DataTypes.INTEGER,
    pacienteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MedicoPacientes',
  });
  return MedicoPacientes;
};