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

// utilizando template strings
console.log(`Número1= ${numero1}`);
console.log(`Numero2= ${numero2}`);
console.log(`la suma es ${suma}`);
console.log(`la resta es ${resta}`);
console.log(`producto = ${producto}`);
console.log(`Cociente = ${cociente}`);