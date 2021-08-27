provincias = [
  { text: "Buenos Aires", values: "B" },
  { text: "Capital Federal", values: "C" },
  { text: "Catamarca", values: "K" },
  { text: "Chaco", values: "H" },
  { text: "Chubut", values: "U" },
  { text: "Cordoba", values: "X" },
  { text: "Corrientes", values: "W" },
  { text: "Entre Rios", values: "E" },
  { text: "Formosa", values: "P" },
  { text: "Jujuy", values: "Y" },
  { text: "La Pampa", values: "L" },
  { text: "La Rioja", values: "F" },
  { text: "Mendoza", values: "M" },
  { text: "Misiones", values: "N" },
  { text: "Neuquen", values: "Q" },
  { text: "Rio Negro", values: "R" },
  { text: "Salta", values: "A" },
  { text: "San Juan", values: "J" },
  { text: "San Luis", values: "D" },
  { text: "Santa Cruz", values: "Z" },
  { text: "Santa Fe", values: "S" },
  { text: "Santiago Del Estero", values: "G" },
  { text: "Tierra del Fuego", values: "V" },
  { text: "Tucuman", values: "T" },
];

let indice_provincia = 0;

let data_provincias = [];

const initScriptProvincias = async () => {
  try {
    const provincia = provincias[indice_provincia++];

    console.log("Pidiendo datos de: ", provincia.text);

    let res = await getCodigos(provincia.values);

    if (!res.isAxiosError) {
      if (res.Localidades != undefined) {
        data_provincias.push({
          [provincia.text]: {
            ciudades: res.Localidades,
          },
        });
        console.log("Datos de " + provincia.text + " guardados correctamente");
      } else {
        indice_provincia--;
        `[ - [ERROR: en pedir ${provincias[indice_provincia - 1]}] - ]`;
      }
    } else {
      indice_provincia--;
    }
  } catch (error) {
    console.error(
      `[ - [ERROR: en pedir ${provincias[indice_provincia - 1]}] - ] `
    );
  }

  setTimeout(initScriptProvincias, 5000);

  if (indice_provincia == provincias.length) {
    guardarProvincias(data_provincias);
  }
};

const getCodigos = async (param) => {
  try {
    let res = await axios(
      "https://www6.oca.com.ar/BuscadorCP/WebService.asmx/getCiudades",
      { params: { provincia: param } }
    );
    return res.data;
  } catch (error) {
    console.error(
      "[ - [ERROR: en request códigos postales (getCodigos)] - ]: ",
      error
    );
    return error;
  }
};

const guardarProvincias = async (datos) => {
  let provincias_json = JSON.stringify(datos);
  try {
    let response = await fs.writeFileSync(
      "datos.json",
      provincias_json,
      (err, res) => {
        if (!err) {
          console.error("[ - [ERROR: en writeFile ] - ]: ", err);
        }
        console.log(res);
      }
    );
  } catch (error) {
    console.error(
      "[ - [ERROR: Escribiendo datos (guardarProvincias)] - ]: ",
      error
    );
  }
};

module.exports = initScriptProvincias;
