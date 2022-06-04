const models = require("..db/models/medico.js");

exports.getAll = async(req,res) => {
    try{
        const listadoMedicos = await medicos.findAll();
        return res.status(200).send(listadoMedicos);

    }catch(error){
        res.status(500).send(error);
    }
}