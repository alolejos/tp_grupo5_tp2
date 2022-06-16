'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Nosocomio extends Model {

    static associate(models) {

      Nosocomio.hasOne(models.User, {
        foreignKey: 'id'
      })
      
      Nosocomio.belongsToMany(models.Paciente,{
        through: 'NosocomioPaciente',
        uniqueKey: 'nosocomioId'                
      })

      Nosocomio.belongsToMany(models.Medico,{
        through: 'NosocomioMedico',
        uniqueKey: 'nosocomioId'
      }) 
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