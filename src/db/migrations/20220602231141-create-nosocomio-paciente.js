'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('NosocomioPacientes', {
      nosocomioId: {
        type: Sequelize.INTEGER,
        References: { 
          model:'nosocomios',
          key: 'id'
        }
      },
      pacienteId: {
        type: Sequelize.INTEGER,
        References: {
          model: 'pacientes',
          key: 'id'
        }
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('NosocomioPacientes');
  }
};