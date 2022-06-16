'use strict';
//const {randNumber} = require('@ngneat/falso');
const { randFirstName,randLastName,randPhoneNumber,randPassword,randEmail,randNumber, randStreetName, randCity, randCountry} = require('@ngneat/falso');
const models = require('../models');

let direccion = {};
let usuario = {};
let paciente = {};

module.exports = {


  async up (queryInterface, Sequelize) {

    direccion = {
      street: randStreetName(),
      number: randNumber({ min: 1,max:9999 }),
      floor: randNumber({ min: 0,max:30 }),
      apartment: randNumber({ min: 0,max:120 }),
      city: randCity(),
      country: randCountry(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const direccionId = await queryInterface.bulkInsert('addresses', [direccion]);

    usuario = {
      name: randFirstName()+' '+randLastName(),
      cuit: randNumber({ min: 11,max:99 })+'-'+randNumber({ min: 11111111,max:99999999 })+'-'+randNumber({ min: 11,max:99 }),
      email: randEmail(),
      password: randPassword(),
      phone: randPhoneNumber(),
      addressId: direccionId,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const userId = await queryInterface.bulkInsert('users', [usuario]);

    paciente = {
      userId:userId,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const pacienteId = await queryInterface.bulkInsert('pacientes', [paciente]);

    for(var i = 0;i<50;i++){
     
      let newPrescription = {
        firstName: usuario.name,
        lastName: usuario.name,
        affiliateNumber: 12345678,
        details: "Todas las recetas médicas deberán tener nombre de fármaco, dosis e indicaciones para su consumo.",
        pacienteId: pacienteId,
        createdAt: new Date(),
        updatedAt: new Date()

      }

    
     await queryInterface.bulkInsert('prescriptions', [newPrescription]);
    }
    return true;
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
