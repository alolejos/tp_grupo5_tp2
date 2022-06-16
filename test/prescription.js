const axios = require('axios')
const chai = require('chai');
const {randNumber} = require('@ngneat/falso');
const { assert } = chai;

describe ('Tests Varios sobre Prescription', () => {
    let details = "En todas las recetas médicas debería agregar el nombre del medicamento, la dosis e instrucciones de toma";
    let affiliateNumber = randNumber({min: 111111, max: 999999});
    // let cuit = "71-61661349-54";
    // let idPrescription = randNumber({min: 1, max: 50});

    it('Traigo prescripcion y CUIT randoms para poder realizar el alta y baja de una prescripcion', async () => {
        let idPrescription;
        let cuit;

        axios({
            method : 'get',
            url: 'http://localhost:5555/prescriptions/getCuitAndIdPrescription',
        }).then(response => {
            assert.equal(response.status, 200)

            idPrescription = response.data.idPrescription;
            cuit = response.data.cuit;

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

            done()
        }).catch(err => {
            assert.equal(err.response.status, 500)
            done()
        })
    });
})