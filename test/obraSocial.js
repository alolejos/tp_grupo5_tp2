const axios = require("axios");
const chai = require("chai");
const { assert } = chai;
const { randCompanyName, randNumber } = require("@ngneat/falso");

describe("Creación Obra Social", () => {
  let obraSocialName = randCompanyName();

  it("retorna 201 si la obra social es guardada", (done) => {
    axios({
      method: "post",
      url: "http://localhost:5555/obrasociales/add",
      data: { name: obraSocialName },
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

  it("retorna 200 si se borró la obra social", (done) => {
    axios({
      method: "delete",
      url: "http://localhost:5555/obrasociales/delete",
      data: {
        id: randNumber({ min: 2, max: 49 }),
      },
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
});
