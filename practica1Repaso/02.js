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
const salida = document.querySelector('#salida');

// entradas
frase = prompt('Introduce la frase de la cita:');
autor = prompt('Introduce el nombre del autor:');
anio = prompt('Introduce el año o contexto histórico:');

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
salida.innerHTML = `
<div>
    <h2>Cita</h2>
    <p>Categoria: ${CATEGORIA}</p>
    <p>Frase: ${frase}</p>
    <p>Autor: ${autor}</p>
    <p>Año: ${anio}</p>
</div>
`;