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

        res.status(200).send(paciente);
    } catch (error){
        res.status(500).send(error);
    }
}

exports.getPacienteByCuit = async (req, res) => {
    let cuit = req.params.cuit;

    try{
        let user = await searchUserByCuit(cuit);
    
        if(user){
            const paciente = await models.Paciente.findOne({where: {userId: user.id}});

            if(paciente){
                res.status(200).send(paciente);
            }else{
                res.status(204).send('Error al obtener el paciente');
            }
        }else{
            res.status(204).send('No se encontró el paciente con el cuit');
        }
    }catch(error){
        res.status(500).send(error);
    }
}

//Actualiza los datos del paciente
exports.add = async (req,res) => {
    let datosPaciente = req.body;

    //Obtengo los campos del usuario
    let name = datosPaciente.name;
    let cuit = datosPaciente.cuit;
    let email = datosPaciente.email;
    let password = datosPaciente.password;
    let phone = datosPaciente.phone;

    //Aca realizaria las validaciones de si existe paciente por DNI
    //Busco si existe el usuario por el cuit
    let usuario = await searchUserByCuit(cuit);

    if(!usuario){
        //Armo el objeto con datos del usuario
        let usuario = {
            name: name,
            cuit: cuit,
            email: email,
            password: password,
            phone: phone,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        try {
            //Creo al usuario y obtengo su ID
            models.User.create(usuario).then(function(resultado){
                //Recupero el ID atraves del resultado
                let userId = resultado.id;

                //Creo el paciente con el userId
                models.Paciente.create(
                    { 
                        userId: userId,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    }
                ).then(function(resultado){
                    res.status(201).send({"message": "Paciente creado"});

                });
            });
        } catch (error) {
            res.status(500).send({"message": error});
        }
    }else{
        res.status(500).send({"message": "El paciente ya existe"});
    }
}

exports.deleteById = async (req,res) => {
    let idPaciente = req.params.id;

    //Obtengo el usuario por el ID y devuelvo los datos de emergencia
    try {
        //Busco al paciente por el ID
        const paciente = await models.Paciente.findOne({
            where: {
                id: idPaciente
            },
            include: ['User']
        });

        if(paciente){
            models.Paciente.destroy({where:{id:idPaciente}});
            models.User.destroy({where:{id:paciente.userId}});
            res.status(200).send('Paciente eliminado');
        }else{
            res.status(500).send({"message": "Paciente inexistente"});
        }
    }catch (error){
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

        res.status(200).send(paciente);
    } catch (error){
        res.status(500).send(error);
    }
}

//Actualiza los datos del paciente
exports.updateProfile = async (req,res) => {
    let pacienteId = req.body.pacienteId;
    console.log("Actualizo el paciente con ID: " + pacienteId);
    
    //Obtengo el usuario por el ID y devuelvo los datos de emergencia
    try {
        console.log('Verifico los demas datos');
        console.log(req.body);
        models.Paciente.update(
            { 
                emergencyData: req.body.emergencyData,
                bloodType: req.body.bloodType,
                birthDate: req.body.birthDate
             },
            { where: { id: pacienteId } }
          )
          res.status(200).send('Paciente actualizado');
    } catch (error) {
        res.status(500).send({"message": "Error al actualizar los datos del paciente"});
    }
}

exports.getDosPacientesRandoms = async (req, res) => {
    try{
        const pacienteRandom1 = await models.Paciente.findOne();
        let siguienteId = pacienteRandom1.id + 1;    
        const pacienteRandom2 = await models.Paciente.findOne({where: {id: siguienteId}});
    
        if(pacienteRandom1 && pacienteRandom2 ){
            const randomData = {
                pacienteRandom1: pacienteRandom1.id,
                pacienteRandom2: pacienteRandom2.id
            }

            res.status(200).send(randomData);
        }else{
            return res.status(500).send({message:"Error al obtener datos randoms"});
        }
    }catch(error){
        return res.status(500).send(error);
    }
}

async function searchUserByCuit(cuit){
    const usuario = await models.User.findOne({where: {cuit: cuit}});
    return usuario;
}