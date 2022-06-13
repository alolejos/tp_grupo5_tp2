const pacientes = require('../controllers/paciente.controller');
const express = require('express');
const router = express.Router();

router.get("/getAll", pacientes.getPacientes);
router.get("/getById/:id", pacientes.getPacienteById);
router.get("/getByCuit/:cuit", pacientes.getPacienteByCuit);

router.post("/add", pacientes.add);
router.delete("/deleteById/:id", pacientes.deleteById);
router.patch("/updateProfile",pacientes.updateProfile);

module.exports = router