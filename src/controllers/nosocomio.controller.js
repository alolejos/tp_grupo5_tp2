const models = require('../db/models');

exports.getNosocomios = async (req, res) => {
    try {
        const nosocomios = await models.Nosocomio.findAll({
            include: ['User']
        });

        res.status(200).send(nosocomios);
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
}

exports.getNosocomioById = async (req, res) => {
    try {
        const nosocomio = await models.Nosocomio.findOne({
            where: {
                id: req.params.id
            },
            include: ['User']
        });
        res.status(200).send(nosocomio);
    }
    catch (error) {
        res.status(500).send(error);
    }

}