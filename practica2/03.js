// DECLARAR VARIABLES Y CONSTANTES
let nombre = "";
let ciudad = "";


// CONSTANTES QUE APUNTEN AL DOM -> usar querySelector para #mensaje
const pMensaje = document.querySelector("#mensaje");

// ENTRADAS -> pedir nombre y ciudad
nombre = prompt("Introduce tu nombre:");
ciudad = prompt("Introduce tu ciudad:");

// PROCESAMIENTO -> construir la frase

// utilizando concatenación
// mensajeFinal = "Hola " + nombre + ", veo que eres de " + ciudad;

// utilizando template strings
mensajeFinal = `Hola ${nombre}, veo que eres de ${ciudad}`;

// SALIDAS -> insertar el mensaje en el contenido del <p>
pMensaje.innerHTML = mensajeFinal;