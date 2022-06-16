'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('NosocomioMedicos', {
      nosocomioId: {
        type: Sequelize.INTEGER,
        References: {
          model: 'nosocomios',
          key: 'id'
        }
      },
      medicoId: {
        type: Sequelize.INTEGER,
        References: {
          model: 'medicos',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('NosocomioMedicos');
  }
};