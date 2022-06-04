'use strict';
// const {
//   User
// } = require('sequelize');
const {Model} = require('sequelize');
const PacientesRepository = require('../../repositories/pacientesRepository');
module.exports = (sequelize, DataTypes) => {
  class Paciente extends Model {
    static associate(models) {

      Paciente.hasOne(models.User, {foreignKey: 'id'});
      Paciente.belongsToMany(models.Nosocomio,{
        through: 'NosocomioPaciente',
        uniqueKey: 'pacienteId'
      });
  }}
  Paciente.init({
    emergencyData: DataTypes.JSON,
    bloodType: DataTypes.STRING,
    birthDate: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      // references: { model: 'Users', key: 'id' },
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Paciente',
  });
  
  return Paciente;
};