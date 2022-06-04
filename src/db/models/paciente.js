'use strict';
//
const {
  Model
} = require('sequelize');
const Medico = require('./medico');
module.exports = (sequelize, DataTypes) => {

  class Paciente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Paciente.belongsToMany(Medico, {through: MedicoPacientes}),
      Paciente.hasMany(models.Prescription)
      
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