"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ObraSocial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ObraSocial.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ObraSocial",
      tableName: "obras_sociales",
    }
  );
  return ObraSocial;
};
