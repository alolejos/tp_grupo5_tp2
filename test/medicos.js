const axios = require('axios')
const chai = require('chai');
const { randFirstName,randLastName,randPhoneNumber,randPassword,randEmail,randNumber} = require('@ngneat/falso');
const { assert } = chai;


describe('Tests Varios sobre Medico', () => {

        
    let usuario = {
        name: randFirstName()+' '+randLastName(),
        cuit: randNumber({ min: 11,max:99 })+'-'+randNumber({ min: 11111111,max:99999999 })+'-'+randNumber({ min: 11,max:99 }),
        email: randEmail(),
        password: randPassword(),
        phone: randPhoneNumber(),
        medicalLicense: "L" + randNumber({min: 111111, max: 999999})
      }


    it ('return 200 if Medico is saved', (done) => {
        axios({
            method : 'post',
            url: 'http://localhost:5555/medicos/add',
            data : {
                name: usuario.name,
                cuit: usuario.cuit,
                email: usuario.email,
                password: usuario.password,
                phone: usuario.phone,
                medicalLicense: usuario.medicalLicense
            }
        }).then(response => {
            assert.equal(response.status, 200)
            done()
        }).catch(err => {
            assert.equal(err.response.status, 500)
            done()
        })
    })

    it ('returns error if Medico exists', (done) => {
        axios({
            method : 'post',
            url: 'http://localhost:5555/medicos/add',
            data : {
                name: usuario.name,
                cuit: usuario.cuit,
                email: usuario.email,
                password: usuario.password,
                phone: usuario.phone,
                medicalLicense: usuario.medicalLicense
            }
        }).then(response => {
            assert.equal(response.status, 200)
            done()
        }).catch(err => {
            assert.equal(err.response.data.message, "MEDICO EXISTE")
            done()
        })
    }) 

    it ('returns 200 if Medico is deleted', (done) => {
        axios({
            method : 'delete',
            url: 'http://localhost:5555/medicos/delete',
            data : {
                id: 69
            }
        }).then(response => {
            assert.equal(response.status, 200)
            done()
        }).catch(err => {
            assert.equal(err.response.status, 500)
            done()
        })
    }) 

    it ('returns 200 if Paciente is added', (done) => {
        axios({
            method: 'post',
            url: 'http://localhost:5555/medicos/addPaciente',
            data: {
                id: 1,
                pacienteId: 5
            }
        }).then(response => {
            assert.equal(response.status, 200)
            done()
        }).catch(err => {
            assert.equal(err.response.status, 500)
            done()
        })
    })
})
