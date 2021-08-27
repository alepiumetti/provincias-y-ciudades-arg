const datos = require("./datos.json");
const axios = require("axios");

const initScriptCiudades = () => {
  datos.forEach((provincia, index) => {
    console.log(`index`, index);
    let nombre = Object.keys(provincia);
    nombre = nombre[0];
    let ciudades = datos[index][nombre].ciudades;
    ciudades.forEach((ciudad) => {});
  });

  setTimeout(initScriptCiudades, 5000);
};

const getCiudad = async (params) => {
  try {
    let res = await axios.get(
      "https://apis.datos.gob.ar/georef/api/localidades",
      { params: { nombre: params } }
    );
    return res;
  } catch (error) {
    return error;
  }
};

module.exports = initScriptCiudades;
