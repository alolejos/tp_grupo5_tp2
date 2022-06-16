const axios = require('axios');
const chai = require('chai');
const { assert } = chai;
const { randCompanyName, randNumber, randFirstName, randPhoneNumber, randPassword, randEmail } = require('@ngneat/falso');

// create a test for the nosocomio creation endpoint 
describe("Test", () => {
    let bussinesName = randCompanyName();
    let name = randFirstName();
    let cuit = randNumber();
    let email = randEmail();
    let password = randPassword();
    let phone = randPhoneNumber();

    it("Creation test", (done) => {
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
            console.log("The user was created");
            done();
        }).catch((error) => {
            assert.equal(error.response.status, 500);
            console.log("The user was not created");
            done();
        })
    })
});

it("Trying to delete", (done) => {
    axios({
        method: 'delete',
        url: 'http://localhost:5555/nosocomios/delete',
        data: {
            nosocomioId: 71,
        },
    })
        .then((response) => {
            assert.equal(response.status, 200);
            console.log("The hospital was deleted");
            done();
        }).catch((error) => {
            assert.equal(error.response.status, 500);
            console.log("The hospital does not exist");
            done();
        })
});

it("Trying to add a doctor to the hospital", (done) => {
    axios({
        method: 'post',
        url: 'http://localhost:5555/nosocomios/addMedicoAlNosocomio',
        data: {
            idNosocomio: 3,
            idMedico: 3
        }
    })
        .then((response) => {
            assert.equal(response.status, 200);
            console.log("The doctor was added");
            done();
        }).catch((error) => {
            assert.equal(error.response.status, 500);
            console.log("The doctor was not added");
            done();
        })
})
