const models = require("../db/models");

exports.getAll = async (req, res) => {
  try {
    const listadoObrasSociales = await models.ObraSocial.findAll({});
    return res.status(200).send(listadoObrasSociales);
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.getById = async (req, res) => {
  let idObraSocial = req.params.id;

  try {
    const obraSocial = await models.ObraSocial.findOne({
      where: {
        id: idObraSocial,
      },
    });

    console.log("Obra social: " + obraSocial);
    res.status(200).send(obraSocial);
  } catch (error) {
    res.status(500).send(error);
  }
};

//Actualiza los datos de una obra social
exports.update = async (req, res) => {
  let obraSocialId = req.body.obrasocialId;

  //Obtengo el usuario por el ID y devuelvo los datos de emergencia
  try {
    models.ObraSocial.update(
      { name: req.body.name },
      { where: { id: obraSocialId } }
    );
    res.status(200).send("Obra Social actualizada");
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.add = async (req, res) => {
  // Datos de la Obra Social
  let datosObraSocial = req.body;

  try {
    const obraSocial = await models.ObraSocial.findOne({
      where: {
        name: datosObraSocial.name,
      },
    });

    if (obraSocial) {
      res.status(500).send({ message: "OBRA_SOCIAL_EXIST" });
    } else {
      //Obtengo los campos de la Obra Social
      let name = datosObraSocial.name;
      //Aca realizaria las validaciones

      //Armo el objeto a insertar
      let obraSocialGuardado = {
        name: name,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      //Obtengo el usuario por el ID y devuelvo los datos de emergencia
      models.ObraSocial.create(obraSocialGuardado)
        .then(function (resultado) {
          res.status(201).send("Obra Social creada");
        })
        .catch(function (error) {
          res.status(500).send(error);
        });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.delete = async (req, res) => {
  let idObraSocial = req.body.idObraSocial;

  //Obtengo la obra social por el ID
  try {
    //Busco al obra social por el ID
    const obraSocial = await models.ObraSocial.findOne({
      where: {
        id: idObraSocial,
      },
    });

    console.log("Datos de la Obra Social " + obraSocial);

    if (obraSocial) {
      models.ObraSocial.destroy({ where: { id: idObraSocial } });
      res.status(200).send("Obra Social eliminada");
    } else {
      res.status(500).send("Obra Social inexistente");
    }
  } catch (error) {
    console.log("Error al eliminar a la Obra Social" + error);
    res.status(500).send(error);
  }
};
