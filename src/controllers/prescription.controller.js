const models = require("../db/models");

exports.getAllByPaciente = async(req,res) => {
    let cuitPaciente = req.body.cuit; 

    const usuarioBuscado = await models.User.findOne({
        where: {
            cuit: cuitPaciente
        }
    })

    try{

        const paciente = await models.Paciente.findOne({
            where: {
                userId: usuarioBuscado.id
            },
            include: ['User']
        });

        const prescriptions = await models.Prescription.findAll({
            where:{
                pacienteId: paciente.id
            }
        });
        return res.status(200).send(prescriptions);

    }catch(error){
        res.status(500).send(error);
    }
}

exports.add = async(req,res) =>{
    //let cuitPaciente = req.params; 
    let datosPrescription = req.body;
    let affiliateNumber = datosPrescription.affiliateNumber;
    let details = datosPrescription.details;
    let cuitPaciente = datosPrescription.cuit;
    
    const usuarioBuscado = await models.User.findOne({
        where: {
            cuit: cuitPaciente
        }
    })
   
    const paciente = await models.Paciente.findOne({
        where: {
                userId: usuarioBuscado.id
        },
        include: ['User']
    });

        if(paciente){

            try{

                let newPrescription = {
                    firstName: usuarioBuscado.name,
                    lastName: usuarioBuscado.name,
                    affiliateNumber: affiliateNumber,
                    details: details,
                    pacienteId: paciente.id
                }
                models.Prescription.create(newPrescription).then(function(resultado){
                    return res.status(200).send({"message": 'Receta agregada'});
                 })
                 console.log("quiero saber si salgo de acá");
            }catch(error){
               return res.status(500).send(error);
            }           
        }
}

exports.delete = async(req,res) =>{
    let idPrescription = req.body.id;

    let prescription = await models.Prescription.findOne({
        where: {
            id: idPrescription
        }
    });
    
    if(prescription){
        try{
            models.Prescription.destroy({
                where: {
                    id: idPrescription
                }
            })
            return res.status(200).send({"message": 'Receta eliminada'});
        }catch(error){
            return res.status(500).send({"message": 'Receta no encontrada'});
        }
    }
  
}

exports.getById = async(req,res) =>{
    let idPrescription = req.body.id;

    let prescription = await models.Prescription.findOne({
        where: {
            id: idPrescription
        }
    });
    
    if(prescription){
        try{
            return res.status(200).send(prescription);
        }catch(error){
            return res.status(500).send({"message": 'Receta no encontrada'});
        }
    }
}

exports.update = async(req,res) =>{
    let idPrescription = req.body.id;
    let newDetails = req.body.details;
    
    let prescription = await models.Prescription.findOne({
        where: {
            id: idPrescription
        }
    });

    if(prescription){
        try{
            models.Prescription.update({
                details: newDetails
            },
            {where: {id: prescription.id}})
            return res.status(200).send({"message": 'Receta actualizada'});
    }catch(error){
        return res.status(500).send({"message": 'Receta no encontrada'});
    }
}
}