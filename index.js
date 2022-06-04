const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const obraSocialesRouter = require("./src/routes/obrasociales.js");

app.use("/obrasociales", obraSocialesRouter);

// http://localhost:5555/
app.get("/", function (req, res) {
  res.send("hola mundo");
});

app.listen(5555);
