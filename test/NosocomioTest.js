const axios = require('axios');
const chai = require('chai');
const { assert } = chai;
const { randCompanyName, randNumber, randFirstName, randPhoneNumber, randPassword, randEmail } = require('@ngneat/falso');

// create a test for the nosocomio creation endpoint 
describe("Test de creación", () => {
    let bussinesName = randCompanyName();
    let name = randFirstName();
    let cuit = randNumber();
    let email = randEmail();
    let password = randPassword();
    let phone = randPhoneNumber();

    it("Entra al test", (done) => {
        console.log("entra al test");
        axios({
            method: 'post',
            url: 'http://localhost:5555/nosocomios/add',
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
            console.log("El usuario si se creó");
            done();
        }).catch((error) => {
            assert.equal(error.response.status, 500);
            console.log("El usuario no se creó");
            done();
        })
    })
});

it("Intenta eliminar", (done) => {
    axios({
        method: 'delete',
        url: 'http://localhost:5555/nosocomios/delete',
        data: {
            nosocomioId: 71,
        },
    })
        .then((response) => {
            assert.equal(response.status, 200);
            console.log("El nosocomio fue borrado");
            done();
        }).catch((error) => {
            assert.equal(error.response.status, 500);
            console.log("El nosocomio no existe");
            done();
        })
});

it("Intenta agregar un médico al nosocomio", (done) => {
    axios({
        method: 'post',
        url: 'http://localhost:5555/nosocomios/addMedicoAlNosocomio',
        data: {
            idNosocomio: 1,
            idMedico: 2
        }
    })
        .then((response) => {
            assert.equal(response.status, 200);
            console.log("El médico fue agregado");
            done();
        }).catch((error) => {
            assert.equal(error.response.status, 500);
            console.log(" El médico no fue agregado");
            done();
        })
})
