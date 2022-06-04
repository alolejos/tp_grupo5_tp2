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