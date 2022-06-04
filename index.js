const NosocomioRepository = require('.src/repositories/nosocomiosRepository');
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))

const nosocomiosRouter = require('.src/routes/repositories/nosocomio.js');
app.use('/nosocomios', nosocomiosRouter);

app.listen(5555);