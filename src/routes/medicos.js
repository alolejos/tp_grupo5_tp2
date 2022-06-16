const medicos = require("../controllers/medico.controller");
const express = require('express');
const router = express.Router();

router.get("/getAll", medicos.getAll);
router.post("/add", medicos.add);
router.get("/getMedicoById", medicos.getMedicoById);
router.get("/getMedicoByCuit/:cuit", medicos.getMedicoByCuit);
router.delete("/delete", medicos.delete);
router.patch("/update",medicos.update);
router.post("/addPaciente", medicos.addPaciente);



module.exports = router;