"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Administrador extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Administrador.hasOne(models.User, { foreignKey: "id" });
    }
  }
  Administrador.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        // references: { model: "Users", key: "id" },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Administrador",
    }
  );
  return Administrador;
};
