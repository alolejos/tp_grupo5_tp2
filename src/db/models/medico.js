'use strict';

const {
  Model
} = require('sequelize');
const Paciente = require('./paciente');

module.exports = (sequelize, DataTypes) => {

  
  class Medico extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Medico.belongsTo(models.User, {
        foreignKey: 'id'
      }),
      Medico.belongsToMany(Paciente, {through: MedicoPacientes})     
      
      //Medico.hasMany(models.paciente, {
        //foreignKey: 'pacienteId'
     // })


    }
  }
  Medico.init({
    userId:{
      type: DataTypes.INTEGER,
      allowNull : false,
    } ,
    medicalLicense: {
      type: DataTypes.STRING,
      allowNull : false,

    }
  }, {
    sequelize,
    modelName: 'Medico',
    tableName: 'medicos'
  });
  return Medico;
};