'use strict';

const medico = require("../models/medico");
const paciente = require("../models/paciente");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MedicoPacientes', {
     
      medicoId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Medicos',
          key: 'id'
        }
      },
      pacienteId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Pacientes',
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
    await queryInterface.dropTable('MedicoPacientes');
  }
};