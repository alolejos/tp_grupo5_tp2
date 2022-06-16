const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))

//Obtengo los routes
const pacientesRouter = require('./src/routes/pacientes');
const obraSocialesRouter = require("./src/routes/obrasociales.js");

const nosocomiosRouter = require('./src/routes/nosocomios.js');

const medicosRouter = require("./src/routes/medicos");
const prescriptionsRouter = require("./src/routes/prescriptions");

//Inicializo routers en app
app.use('/pacientes',pacientesRouter);
app.use("/obrasociales", obraSocialesRouter);

app.use('/nosocomios', nosocomiosRouter);

//Escucho el puerto 5555
app.listen(5555);
app.use("/medicos", medicosRouter);
app.use("/prescriptions", prescriptionsRouter);

//Escucho el puerto 5555
app.listen(5555);

