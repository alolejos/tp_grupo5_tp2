const models = require('../db/models');

exports.getNosocomios = async (req, res) => {
    try {
        const nosocomios = await models.nosocomios.findAll({
            include: ['User']
        });

        res.status(200).send(nosocomios);
    } catch (error){
        res.status(500).send(error);
    }
}

exports.agregarMedicoAlStaff = async(req, res)=>{
    let userId = req.body.userId;
    let agregarMedicoAlStaff = req.body.agregarMedicoAlStaff;

    try {
        models.Nosocomio.post(
            { agregarMedicoAlStaff: agregarMedicoAlStaff},
            {where: {id: userId}}
        )
        res.status(200).send('Medico agregado');
    } catch(error){
        res.status(500).send(error);
    }
}