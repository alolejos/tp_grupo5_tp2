'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Nosocomio extends Model {

    static associate(models) {
      
      Nosocomio.belongsToMany(models.paciente,{
        through: 'NosocomioPaciente'        
      })

      Nosocomio.belongsToMany(models.medico,{
        through: 'NosocomioMedico'
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