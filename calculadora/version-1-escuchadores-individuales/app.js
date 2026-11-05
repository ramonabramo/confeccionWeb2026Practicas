/**
 * =============================================================================
 * VERSIÓN 1: CALCULADORA PASO A PASO POR HITOS DE FUNCIONAMIENTO
 * =============================================================================
 * Enfoque: Escuchadores individuales a cada botón (sin burbujeo).
 * 
 * METODOLOGÍA DIDÁCTICA INCREMENTAL:
 * En lugar de escribir todo el código de golpe, construiremos la calculadora
 * comprobando cada función paso a paso como en un proyecto real:
 * 
 *   [HITO 1] Escribir números en pantalla (teclear dígitos 0-9 y verlos en el display).
 *   [HITO 2] La primera operación: La suma (+) y guardar el primer número en memoria.
 *   [HITO 3] Resolver la operación con el botón igual (=) y mostrar el resultado.
 *   [HITO 4] Añadir los demás operadores: Resta (-), Multiplicación (*) y División (/).
 *   [HITO 5] Operaciones encadenadas: recordar la operación anterior (ej: 5 + 3 + 2).
 *   [HITO 6] Botón de borrado (C): reiniciar la memoria a cero.
 *   [HITO 7] Control de errores y casos límite: división por cero y redondeo decimal.
 * =============================================================================
 */

// =============================================================================
// PREPARATIVOS: REFERENCIAS AL DOM Y VARIABLES DE MEMORIA
// =============================================================================
const display = document.getElementById('display');
const botonesNumeros = document.querySelectorAll('[data-numero]');
const botonesOperadores = document.querySelectorAll('[data-operador]');
const botonIgual = document.querySelector('[data-accion="igual"]');
const botonBorrar = document.querySelector('[data-accion="borrar"]');

// Variables de estado (la memoria de la calculadora)
let operandoActual = '0';      // Lo que se muestra actualmente en pantalla
let operandoAnterior = null;   // Número guardado antes de pulsar un operador
let operacion = null;          // Operador guardado ('+', '-', '*', '/')
let reiniciarDisplay = false;  // Si es true, el próximo número sobrescribe la pantalla

// Función visual auxiliar: refresca el display en pantalla
function actualizarDisplay() {
    display.textContent = operandoActual;
}


// =============================================================================
// [HITO 1] ESCRIBIR NÚMEROS EN PANTALLA
// =============================================================================
// Objetivo: Al pulsar cualquier número del 0 al 9, debe escribirse en el display.
// Detalles a tener en cuenta:
// 1. Si la pantalla tiene '0', al pulsar '7' debe mostrar '7', no '07'.
// 2. Si ya hay números, los nuevos se concatenan al final (ej: '1' + '2' = '12').
// 3. Si acabamos de pulsar una operación (reiniciarDisplay === true), el nuevo número
//    reemplaza la pantalla limpia.

function agregarNumero(numero) {
    if (reiniciarDisplay) {
        operandoActual = numero;
        reiniciarDisplay = false;
    } else {
        if (operandoActual === '0') {
            operandoActual = numero;
        } else {
            operandoActual += numero;
        }
    }
    actualizarDisplay();
}

// Conectamos un escuchador a CADA botón numérico:
botonesNumeros.forEach((boton) => {
    boton.addEventListener('click', () => {
        agregarNumero(boton.dataset.numero);
    });
});
// 🧪 PRUEBA DEL ALUMNO HITO 1: Haz clic en 1, 2, 3 -> La pantalla muestra "123".


// =============================================================================
// [HITO 2] LA PRIMERA OPERACIÓN: LA SUMA (+) Y GUARDAR EL PRIMER NÚMERO
// =============================================================================
// Objetivo: Al pulsar '+', la calculadora debe recordar el número que teníamos
// en 'operandoAnterior' y preparar la pantalla para que el siguiente número no se pegue.

function seleccionarOperador(nuevoOperador) {
    // Si ya había una operación pendiente y el alumno ya escribió el 2º número,
    // calculamos antes de cambiar de operador (ver HITO 5).
    if (operacion !== null && !reiniciarDisplay) {
        calcular();
    }

    operandoAnterior = operandoActual; // Guardamos el primer número en memoria
    operacion = nuevoOperador;         // Guardamos el operador ('+', etc.)
    reiniciarDisplay = true;           // Marcamos que el próximo número limpie pantalla
}

// Conectamos los escuchadores a los operadores:
botonesOperadores.forEach((boton) => {
    boton.addEventListener('click', () => {
        seleccionarOperador(boton.dataset.operador);
    });
});
// 🧪 PRUEBA DEL ALUMNO HITO 2: Escribe "15", pulsa "+", escribe "3" -> En pantalla se ve "3" (no "153").


// =============================================================================
// [HITO 3] RESOLVER CON EL BOTÓN IGUAL (=)
// =============================================================================
// Objetivo: Al pulsar '=', recuperamos el primer número ('operandoAnterior'),
// el número actual ('operandoActual'), los convertimos a números reales con parseFloat()
// y realizamos el cálculo.

function calcular() {
    // Si falta el primer operando o el operador, no hay nada que calcular
    if (operacion === null || operandoAnterior === null) return;

    const anterior = parseFloat(operandoAnterior);
    const actual = parseFloat(operandoActual);
    let resultado;

    // [HITO 3 & 4] Evaluamos la operación
    switch (operacion) {
        case '+':
            resultado = anterior + actual;
            break;
        case '-':
            resultado = anterior - actual;
            break;
        case '*':
            resultado = anterior * actual;
            break;
        case '/':
            // [HITO 7] Control de división por cero
            if (actual === 0) {
                resultado = 'Error';
            } else {
                resultado = anterior / actual;
            }
            break;
        default:
            return;
    }

    // [HITO 7] Evitar imprecisiones en números decimales (ej. 0.1 + 0.2)
    if (typeof resultado === 'number') {
        resultado = Math.round(resultado * 100000000) / 100000000;
    }

    operandoActual = resultado.toString();
    operacion = null;
    operandoAnterior = null;
    reiniciarDisplay = true;

    actualizarDisplay();
}

// Conectamos el botón igual (=):
botonIgual.addEventListener('click', () => {
    calcular();
});
// 🧪 PRUEBA DEL ALUMNO HITO 3: Escribe "7", pulsa "+", escribe "8", pulsa "=" -> Muestra "15".


// =============================================================================
// [HITO 4] AÑADIR LOS DEMÁS OPERADORES (-, *, /)
// =============================================================================
// Ya están incluidos dentro del switch de calcular():
// - '-' : anterior - actual
// - '*' : anterior * actual
// - '/' : anterior / actual
// 🧪 PRUEBA DEL ALUMNO HITO 4:
// - Resta: 9 - 4 = 5
// - Multiplicación: 6 * 3 = 18
// - División: 8 / 2 = 4


// =============================================================================
// [HITO 5] OPERACIONES ENCADENADAS: RECORDAR LA ANTERIOR Y ACUMULAR
// =============================================================================
// ¿Qué pasa si el usuario pulsa 5 + 3 + 2 = ?
// Al pulsar el segundo '+', la calculadora detecta que ya había una operación
// pendiente (operacion !== null) y que la pantalla no está reiniciada.
// Por tanto, la función seleccionarOperador() llama automáticamente a calcular()
// antes de guardar el nuevo operador.
// 🧪 PRUEBA DEL ALUMNO HITO 5: Teclea "5" "+" "3" "+" -> Al pulsar el segundo +, la pantalla ya muestra "8".


// =============================================================================
// [HITO 6] BOTÓN DE BORRADO (C): REINICIAR LA MEMORIA A CERO
// =============================================================================
// Objetivo: Al pulsar 'C', devolver la calculadora al estado de fábrica.

function borrar() {
    operandoActual = '0';
    operandoAnterior = null;
    operacion = null;
    reiniciarDisplay = false;
    actualizarDisplay();
}

// Conectamos el botón borrar (C):
botonBorrar.addEventListener('click', () => {
    borrar();
});
// 🧪 PRUEBA DEL ALUMNO HITO 6: Escribe "999", pulsa "C" -> La pantalla vuelve a "0".


// =============================================================================
// [HITO 7] CONTROL DE ERRORES Y CASOS LÍMITE
// =============================================================================
// 1. División entre cero: Si actual === 0 en '/', resultado = 'Error'.
// 2. Redondeo de punto flotante con Math.round para evitar 0.30000000000000004.
// 🧪 PRUEBA DEL ALUMNO HITO 7: Teclea "9" "/" "0" "=" -> La pantalla muestra "Error".
