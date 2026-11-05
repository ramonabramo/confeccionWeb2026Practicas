// DECLARAR VARIABLES Y CONSTANTES
let nombre = "";
let saludo = "";

// CONSTANTES QUE APUNTEN AL DOM
// No hay en este ejercicio

// ENTRADAS -> usar prompt para pedir el nombre
nombre = prompt("Introduce tu nombre:");

// PROCESAMIENTO -> construir el mensaje de saludo

// Utilizando template strings
saludo = `Hola, ${nombre}. Bienvenido/a.`;

// utilizando concatenación
// saludo = 'Hola,' + nombre + '. Bienvenido/a.';

// SALIDAS -> mostrar el mensaje usando alert
alert(saludo);