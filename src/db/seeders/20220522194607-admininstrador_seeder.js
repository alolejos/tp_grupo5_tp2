"use strict";
const {
  randFirstName,
  randLastName,
  randPhoneNumber,
  randPassword,
  randEmail,
  randNumber,
  randStreetName,
  randCity,
  randCountry,
} = require("@ngneat/falso");

let address = {};
let user = {};
let administrator = {};

module.exports = {
  async up(queryInterface, Sequelize) {
    for (var i = 0; i < 50; i++) {
      address = {
        street: randStreetName(),
        number: randNumber({ min: 1, max: 9999 }),
        floor: randNumber({ min: 0, max: 30 }),
        apartment: randNumber({ min: 0, max: 120 }),
        city: randCity(),
        country: randCountry(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const direccionId = await queryInterface.bulkInsert("addresses", [
        address,
      ]);

      user = {
        name: randFirstName() + " " + randLastName(),
        cuit:
          randNumber({ min: 11, max: 99 }) +
          "-" +
          randNumber({ min: 11111111, max: 99999999 }) +
          "-" +
          randNumber({ min: 11, max: 99 }),
        email: randEmail(),
        password: randPassword(),
        phone: randPhoneNumber(),
        addressId: direccionId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const userId = await queryInterface.bulkInsert("users", [user]);

      administrator = {
        userId: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      queryInterface.bulkInsert("administrators", [administrator]);
    }

    return true;
  },

  async down(queryInterface, Sequelize) {},
};
