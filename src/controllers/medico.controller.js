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