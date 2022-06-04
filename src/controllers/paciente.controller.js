const models = require('../db/models');

exports.getPacientes = async (req, res) => {
    try {
        const pacientes = await models.Paciente.findAll({
            include: ['User']
        });

        res.status(200).send(pacientes);
    } catch (error){
        res.status(500).send(error);
    }
}

exports.getPacienteById = async (req, res) => {
    let idPaciente = req.params.id;

    try {
        const paciente = await models.Paciente.findOne({
            where: {
                id: idPaciente
            },
            include: ['User']
        });

        console.log("paciente"+paciente);
        res.status(200).send(paciente);
    } catch (error){
        res.status(500).send(error);
    }
}

//Actualiza los datos del paciente
exports.add = async (req,res) => {
    console.log("Recibo datos del paciente");
    let datosPaciente = req.body;

    //Obtengo los campos del usuario
    let name = datosPaciente.name;
    let cuit = datosPaciente.cuit;
    let email = datosPaciente.email;
    let password = datosPaciente.password;
    let phone = datosPaciente.phone;

    //Aca realizaria las validaciones

    //Armo el objeto a insertar
    console.log("Recibo datos del paciente");
    let usuario = {
        name: name,
        cuit: cuit,
        email: email,
        password: password,
        phone: phone,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    
    //Obtengo el usuario por el ID y devuelvo los datos de emergencia
    try {
        let userId;
        //Intento crear el usuario
        models.User.create(usuario).then(function(resultado){
            //Recupero el ID atraves del resultado
            userId = resultado.id;

            //Creo el paciente con el userId
            models.Paciente.create(
                { 
                    userId: userId,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ).then(function(resultado){
                res.status(200).send('Paciente creado');
            });
        });
    } catch (error) {
        console.log("Error al crear al paciente"+error);
        res.status(500).send(error);
    }
}

exports.getPacienteById = async (req, res) => {
    let idPaciente = req.params.id;

    try {
        const paciente = await models.Paciente.findOne({
            where: {
                id: idPaciente
            },
            include: ['User']
        });

        console.log("paciente"+paciente);
        res.status(200).send(paciente);
    } catch (error){
        res.status(500).send(error);
    }
}

//Actualiza los datos del paciente
exports.updateProfile = async (req,res) => {
    let userId = req.body.userId;
    
    //Obtengo el usuario por el ID y devuelvo los datos de emergencia
    try {
        models.Paciente.update(
            { 
                emergencyData: req.body.emergencyData,
                bloodType: req.body.bloodType,
                birthDate: req.body.birthDate
             },
            { where: { id: userId } }
          )
          res.status(200).send('Paciente actualizado');
    } catch (error) {
        res.status(500).send(error);
    }
}