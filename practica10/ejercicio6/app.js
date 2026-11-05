/**
 * Diseño del algoritmo correspondiente a un programa que suma todos aquellos números leídos mientras no sean
negativos. Utilizar un for
 */

const numeros = [];

let numero = 0;
let suma = 0;

const divNumeros = document.querySelector("#numeros");
const divResultados = document.querySelector("#resultados");

numero = Number(prompt("Introduce un numero"));
for (; numero >= 0;) {
    numeros.push(numero);
    suma += numero;
    numero = Number(prompt("Introduce un numero"));
}

divNumeros.textContent = numeros;
divResultados.textContent = `Suma total: ${suma}`;


