/* const axios = require("axios");
const chai = require("chai");
const { assert } = chai;
const { randCompanyName, randNumber, randFirstName, randPhoneNumber, randPassword, randEmail } = require('@ngneat/falso');


describe("Creación Obra Social", () => {
  let obraSocialName = randCompanyName();

  it("retorna 201 si la obra social es guardada", (done) => {
    axios({
      method: "post",
      url: "http://localhost:5555/obrasociales/add",
      data: { name: obraSocialName },
    })
      .then((response) => {
        assert.equal(response.status, 200);
        done();
      })
      .catch((err) => {
        assert.equal(err.response.status, 500);
        done();
      });
  });

  it("retorna error si la obra social ya existe", (done) => {
    axios({
      method: "post",
      url: "http://localhost:5555/obrasociales/add",
      data: { name: obraSocialName },
    }).catch((err) => {
      assert.equal(err.response.data.message, "OBRA_SOCIAL_EXIST");
      done();
    });
  });
});
 */