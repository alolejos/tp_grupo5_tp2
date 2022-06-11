const axios = require('axios');
const chai = require('chai');
const { assert } = chai;
const { randCompanyName } = require('@ngneat/falso');

// create a test for the nosocomio creation endpoint 
describe("Test de creación", () => {
    let bussinesName = randCompanyName();
    let name = "random";
    let cuit = 1515151515;
    let email = 'nosocomio@nosocomio.com';
    let password = 555555555;
    let phone = 15555533351;

    it("Entra al test", (done) => {
        console.log("entra al test");
        axios({
            method: 'post',
            url : 'http://localhost:5555/nosocomios/add',
            data: {
                bussinesName: bussinesName,
                name: name,
                cuit: cuit,
                email: email,
                password: password,
                phone: phone,
            }
        }).then((response) => {
            assert.equal(response.status, 200);
            console.log("se crea");
            done();
        }).catch((error) => {
            assert.equal(error.response.status, 500);
            console.log("no se crea una chota");
            done();
        })
    })
});

