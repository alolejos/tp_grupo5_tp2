const nosocomios = require('../controllers/nosocomio.controller');
const express = require('express');
const router = express.Router();

router.get("/getAll", nosocomios.getNosocomios);
router.get("/getById/:id", nosocomios.getNosocomioById);
router.post("/add", nosocomios.addNosocomio);
router.delete("/deleteById/:id", nosocomios.deleteNosocomio);
router.patch("/update", nosocomios.updateNosocomio);

module.exports = router