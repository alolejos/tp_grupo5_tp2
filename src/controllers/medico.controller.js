const models = require("../db/models");

exports.getAll = async(req,res) => {
    try{
        const listadoMedicos = await models.Medico.findAll({
            include: ['User']
        });
        return res.status(200).send(listadoMedicos);

    }catch(error){
        res.status(500).send(error);
    }
}

exports.add = async(req,res) => {
    let datosMedico = req.body;
    console.log(datosMedico);

    let name = datosMedico.name;
    let cuit = datosMedico.cuit;
    let email = datosMedico.email;
    let password = datosMedico.password;
    let phone = datosMedico.phone;
    let medicalLicense = datosMedico.medicalLicense;

    let usuario = {
        name: name,
        cuit: cuit,
        email: email,
        password: password,
        phone: phone,
        createdAt: new Date(),
        updateAt: new Date()
    };

    try {
        let userId;

        const usuarioBuscado = await models.User.findOne({
            where: {
                cuit: cuit
            }
        })
        //Intento crear el usuario

        if(usuarioBuscado == null){
            models.User.create(usuario).then(function(resultado){
                //Recupero el ID atraves del resultado
                userId = resultado.id;
    
                //Creo el paciente con el userId
                models.Medico.create(
                    { 
                        userId: userId,
                        medicalLicense: medicalLicense,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    }
                ).then(function(resultado){
                    res.status(200).send('Medico creado');
                });
            });
        }else{
            res.status(500).send('El Medico ya existe');
        }
    } catch (error) {
        console.log("Error al crear al medico " + error);
        res.status(500).send(error);
    }

}

exports.getMedicoById = async (req, res) => {
    let idMedico = req.params.id;

    try {
        const medicoBuscado = await models.Medico.findOne({
            where: {
                id: idMedico
            },
            include: ['User']
        });

        console.log("Medico: " + medicoBuscado);
        res.status(200).send(medicoBuscado);
    } catch (error){
        res.status(500).send(error + " - El médico buscado no existe.");
    }
}

exports.getMedicoByCuit = async (req, res) => {
    let cuitMedico = req.params.cuit;

    try {
        const medicoBuscado = await models.Medico.findOne({
            where: {
                cuit: cuitMedico
            },
            include: ['User']
        });

        res.status(200).send("Medico: " + medicoBuscado);
    } catch (error){
        res.status(500).send(error + " - El médico buscado no existe.");
    }
}

exports.delete = async (req,res) => {
    let idMedico = req.body.id;


    try {
        //Busco al médico por el ID
        const medico = await models.Medico.findOne({
            where: {
                id: idMedico
            },
            include: ['User']
        });

        //Si el médico existe, lo elimino primero de la tabla Medico, y luego de la tabla Usuario.
        if(medico){
            console.log("ID del usuario relacionado "+ medico.userId);

            models.Medico.destroy({where:{id:idMedico}});
            models.User.destroy({where:{id:medico.userId}});
            res.status(200).send('Medico eliminado');
        }else{
            res.status(500).send("Medico inexistente");
        }
    } catch (error) {
        console.log("Error al eliminar al medico " + error);
        res.status(500).send(error);
    }
}

exports.update = async (req,res) => {
    let medicoId = req.body.id;
    
    const medico = await models.Medico.findOne({
        where: {
            id: medicoId
        },
        include: ['User']
    });
    //Obtengo el usuario por el ID y devuelvo los datos de emergencia
    try {
        models.User.update(
            { 
                email: req.body.email,
                name: req.body.name
             },
            { where: { id:medico.userId }}
          )
          res.status(200).send('Medico actualizado');
    } catch (error) {
        res.status(500).send(error);
    }
}