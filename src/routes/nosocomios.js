const nosocomios = require('../controllers/nosocomio.controller');
const express = require('express');
const router = express.Router();
module.exports = router

router.get("/getAll", nosocomios.getAll);


