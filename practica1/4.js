// pedir nos numero por teclado y mostrar en la consola la suma, resta, producto y conciente

// variables

let numero1 = 0;
let numero2 = 0;
let suma = 0;
let resta = 0;
let producto = 0;
let cociente = 0;

// constantes

// entradas
numero1 = Number(prompt("Introduce un numero")); //4
numero2 = Number(prompt("Introduce otro numero")); //2

// procesamiento
suma = numero1 + numero2;
resta = numero1 - numero2;
producto = numero1 * numero2;
cociente = numero1 / numero2;

// salidas
document.write(`Número1= ${numero1}<br>`);
document.write(`Numero2= ${numero2}<br>`);
document.write(`la suma es ${suma}<br>`);
document.write(`la resta es ${resta}<br>`);
document.write(`producto = ${producto}<br>`);
document.write(`Cociente = ${cociente}<br>`);
