"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Farmacia extends Model {
    static associate(models) {
      Farmacia.belongsTo(
        models.User,
        {
          foreignKey: "id",
        }
      );
    }
  }
  Farmacia.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Farmacia",
      tableName: "farmacias",
    }
  );
  return Farmacia;
};
