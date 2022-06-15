'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('NosocomioMedicos', {
      nosocomioId: {
        type: Sequelize.INTEGER,
        References: { 
          model:'nosocomios',
          key: 'id'
        }},
      medicoId: {
        type: Sequelize.INTEGER,
        References: {
        model:'medicos',
        key: 'id'
      }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('NosocomioMedicos');
  }
};