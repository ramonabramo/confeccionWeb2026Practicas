/**
 * =============================================================================
 * VERSIÓN 2 (SOLUCIÓN): DELEGACIÓN DE EVENTOS (BURBUJEO)
 * =============================================================================
 * Este archivo contiene la solución completa usando 1 solo addEventListener
 * en el contenedor '.teclado' aprovechando el borboteo de eventos.
 */

// -----------------------------------------------------------------------------
// PASO 1: SELECCIÓN DE ELEMENTOS DEL DOM
// -----------------------------------------------------------------------------
const display = document.getElementById('display');
const teclado = document.querySelector('.teclado');

// -----------------------------------------------------------------------------
// PASO 2: VARIABLES DE ESTADO (MEMORIA DE LA CALCULADORA)
// -----------------------------------------------------------------------------
let operandoActual = '0';      // Lo que se muestra actualmente en pantalla
let operandoAnterior = null;   // Número guardado antes de pulsar un operador
let operacion = null;          // Operador activo ('+', '-', '*', '/')
let reiniciarDisplay = false;  // Indica si el próximo dígito debe sobrescribir la pantalla

// -----------------------------------------------------------------------------
// PASO 3: ACTUALIZACIÓN DE LA INTERFAZ (UI)
// -----------------------------------------------------------------------------
function actualizarDisplay() {
    display.textContent = operandoActual;
}

// -----------------------------------------------------------------------------
// PASO 4: FUNCIONES DE LÓGICA
// -----------------------------------------------------------------------------

/**
 * Agrega un dígito numérico a la pantalla
 * @param {string} numero - Dígito del '0' al '9'
 */
function agregarNumero(numero) {
    if (reiniciarDisplay) {
        operandoActual = numero;
        reiniciarDisplay = false;
    } else {
        // Si el valor actual es '0', lo reemplazamos para no acumular ceros a la izquierda ("07")
        operandoActual = (operandoActual === '0') ? numero : operandoActual + numero;
    }
    actualizarDisplay();
}

/**
 * Configura la operación matemática seleccionada
 * @param {string} nuevoOperador - '+', '-', '*' o '/'
 */
function seleccionarOperador(nuevoOperador) {
    // Si ya había una operación pendiente y el usuario ya escribió un segundo número, calculamos primero
    if (operacion !== null && !reiniciarDisplay) {
        calcular();
    }

    operandoAnterior = operandoActual;
    operacion = nuevoOperador;
    reiniciarDisplay = true;
}

/**
 * Realiza el cálculo matemático entre operandoAnterior y operandoActual
 */
function calcular() {
    if (operacion === null || operandoAnterior === null) return;

    const anterior = parseFloat(operandoAnterior);
    const actual = parseFloat(operandoActual);
    let resultado;

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
            if (actual === 0) {
                resultado = 'Error';
            } else {
                resultado = anterior / actual;
            }
            break;
        default:
            return;
    }

    // Redondeo preventivo para imprecisiones de coma flotante en JS (ej. 0.1 + 0.2)
    if (typeof resultado === 'number') {
        resultado = Math.round(resultado * 100000000) / 100000000;
    }

    operandoActual = resultado.toString();
    operacion = null;
    operandoAnterior = null;
    reiniciarDisplay = true;

    actualizarDisplay();
}

/**
 * Restablece la calculadora a su estado inicial
 */
function borrar() {
    operandoActual = '0';
    operandoAnterior = null;
    operacion = null;
    reiniciarDisplay = false;
    actualizarDisplay();
}

// -----------------------------------------------------------------------------
// PASO 5: DELEGACIÓN DE EVENTOS EN EL TECLADO
// -----------------------------------------------------------------------------
teclado.addEventListener('click', (evento) => {
    // 1. Averiguamos si se pulsó un botón
    const boton = evento.target.closest('button');
    if (!boton) return;

    // 2. Leemos los atributos data-* definidos en el HTML
    const numero = boton.dataset.numero;
    const operador = boton.dataset.operador;
    const accion = boton.dataset.accion;

    // 3. Derivamos la acción a la función correspondiente
    if (numero !== undefined) {
        agregarNumero(numero);
    } else if (operador !== undefined) {
        seleccionarOperador(operador);
    } else if (accion === 'igual') {
        calcular();
    } else if (accion === 'borrar') {
        borrar();
    }
});
