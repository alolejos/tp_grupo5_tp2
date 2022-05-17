'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      name: 'Gastón Diamend',
      cuit: '20-34504603-8',
      email: 'gastondiamend@gmail.com',
      password: 'holamundo',
      phone: '1166882233',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Marcelo Gomez',
      cuit: '20-26800606-8',
      email: 'marcelogomez@gmail.com',
      password: 'prueba123',
      phone: '1143892030',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ]);
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
