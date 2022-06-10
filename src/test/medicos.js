const axios = require('axios')
const chai = require('chai');
const { assert } = chai;

describe('Agregar Medico', () => {
    let medicalLicense = "L123456"
    
    it ('return 201 if Medico is saved', (done) => {
        axios({
            method : 'post',
            url: 'http://localhost:6001/medicos/add',
            data : {medicalLicense: medicalLicense, userId: 1 }
        }).then(response => {
            assert.equal(response.status, 201)
            done()
        }).catch(err => {
            assert.equal(err.response.status, 422)
            done()
        })
    })

    it ('returns error if card exists', (done) => {
        axios({
            method : 'post',
            url: 'http://localhost:6001/cards',
            data : {medicalLicense: medicalLicense, userId: 1}
        })
        .catch(err => {
            assert.equal(err.response.data, 'MEDICO EXISTE')
            done()
        })
    }) 
})
