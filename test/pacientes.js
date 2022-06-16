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

describe("Obtengo un paciente random para actualizara los datos de emergencia y otro paciente random para eliminarlo", () => {
  it("Retorna 200 si se pudo actualizar los datos de emergencia", (done) => {
    axios({
      method: "get",
      url: "http://localhost:5555/pacientes/getDosPacientesRandoms",
    }).then(function(response){
      assert.equal(response.status, 200);
      if(response.status == 200 && response.data){
        const objActualizacionDatosEmergencia = {
          pacienteId: response.data.pacienteRandom1,
          emergencyData: JSON.stringify(randText()),
          bloodType: 'A+',
          birthDate: randPastDate()
        }

        axios({
          method: "patch",
          url: "http://localhost:5555/pacientes/updateProfile",
          data: objActualizacionDatosEmergencia,
        }).then(function(response){
          assert.equal(response.status, 200);
          done();
        }).catch((err) => {
          assert.equal(err.response.data.message, "Error al actualizar los datos del paciente");
          done();
        });
      }
    }).catch((err) => {
      assert.equal(err.response.data.message, "Error al actualizar los datos del paciente");
      done();
    });
  });  
});

describe("Obtengo el ID de paciente con el CUIT generado en el metodo anterior y lo elimino", () => {
  //Declaro pacienteId para usarlo en las pruebas siguientes
  let pacienteId;

  it("Retorna 200 si el paciente random fue eliminado", (done) => {
    axios({
      method: "get",
      url: "http://localhost:5555/pacientes/getByCuit/"+usuario.cuit
    }).then(function(response){
      assert.equal(response.status, 200);

      if(response.data){
        pacienteId = response.data.id;

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
      }
    }).catch((err) => {
      assert.equal(err.response.data.message, "No se encontró el usuario con el cuit");
      
    });
  });
});