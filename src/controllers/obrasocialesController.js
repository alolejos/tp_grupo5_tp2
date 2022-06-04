const models = require('../db/models');

exports.getAll = async (req, res) => {
  try {
    const listadoObrasSociales = await models.ObraSocial.findAll({});
    return res.status(200).send(listadoObrasSociales);
  } catch (error) {
    return res.status(500).send(error);
  }
};
