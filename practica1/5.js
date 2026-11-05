// pedir nos numero por teclado y mostrar en la consola la suma, resta, producto y conciente

// variables

let numero1 = 0;
let numero2 = 0;
let suma = 0;
let resta = 0;
let producto = 0;
let cociente = 0;

// constantes

// apuntar al ul denominado numeros
const ulNumeros = document.querySelector("#numeros");
// apuntar al ul denominado salidas
const ulSalidas = document.querySelector("#salidas");

// entradas
numero1 = Number(prompt("Introduce un numero")); //4
numero2 = Number(prompt("Introduce otro numero")); //2

// procesamiento
suma = numero1 + numero2;
resta = numero1 - numero2;
producto = numero1 * numero2;
cociente = numero1 / numero2;

// salidas

ulNumeros.innerHTML = `<li>Número1= ${numero1}</li>`;
ulNumeros.innerHTML += `<li>Numero2= ${numero2}</li>`;

ulSalidas.innerHTML = `<li>la suma es ${suma}</li>`;
ulSalidas.innerHTML += `<li>la resta es ${resta}</li>`;
ulSalidas.innerHTML += `<li>producto = ${producto}</li>`;
ulSalidas.innerHTML += `<li>Cociente = ${cociente}</li>`;
