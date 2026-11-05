/**
 * 
 * Calcular la media de una serie de números positivos, suponiendo que los datos se leen desde teclado.
Un valor de cero —como entrada— indicará que se ha alcanzado el final de la serie de números positivos y mostrara la media en pantalla.
 * 
 */

function calcularMedia(numeros) {
    let media = 0;
    numeros.forEach(function (numero) {
        media += numero;
    });

    media /= numeros.length;
    return media;
}

const numeros = [];

let numero = 0;
let media = 0;


const divNumeros = document.querySelector("#numeros");
const divMedia = document.querySelector("#media");

numero = Number(prompt("Introduce un numero"));
for (; numero != 0;) {
    numeros.push(numero);
    numero = Number(prompt("Introduce un numero"));
}

media = calcularMedia(numeros);


divNumeros.textContent = numeros;
divMedia.textContent = `Media: ${media}`;