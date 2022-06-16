const axios = require("axios");
const chai = require("chai");
const { assert } = chai;
const { randFirstName,randLastName,randPhoneNumber,randPassword,randEmail,randNumber, randPastDate, randStreetName, randCity, randCountry, randText} = require('@ngneat/falso');

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

//Declaro pacienteId para usarlo en las pruebas siguientes
let pacienteId;

describe("Obtengo el ID de paciente con el CUIT generado en el metodo anterior para realizar las demas acciones", () => {
  it("retorna 200 si el paciente se encontro por el CUIT", (done) => {
    axios({
      method: "get",
      url: "http://localhost:5555/pacientes/getByCuit/"+usuario.cuit
    }).then(function(response){
      assert.equal(response.status, 200);
      if(response.data.id){
        pacienteId = response.data.id;
      }
      done();
    }).catch((err) => {
      assert.equal(err.response.data.message, "No se encontró el usuario con el cuit");
      done();
    });
  });
});

// const objActualizacionDatosEmergencia = {
//   pacienteId: pacienteId,
//   emergencyData: JSON.stringify(randText()),
//   bloodType: 'A+',
//   birthDate: randPastDate()
// }

// describe("Actualizo los datos de emergencia del paciente", () => {
//   it("Retorna 200 si se pudo actualizar los datos de emergencia", (done) => {
//     axios({
//       method: "patch",
//       url: "http://localhost:5555/pacientes/updateProfile",
//       data: objActualizacionDatosEmergencia,
//     }).then(function(response){
//       assert.equal(response.status, 200);
//       done();
//     }).catch((err) => {
//       assert.equal(err.response.data.message, "Error al actualizar los datos del paciente");
//       done();
//     });
//   });  
// });

describe("Obtengo el ID de paciente con el CUIT generado en el metodo anterior y lo elimino", () => {
  it("Retorna 200 si el paciente pudo eliminarse", (done) => {
    axios({
      method: "delete",
      url: "http://localhost:5555/pacientes/deleteById/"+pacienteId
    }).then(function(response){
      assert.equal(response.status, 200);
      done();
    }).catch((err) => {
      assert.equal(err.response.data.message, "Paciente inexistente");
      done();
    });
  });
  
  it("Retorna error si el paciente no pudo eliminarse", (done) => {
    axios({
      method: "delete",
      url: "http://localhost:5555/pacientes/deleteById/"+pacienteId
    }).catch((err) => {
      assert.equal(err.response.data.message, "Paciente inexistente");
      done();
    });
  });
});