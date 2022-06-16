const prescriptions = require("../controllers/prescription.controller");
const express = require('express');
const router = express.Router();

router.get("/getAllByPaciente", prescriptions.getAllByPaciente);
router.post("/add", prescriptions.add);
router.delete("/delete", prescriptions.delete);
router.patch("/update",prescriptions.update);
router.get("/getById", prescriptions.getById);


module.exports = router