/**
 * =============================================================================
 * VERSIÓN 2: CALCULADORA PASO A PASO POR HITOS DE FUNCIONAMIENTO
 * =============================================================================
 * Enfoque: Delegación de eventos en el contenedor '.teclado' (Event Bubbling).
 * 
 * METODOLOGÍA DIDÁCTICA INCREMENTAL:
 * Construimos la calculadora comprobando cada hito de funcionamiento:
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
// PREPARATIVOS: SELECTORES DEL DOM Y MEMORIA
// =============================================================================
const display = document.getElementById('display');
const teclado = document.querySelector('.teclado');

// Variables de estado (memoria)
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
// 🧪 PRUEBA DEL ALUMNO HITO 1: Haz clic en 1, 2, 3 -> La pantalla muestra "123".


// =============================================================================
// [HITO 2] LA PRIMERA OPERACIÓN: LA SUMA (+) Y GUARDAR EL PRIMER NÚMERO
// =============================================================================
// Objetivo: Al pulsar '+', la calculadora debe recordar el número que teníamos
// en 'operandoAnterior' y preparar la pantalla para el segundo número.

function seleccionarOperador(nuevoOperador) {
    // [HITO 5] Si ya había una operación pendiente y ya se escribió un segundo número,
    // calculamos primero el resultado antes de continuar:
    if (operacion !== null && !reiniciarDisplay) {
        calcular();
    }

    operandoAnterior = operandoActual; // Guardamos el primer número en memoria
    operacion = nuevoOperador;         // Guardamos el operador ('+', etc.)
    reiniciarDisplay = true;           // El próximo número limpiará la pantalla
}
// 🧪 PRUEBA DEL ALUMNO HITO 2: Escribe "15", pulsa "+", escribe "3" -> En pantalla se ve "3" (no "153").


// =============================================================================
// [HITO 3] RESOLVER CON EL BOTÓN IGUAL (=)
// =============================================================================
// Objetivo: Al pulsar '=', recuperamos 'operandoAnterior', 'operandoActual',
// los convertimos a números con parseFloat() y resolvemos la suma.

function calcular() {
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

    // [HITO 7] Evitar imprecisiones en decimales (ej. 0.1 + 0.2)
    if (typeof resultado === 'number') {
        resultado = Math.round(resultado * 100000000) / 100000000;
    }

    operandoActual = resultado.toString();
    operacion = null;
    operandoAnterior = null;
    reiniciarDisplay = true;

    actualizarDisplay();
}
// 🧪 PRUEBA DEL ALUMNO HITO 3: Escribe "7", pulsa "+", escribe "8", pulsa "=" -> Muestra "15".


// =============================================================================
// [HITO 4] AÑADIR LOS DEMÁS OPERADORES (-, *, /)
// =============================================================================
// Ya están incluidos en el switch de calcular():
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
// Si el usuario pulsa 5 + 3 + 2 =, al pulsar el segundo + se ejecuta
// automáticamente calcular() dentro de seleccionarOperador().
// 🧪 PRUEBA DEL ALUMNO HITO 5: Teclea "5" "+" "3" "+" -> La pantalla ya muestra "8".


// =============================================================================
// [HITO 6] BOTÓN DE BORRADO (C): REINICIAR LA MEMORIA A CERO
// =============================================================================
function borrar() {
    operandoActual = '0';
    operandoAnterior = null;
    operacion = null;
    reiniciarDisplay = false;
    actualizarDisplay();
}
// 🧪 PRUEBA DEL ALUMNO HITO 6: Escribe "999", pulsa "C" -> La pantalla vuelve a "0".


// =============================================================================
// [HITO 7] CONTROL DE ERRORES Y CASOS LÍMITE
// =============================================================================
// - División entre cero controlada (muestra "Error").
// - Redondeo de coma flotante aplicado.
// 🧪 PRUEBA DEL ALUMNO HITO 7: Teclea "9" "/" "0" "=" -> Muestra "Error".


// =============================================================================
// DELEGACIÓN DE EVENTOS EN EL TECLADO (BURBUJEO DE EVENTOS)
// =============================================================================
// Un único escuchador captura los clicks de todas las teclas mediante su dataset:
teclado.addEventListener('click', (evento) => {
    const boton = evento.target.closest('button');
    if (!boton) return;

    const { numero, operador, accion } = boton.dataset;

    if (numero !== undefined) {
        // [HITO 1]
        agregarNumero(numero);
    } else if (operador !== undefined) {
        // [HITO 2, 4 y 5]
        seleccionarOperador(operador);
    } else if (accion === 'igual') {
        // [HITO 3]
        calcular();
    } else if (accion === 'borrar') {
        // [HITO 6]
        borrar();
    }
});
