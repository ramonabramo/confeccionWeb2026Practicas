// DECLARAR VARIABLES Y CONSTANTES
let anioNacimiento = 0;
let anioActual = 2026;
let edadCalculada = 0;

// CONSTANTES QUE APUNTEN AL DOM -> usar querySelector para #edad
const pEdad = document.querySelector("#edad");


// ENTRADAS -> pedir año de nacimiento
anioNacimiento = Number(prompt("Introduce tu año de nacimiento:"));
// anioNacimiento = parseInt(prompt("Introduce tu año de nacimiento:"));
// anioNacimiento = parseFloat(prompt("Introduce tu año de nacimiento:"));

// PROCESAMIENTO -> restar año actual - año de nacimiento
edadCalculada = anioActual - anioNacimiento;

// SALIDAS -> mostrar la edad en el <p>
pEdad.innerHTML = `Tu edad aproximada es de ${edadCalculada} años.`;

// salida a consola




