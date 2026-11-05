/**
 * 
 * Calcular la media de una serie de números positivos, suponiendo que los datos se leen desde teclado.
Un valor de cero —como entrada— indicará que se ha alcanzado el final de la serie de números positivos y mostrara la media en pantalla.
 * 
 */


const numeros = [];

let numero = 0;

let media = 0;
let contador = 0;
let suma = 0;

const divNumeros = document.querySelector("#numeros");
const divMedia = document.querySelector("#media");

numero = Number(prompt("Introduce un numero"));
for (contador = 0; numero != 0; contador++) {
    numeros.push(numero);
    suma += numero;
    numero = Number(prompt("Introduce un numero"));
}

media = suma / contador;


divNumeros.textContent = numeros;
divMedia.textContent = `Media: ${media}`;