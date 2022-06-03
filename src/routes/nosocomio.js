const nosocomios = require('../controllers/nosocomios.controller');
const express = require('express');
const router = express.Router();

router.get("/getAll", async (res,req) => {
    let nosocomiosArray = await nosocomios.getNosocomios();
    res.send(nosocomiosArray);
});
