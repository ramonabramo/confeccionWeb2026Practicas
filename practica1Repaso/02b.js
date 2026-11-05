// Generador de Citas
/*
Construye una cita con su autor y año, y publícala simultáneamente en tres canales de salida.
•	Solicita la frase, el nombre del autor y el año o contexto histórico.
•	Guarda una categoría fija en una constante.
•	Presenta la cita en consola y alert.
•	Genera la salida con etiquetas HTML básicas mediante una template string e innerHTML.
*/
// variables
let frase = '';
let autor = '';
let anio = '';

// constantes
const CATEGORIA = 'Filosofía';

// constantes al DOM
const spanCategoria = document.querySelector('#categoria');
const spanAutor = document.querySelector('#autor');
const spanFrase = document.querySelector('#frase');
const spanAnio = document.querySelector('#anio');

// entradas
frase = prompt('Ingrese la frase de la cita:');
autor = prompt('Ingrese el nombre del autor:');
anio = prompt('Ingrese el año o contexto histórico:');

// procesamiento

// salidas

// a consola

console.group('Datos entrada');
console.log(`Frase: ${frase}"`);
console.log(`Autor: ${autor}`);
console.log(`Año: ${anio}`);
console.groupEnd();

console.group('Datos en una sola linea');
console.log(`Frase: ${frase}", Autor: ${autor}, Año: ${anio}`);
console.groupEnd();

// a alert

// un solo alert
alert(`Frase: ${frase}", Autor: ${autor}, Año: ${anio}`);

// en tres alerts
// alert(`Frase: ${frase}"`);
// alert(`Autor: ${autor}`);
// alert(`Año: ${anio}`);

// a HTML

spanCategoria.textContent = CATEGORIA;
spanAutor.textContent = autor;
spanFrase.textContent = frase;
spanAnio.textContent = anio;