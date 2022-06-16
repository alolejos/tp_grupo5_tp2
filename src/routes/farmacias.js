const farmacias = require("../controllers/farmaciasController.js");
const express = require("express");
const router = express.Router();

router.get("/getAll", farmacias.getAll);
router.get("/getById/:id", farmacias.getById);
router.delete("/delete", farmacias.delete);
router.patch("/update", farmacias.update);
router.post("/add", farmacias.add);

module.exports = router;
