const res = require('express/lib/response');
const models = require('../db/models');
const nosocomiomedico = require('../db/models/nosocomiomedico');
const metodos = require('./medico.controller');

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

exports.addNosocomio = async (req, res) => {
    let datosNosocomio = req.body;
    try {
        const Nosocomio = await models.Nosocomio.findOne({
            where: {
                bussinesName: datosNosocomio.bussinesName
            }
        });
        if (Nosocomio) {
            res.status(500).send('Error: el Nosocomio ya existe');
        } else {
            let bussinesName = datosNosocomio.bussinesName;
            let name = datosNosocomio.name;
            let cuit = datosNosocomio.cuit;
            let email = datosNosocomio.email;
            let password = datosNosocomio.password;
            let phone = datosNosocomio.phone;

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
                let userId;
                await models.User.create(usuario).then((resultado) => {
                    userId = resultado.id;
                    models.Nosocomio.create({
                        userId: userId,
                        bussinesName: bussinesName,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    }
                    ).then((resultado) => {
                        res.status(200).send('Nosocomio creado');
                    });
                });
            }
            catch (error) {
                res.status(500).send(error);
            }
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
}

exports.deleteNosocomio = async (req, res) => {
    let nosocomioId = req.body.nosocomioId;
    try {
        const nosocomio = await models.Nosocomio.findOne({
            where: {
                id: nosocomioId
            },
            include: ['User']
        });
        if (nosocomio) {
            models.Nosocomio.destroy({ where: { id: nosocomioId } });
            res.status(200).send('Nosocomio eliminado');
        } else {
            res.status(500).send('No existe');
        }
    }
    catch (error) {
        res.status(500).send('El nosocomio no existe');
    }
}

exports.updateNosocomio = async (req, res) => {
    let userId = req.body.userId;
    try {
        models.Nosocomio.update({
            bussinesName: req.body.bussinesName
        },
            { where: { id: userId } })

        res.status(200).send("Nosocomio actualizado");
    }
    catch (error) {
        res.status(500).send(error);

    }
}

exports.addMedicoAlNosocomio = async (req, res) => {
    console.log("Acá")
    let idMedico = req.body.idMedico;
    let idNosocomio = req.body.idNosocomio;
    try {
        const nosocomioBuscado = await models.Nosocomio.findOne({
            where: {
                id: idNosocomio
            },
        });
        console.log("----------Aca abajo esta el Nosocomio")
        console.log("Nosocomio: " + nosocomioBuscado);
        console.log("----------Aca arriba esta el Nosocomio")
        const medicoBuscado = await models.Medico.findOne({
            where: {
                id: idMedico
            },
        });
        console.log("----------Aca abajo esta el medico")
        console.log("Medico: " + medicoBuscado);
        console.log("----------Aca arriba esta el medico")

        if (nosocomioBuscado && medicoBuscado) {
            const NosocomioMedico = {
                MedicoId: idMedico,
                NosocomioId: idNosocomio
            }
            const relacionExistente = await models.NosocomioMedico.findOne({
                where: {
                    MedicoId: idMedico,
                    NosocomioId: idNosocomio
                }
            })
            if (!relacionExistente) {
                models.NosocomioMedico.create(NosocomioMedico).then(function () {
                    res.status(200).send("El médico se agregó al nosocomio");
                });
            } else {
                res.status(208).send(error + "La relación ya existe");
            }
        }
    } catch (error) {
        res.status(500).send("La relación no se pudo concretar");
    }
}