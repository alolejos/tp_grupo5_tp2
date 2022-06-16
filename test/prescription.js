const axios = require('axios')
const chai = require('chai');
const {randNumber} = require('@ngneat/falso');
const { assert } = chai;

describe ('Tests Varios sobre Prescription', () => {

    
    
    let details = "En todas las recetas médicas debería agregar el nombre del medicamento, la dosis e instrucciones de toma";
    let affiliateNumber = randNumber({min: 111111, max: 999999});
    let cuit = "43-21982062-91";
    let idPrescription = 20;

    it ('return 200 if Prescription is added', (done) => {
        axios({
            method : 'post',
            url: 'http://localhost:5555/prescriptions/add',
            data : {
                details: details,
                affiliateNumber: affiliateNumber,
                cuit: cuit
            }
        }).then(response => {
            assert.equal(response.status, 200)
            done()
        }).catch(err => {
            assert.equal(err.response.status, 500)
            done()
        })
    })


    it ('return 200 if Prescription is deleted', (done) => {
        axios({
            method : 'delete',
            url: 'http://localhost:5555/prescriptions/delete',
            data : {
                id: idPrescription
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