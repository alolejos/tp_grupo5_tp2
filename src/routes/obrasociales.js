const obraSociales = require("../controllers/obrasocialesController.js");
const express = require("express");
const router = express.Router();

router.get("/getAll", obraSociales.getAll);
router.get("/getById/:id", obraSociales.getById);
router.delete("/delete", obraSociales.delete);
router.patch("/update", obraSociales.update);
router.post("/add", obraSociales.add);

module.exports = router;
