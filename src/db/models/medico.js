'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medico extends Model {

    static associate(models) {

      Medico.belongsTo(models.User, {
        foreignKey: 'id'
      },
        Medico.belongsToMany(models.Nosocomio, {
          through: 'NosocomioMedico',
          uniqueKey: 'medicoId'
        })
      )

    }
  }
  Medico.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    medicalLicense: {
      type: DataTypes.STRING,
      allowNull: false,

    }
  }, {
    sequelize,
    modelName: 'Medico',
    tableName: 'medicos'
  });
  return Medico;
};