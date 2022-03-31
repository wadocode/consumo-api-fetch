const API_URL = "https://unicorns-api.herokuapp.com/api/v1";

function obtenerUnicornio() {
  fetch(`${API_URL}/unicorns`)
    .then((response) => response.json())
    .then((data) => {
      renderizarUnicornios(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

const renderizarUnicornios = (data) => {
  console.log(data);
  let contenedor = "";
  for (let i = 0; i < data.length; i++) {
    contenedor += `
    <div class="unicornio-card">
        <div class="image-section">
            <img src="${data[i].image}" alt="${data[i].name}">
        </div>
        <div class="identificador">
        <p>${data[i]._id}</p>
        </div>
        <div class="info-section">
          <div class="content">
          <p class="name"><span>Nombre:</span>${data[i].name}</p>
          <p class="power"><span>Poder:</span>${data[i].power}</p>
          <p class="age"><span>Edad:</span>${data[i].age}</p>
        </div>
        <div class="buttons">
          <button id="edit" "button" onclick="updateUnicornio('${data[i]._id}')">Modificar</button>
          <button type="button" onclick="deleteUnicornio('${data[i]._id}')">Eliminar</button>
            </div>
      </div>
    </div>
      `;
  }
  document.getElementById("unicornio-cards").innerHTML = contenedor;
};

// crear unicornio
const inputName = document.querySelector("#name");
const inputPower = document.querySelector("#power");
const inputAge = document.querySelector("#age");
const inputImage = document.querySelector("#image");
const btnCrear = document.querySelector("#btn-crear");
const btnDelete = document.querySelector("#delete");

function crearUnicornio() {
  const inputNameValor = inputName.value;
  const inputPowerValor = inputPower.value;
  const inputAgeValor = inputAge.value;
  const inputImageValor = inputImage.value;

  const unicornio = {
    name: inputNameValor,
    power: inputPowerValor,
    age: inputAgeValor,
    image: inputImageValor,
  };
  const fetchConfig = {
    method: "POST",
    body: JSON.stringify(unicornio),
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(`${API_URL}/unicorns`, fetchConfig)
    .then((result) => result.json())
    .then((result) => {
      cleanInputs();
      obtenerUnicornio();
    })
    .catch((error) => {
      console.log(error);
    });
}
function cleanInputs() {
  inputName.value = "";
  inputPower.value = "";
  inputAge.value = "";
  inputImage.value = "";
}
btnCrear.addEventListener("click", crearUnicornio);
obtenerUnicornio();

//Actualizar unicornio
function updateUnicornio(id) {
  const inputNameValor = inputName.value;
  const inputPowerValor = inputPower.value;
  const inputAgeValor = inputAge.value;
  const inputImageValor = inputImage.value;

  const unicorns = {
    name: inputNameValor,
    power: inputPowerValor,
    age: inputAgeValor,
    image: inputImageValor,
  };
  const fetchConfig = {
    method: "PUT",
    body: JSON.stringify(unicorns),
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(`${API_URL}/unicorns/${id}`, fetchConfig)
    .then((result) => result.json())
    .then((result) => {
      cleanInputs();
      obtenerUnicornio();
    })
    .catch((error) => {
      console.log(error);
    });
  // console.log(unicorns);
}
updateUnicornio();

btnCrear.addEventListener("click", updateUnicornio);

//Eliminar unicornio
function deleteUnicornio(id) {
  console.log(id);
  const fetchConfig = {
    method: "DELETE",
  };
  fetch(`${API_URL}/unicorns/${id}`, fetchConfig)
    .then((result) => result.json())
    .then((result) => {
      // console.log(result);
      alert("Unicornio eliminado");
      obtenerUnicornio();
    })
    .catch((error) => {
      console.log(error);
    });
}

//asignar valores a Inputs
function asignarValores(id) {
  document.getElementById("name").value = id.age;
  console.log(id);
}
asignarValores();
