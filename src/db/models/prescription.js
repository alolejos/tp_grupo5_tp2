'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prescription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Prescription.belongsTo(models.Paciente,{
        foreignKey: 'id'
      })
    }
  }
  Prescription.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    affiliateNumber: DataTypes.STRING,
    details: DataTypes.STRING,
    pacienteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Prescription',
  });
  return Prescription;
};