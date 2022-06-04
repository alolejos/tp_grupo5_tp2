'use strict';
const {
  User
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Paciente extends User {
    static associate(models) {

      Paciente.belongsToMany(models.paciente,{
        through: 'NosocomioPaciente'
      })
      
    }
  }
  Paciente.init({
    emergencyData: DataTypes.JSON,
    bloodType: DataTypes.STRING,
    birthDate: DataTypes.STRING,
    userId: {
      type: Sequelize.INTEGER,
      references: { model: 'Users', key: 'id' },
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Paciente',
  });
  return Paciente;
};