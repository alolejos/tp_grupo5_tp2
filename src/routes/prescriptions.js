const prescriptions = require("../controllers/prescription.controller");
const express = require('express');
const router = express.Router();

router.get("/getAllByPaciente", prescriptions.getAllByPaciente);
router.get("/getById", prescriptions.getById);
router.get("/getCuitAndIdPrescription", prescriptions.getCuitAndIdPrescription);
router.post("/add", prescriptions.add);
router.delete("/delete", prescriptions.delete);
router.patch("/update",prescriptions.update);




module.exports = router