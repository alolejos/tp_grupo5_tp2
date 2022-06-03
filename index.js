const PacientesRepository = require('./src/repositories/pacientesRepository');
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pacientesRouter = require('./src/routes/pacientes');
app.use('/pacientes',pacientesRouter);

app.listen(5555);