const obraSociales = require("../controllers/obrasocialesController.js");
const express = require("express");
const router = express.Router();

router.get("/getAll", obraSociales.getAll);

module.exports = router;
