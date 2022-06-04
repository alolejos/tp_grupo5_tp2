const obrasocial = require("../db/models/obrasocial.js");

exports.getAll = async (req, res) => {
  try {
    const listadoObrasSociales = await obrasocial.findAll({});
    console.log(listadoObrasSociales);
    return res.status(200).send(listadoObrasSociales);
  } catch (error) {
    return res.status(500).send(error);
  }
};
