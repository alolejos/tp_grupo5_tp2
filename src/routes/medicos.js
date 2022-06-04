const medicos = require("../controllers/medico.controller");
const express = require('express');
const router = express.Router();

router.get("/getAll", medicos.getAll);


module.exports = router;