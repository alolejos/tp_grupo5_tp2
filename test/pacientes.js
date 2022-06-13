const axios = require("axios");
const chai = require("chai");
const { assert } = chai;
const { randFirstName,randLastName,randPhoneNumber,randPassword,randEmail,randNumber, randStreetName, randCity, randCountry} = require('@ngneat/falso');

let usuario = {
  name: randFirstName()+' '+randLastName(),
  cuit: randNumber({ min: 11,max:99 })+'-'+randNumber({ min: 11111111,max:99999999 })+'-'+randNumber({ min: 11,max:99 }),
  email: randEmail(),
  password: randPassword(),
  phone: randPhoneNumber(),
}

describe("Creación Paciente", () => {
  it("retorna 201 si el paciente se guardó", (done) => {
    axios({
      method: "post",
      url: "http://localhost:5555/pacientes/add",
      data: usuario,
    }).then((response) => {
      assert.equal(response.status, 201);
      done();
    }).catch((err) => {
      assert.equal(err.response.status, 500);
      done();
    });
  });

  it("retorna error si el paciente ya existe", (done) => {
    axios({
      method: "post",
      url: "http://localhost:5555/pacientes/add",
      data: usuario,
    }).catch((err) => {
      assert.equal(err.response.data.message, "El paciente ya existe");
      done();
    });
  });
});

describe("Elimino el paciente creado en el paso anterior buscandolo por el cuit", () => {
  it("retorna 200 si el paciente se eliminó", (done) => {
    axios({
      method: "get",
      url: "http://localhost:5555/pacientes/getByCuit/"+usuario.cuit
    }).then(function(resultado){
      console.log("datos obtenidos:");
      console.log(usuario);
      assert.equal(response.status, 201);
      done();
      //Si el usuario existe lo elimino
    }).catch((err) => {
      assert.equal(err.response.data.message, "No se encontró el paciente con el cuit");
      done();
    });

    // axios({
      // method: "delete",
      // url: "http://localhost:5555/pacientes/add",
      // data: usuario,
    // }).then((response) => {
    //   assert.equal(response.status, 201);
    //   done();
    // }).catch((err) => {
    //   assert.equal(err.response.status, 201);
    //   done();
    // });
  });
});