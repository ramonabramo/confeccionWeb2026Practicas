// DECLARAR VARIABLES Y CONSTANTES -> crear variables para numeros y resultados
let numero1 = 0;
let numero2 = 0;
let suma = 0;
let resta = 0;
let producto = 0;
let cociente = 0;

// CONSTANTES QUE APUNTEN AL DOM
// No hay en este ejercicio

// ENTRADAS -> usar prompt para pedir dos números
numero1 = Number(prompt("Introduce el primer número:"));
numero2 = Number(prompt("Introduce el segundo número:"));

// PROCESAMIENTO -> calcular suma, resta, producto y cociente
suma = numero1 + numero2;
resta = numero1 - numero2;
producto = numero1 * numero2;
cociente = numero1 / numero2;

// SALIDAS -> mostrar los resultados con document.write()

// utilizando concatenación
// document.write('Suma = ' + suma + '<br>');
// document.write('Resta = ' + resta + '<br>');
// document.write('Producto = ' + producto + '<br>');
// document.write('Cociente = ' + cociente + '<br>');

// Utilizando template strings
document.write(`Suma = ${suma} <br>`);
document.write(`Resta = ${resta} <br>`);
document.write(`Producto = ${producto} <br>`);
document.write(`Cociente = ${cociente} <br>`);