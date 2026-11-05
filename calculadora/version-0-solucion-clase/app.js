/**
 * =============================================================================
 * VERSIÓN 0 (SOLUCIÓN DE CLASE): GUÍA PASO A PASO POR HITOS
 * =============================================================================
 * Autor: Ramón Abramo
 * 
 * Enfoque didáctico de clase:
 * 1. Función pura 'calcular(numero1, numero2, operacion)'.
 * 2. Cuatro variables de estado claras: empezarNumero, operadorPendiente,
 *    numeroAnterior y numeroActual.
 * 3. Selección y recorrido de 3 grupos: numeros, operadores y acciones.
 * 
 * HITOS DE DESARROLLO INCREMENTAL:
 *   [HITO 1] Escribir números en pantalla (teclear dígitos 0-9).
 *   [HITO 2] Guardar memoria previa y elegir la suma (+).
 *   [HITO 3] Resolver el cálculo al pulsar el botón igual (=).
 *   [HITO 4] Añadir resta (-), multiplicación (*) y división (/).
 *   [HITO 5] Operaciones encadenadas automáticas (5 + 3 + 2 = 10).
 *   [HITO 6] Botón de borrado (C): volver a '0'.
 *   [HITO 7] Control de división por cero ('Error').
 * =============================================================================
 */

// =============================================================================
// PREPARATIVOS: FUNCIÓN DE CÁLCULO, ESTADO Y DOM
// =============================================================================

// Función que realiza la operación matemática
function calcular(numero1, numero2, operacion) {
    let resultado = 0;

    switch (operacion) {
        case '+':
            resultado = numero1 + numero2;
            break;
        case '-':
            resultado = numero1 - numero2;
            break;
        case '*':
            resultado = numero1 * numero2;
            break;
        case '/':
            // [HITO 7] Control de división entre cero
            if (numero2 === 0) {
                resultado = 'Error';
            } else {
                resultado = numero1 / numero2;
            }
            break;
    }

    return resultado;
}

// Variables de estado (memoria)
let empezarNumero = false;       // Coloca a true cuando hay que limpiar pantalla tras un operador
let operadorPendiente = null;   // Almacena el operador pendiente a realizar (+, -, *, /)
let numeroAnterior = null;      // Almacena el número en pantalla antes de pulsar el operador
let numeroActual = null;        // Almacena el número actual en pantalla al pulsar operador o igual

// Selección de elementos en el DOM
const numeros = document.querySelectorAll('[data-numero]');
const operadores = document.querySelectorAll('[data-operador]');
const acciones = document.querySelectorAll('[data-accion]');
const pantalla = document.querySelector('output');


// =============================================================================
// [HITO 1] ESCRIBIR NÚMEROS EN PANTALLA
// =============================================================================
// Objetivo: Al pulsar cualquier botón numérico (0-9), escribirlo en la pantalla.
// Si hay un '0' en pantalla o 'empezarNumero' es true, sustituye; si no, concatena.

numeros.forEach(numero => {
    numero.addEventListener('click', () => {
        // Leemos el dígito que hemos pulsado
        const valor = numero.dataset.numero;

        // Comprobamos si tenemos un cero o venimos de pulsar un operador
        if (pantalla.textContent === '0' || empezarNumero) {
            pantalla.textContent = valor;
            empezarNumero = false; // Ya no tiene que borrar la pantalla en los siguientes dígitos
        } else {
            // Concatenamos el dígito detrás de los existentes
            pantalla.textContent += valor;
        }
    });
});
// 🧪 PRUEBA DEL ALUMNO HITO 1: Pulsa 7, 8, 9 ➔ La pantalla muestra "789".


// =============================================================================
// [HITO 2, 4 y 5] OPERADORES PULSADOS (+, -, *, /)
// =============================================================================
// Objetivo: Al pulsar un operador, guardar el número de la pantalla y el operador.
// [HITO 5]: Si ya teníamos un operador pendiente, calcular el subtotal antes de continuar.

operadores.forEach(operador => {
    operador.addEventListener('click', () => {
        const valor = operador.dataset.operador;

        // [HITO 5] Comprobamos si ya teníamos un operador pendiente
        if (operadorPendiente !== null && empezarNumero !== true) {
            numeroActual = Number(pantalla.textContent);
            numeroAnterior = calcular(numeroAnterior, numeroActual, operadorPendiente);
            pantalla.textContent = numeroAnterior;
        } else {
            numeroAnterior = Number(pantalla.textContent);
        }

        // [HITO 2] Almacenamos el operador y activamos la bandera para que el próximo número limpie display
        operadorPendiente = (numeroAnterior === 'Error') ? null : valor;
        empezarNumero = true;
    });
});
// 🧪 PRUEBA DEL ALUMNO HITO 2: Escribe "15", pulsa "+", escribe "4" ➔ En pantalla se ve "4".


// =============================================================================
// [HITO 3 y 6] ACCIONES PULSADAS: IGUAL (=) Y BORRAR (C)
// =============================================================================
acciones.forEach(accion => {
    accion.addEventListener('click', () => {
        const valor = accion.dataset.accion;

        switch (valor) {
            case 'igual':
                // [HITO 3] Comprobar si tenemos operador pendiente para resolver
                if (operadorPendiente !== null) {
                    numeroActual = Number(pantalla.textContent);
                    numeroAnterior = calcular(numeroAnterior, numeroActual, operadorPendiente);
                    pantalla.textContent = numeroAnterior;
                }
                operadorPendiente = null;
                empezarNumero = true;
                break;

            case 'borrar':
                // [HITO 6] Limpiar pantalla y variables
                pantalla.textContent = '0';
                operadorPendiente = null;
                empezarNumero = true;
                break;
        }
    });
});
// 🧪 PRUEBA DEL ALUMNO HITO 3: 7 + 8 = ➔ Muestra 15.
// 🧪 PRUEBA DEL ALUMNO HITO 6: Escribe "999", pulsa "C" ➔ Vuelve a 0.
