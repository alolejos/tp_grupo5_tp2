const axios = require("axios");
const chai = require("chai");
const { assert } = chai;
const {
  randCompanyName,
  randEmail,
  randNumber,
  randPassword,
  randPhoneNumber,
} = require("@ngneat/falso");

describe("Test sobre las Farmacias", () => {
  let farmaciaName = randCompanyName();
  let farmaciacuit =
    randNumber({ min: 11, max: 99 }) +
    "-" +
    randNumber({ min: 11111111, max: 99999999 }) +
    "-" +
    randNumber({ min: 11, max: 99 });
  let farmaciaemail = randEmail();
  let farmaciapassword = randPassword();
  let farmaciaphone = randPhoneNumber();

  it("retorna 201 si la farmacia es guardada", (done) => {
    axios({
      method: "post",
      url: "http://localhost:5555/farmacias/add",
      data: {
        name: farmaciaName,
        cuit: farmaciacuit,
        email: farmaciaemail,
        password: farmaciapassword,
        phone: farmaciaphone,
      },
    })
      .then((response) => {
        assert.equal(response.status, 201);
        done();
      })
      .catch((err) => {
        assert.equal(err.response.status, 500);
        done();
      });
  });

  it("retorna error si la farmacia ya existe", (done) => {
    axios({
      method: "post",
      url: "http://localhost:5555/farmacias/add",
      data: {
        name: farmaciaName,
        cuit: farmaciacuit,
        email: farmaciaemail,
        password: farmaciapassword,
        phone: farmaciaphone,
      },
    }).catch((err) => {
      assert.equal(err.response.data.message, "FARMACIA_EXIST");
      done();
    });
  });

  it("retorna 200 si se borró la farmacia", (done) => {
    axios({
      method: "delete",
      url: "http://localhost:5555/farmacias/delete",
      data: {
        id: randNumber({ min: 2, max: 49 }),
      },
    })
      .then((response) => {
        assert.equal(response.status, 200);
        console.log("La farmacia se borró");
        done();
      })
      .catch((err) => {
        assert.equal(err.response.status, 500);
        console.log("La farmacia no se borró");
        done();
      });
  });
});
