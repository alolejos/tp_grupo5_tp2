"use strict";
const { randCompanyName } = require("@ngneat/falso");

const listaObrasSociales = [];
for (let i = 0; i < 50; i++) {
  listaObrasSociales.push({
    name: randCompanyName(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("obras_sociales", listaObrasSociales);
  },

  async down(queryInterface, Sequelize) {
    //return queryInterface.bulkDelete('ObrasSociales', null, {});
  },
};
