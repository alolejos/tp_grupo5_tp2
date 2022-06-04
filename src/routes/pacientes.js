const pacientes = require('../controllers/paciente.controller');
const express = require('express');
const router = express.Router();

router.get("/getAll", pacientes.getPacientes);
router.get("/getById/:id", pacientes.getPacienteById);

router.post("/add", pacientes.add);
router.patch("/updateProfile",pacientes.updateProfile);

module.exports = router