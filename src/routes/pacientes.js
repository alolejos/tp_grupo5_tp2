const pacientes = require('../controllers/paciente.controller');
const express = require('express');
const router = express.Router();

//Obtengo todos los pacientes
router.get("/getAll", pacientes.getPacientes);
//Obtengo un paciente por id
router.get("/getById/:id", pacientes.getPacienteById);
//Obtengo un paciente por cuit
router.get("/getByCuit/:cuit", pacientes.getPacienteByCuit);
//Obtengo 2 pacientes randoms para pruebas
router.get("/getDosPacientesRandoms", pacientes.getDosPacientesRandoms);

//Creo un paciente
router.post("/add", pacientes.add);

//Elimino por ID
router.delete("/deleteById/:id", pacientes.deleteById);

//Actualizo datos de perfil
router.patch("/updateProfile",pacientes.updateProfile);

module.exports = router