const models = require("../db/models");

exports.getAll = async (req, res) => {
  try {
    const listadoFarmacias = await models.Farmacia.findAll({});
    return res.status(200).send(listadoFarmacias);
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.getById = async (req, res) => {
  let idFarmacia = req.params.id;

  try {
    const farmarcia = await models.Farmacia.findOne({
      where: {
        id: idFarmacia,
      },
    });

    console.log("Farmacia: " + farmarcia);
    res.status(200).send(farmarcia);
  } catch (error) {
    res.status(500).send(error);
  }
};

//Actualiza los datos de una obra social
exports.update = async (req, res) => {
  let farmaciaId = req.body.farmaciaId;

  //Obtengo el usuario por el ID y devuelvo los datos de emergencia
  try {
    models.Farmacia.update(
      { name: req.body.name },
      { where: { id: farmaciaId } }
    );
    res.status(200).send("Farmacia actualizada");
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.add = async (req, res) => {
  let datosFarmacia = req.body;

  let name = datosFarmacia.name;
  let cuit = datosFarmacia.cuit;
  let email = datosFarmacia.email;
  let password = datosFarmacia.password;
  let phone = datosFarmacia.phone;

  let usuario = {
    name: name,
    cuit: cuit,
    email: email,
    password: password,
    phone: phone,
    createdAt: new Date(),
    updateAt: new Date(),
  };

  try {
    let userId;

    const usuarioBuscado = await models.User.findOne({
      where: {
        cuit: usuario.cuit,
      },
    });
    //Intento crear el usuario

    if (!usuarioBuscado) {
      // primero creo el usuario
      models.User.create(usuario).then(function (resultado) {
        // Si el usuario se creo en el then de la promesa captura el id
        userId = resultado.id;

        //Creo la Farmacia con el userId
        models.Farmacia.create({
          userId: userId,
          name: name,
          createdAt: new Date(),
          updatedAt: new Date(),
        }).then(function (resultado) {
          res.status(201).send({ message: "Farmacia creada" });
        });
      });
    } else {
      console.log("Usuario ya existe");
      res.status(500).send({ message: "FARMACIA_EXIST" });
    }
  } catch (error) {
    console.log("Error al crear la Farmacia " + error);
    res.status(500).send({ message: "Error al crear la Farmacia." });
  }
};

exports.delete = async (req, res) => {
  let idFarmacia = req.body.id;

  //Obtengo la obra social por el ID
  try {
    //Busco al obra social por el ID
    const farmacia = await models.Farmacia.findOne({
      where: {
        id: idFarmacia,
      },
    });

    console.log("Datos de Farmacia " + farmacia);

    if (farmacia) {
      models.Farmacia.destroy({ where: { id: idFarmacia } });
      models.User.destroy({ where: { id: farmacia.userId } });
      res.status(200).send("Farmacia eliminada");
    } else {
      res.status(500).send("Farmacia inexistente");
    }
  } catch (error) {
    console.log("Error al eliminar a la Farmacia" + error);
    res.status(500).send(error);
  }
};
