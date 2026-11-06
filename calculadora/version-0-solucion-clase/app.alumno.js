/**
 * =============================================================================
 * VERSIÓN 0 (PLANTILLA ALUMNADO): SOLUCIÓN DE CLASE
 * =============================================================================
 * Autor: Ramón Abramo
 * 
 * Instrucciones:
 * Completa los bloques marcados con TODO siguiendo las indicaciones de cada hito.
 * En esta versión agrupamos los botones en tres listas:
 * numeros, operadores y acciones.
 */

// =============================================================================
// PREPARATIVOS: FUNCIÓN DE CÁLCULO, ESTADO Y DOM
// =============================================================================

// TODO 0.1: Completa la función de cálculo matemático
function calcular(numero1, numero2, operacion) {
    let resultado = 0;

    // Escribe aquí el switch(operacion) con +, -, * y /
    // Recuerda que si numero2 === 0 en la división, resultado = 'Error'

    return resultado;
}

// Variables de estado
let empezarNumero = false;
let operadorPendiente = null;
let numeroAnterior = null;
let numeroActual = null;

// TODO 0.2: Selecciona los elementos en el DOM con querySelectorAll y querySelector
const numeros = document.querySelectorAll('[data-numero]');
const operadores = document.querySelectorAll('[data-operador]');
const acciones = document.querySelectorAll('[data-accion]');
const pantalla = document.querySelector('output');


// =============================================================================
// [HITO 1] NÚMERO PULSADO
// =============================================================================
numeros.forEach(numero => {
    numero.addEventListener('click', () => {
        // TODO 1:
        // 1. Lee el dígito del dataset: const valor = numero.dataset.numero;
        // 2. Si pantalla.textContent === '0' o empezarNumero es true:
        //    - pantalla.textContent = valor;
        //    - empezarNumero = false;
        // 3. En caso contrario:
        //    - pantalla.textContent += valor;

    });
});


// =============================================================================
// [HITO 2, 4 y 5] OPERADOR PULSADO (+, -, *, /)
// =============================================================================
operadores.forEach(operador => {
    operador.addEventListener('click', () => {
        // TODO 2:
        // 1. Lee el operador: const valor = operador.dataset.operador;
        // 2. Si operadorPendiente !== null y empezarNumero !== true:
        //    - numeroActual = Number(pantalla.textContent);
        //    - numeroAnterior = calcular(numeroAnterior, numeroActual, operadorPendiente);
        //    - pantalla.textContent = numeroAnterior;
        //    Si no:
        //    - numeroAnterior = Number(pantalla.textContent);
        // 3. operadorPendiente = (numeroAnterior === 'Error') ? null : valor;
        // 4. empezarNumero = true;

    });
});


// =============================================================================
// [HITO 3 y 6] ACCIÓN PULSADA ('igual' y 'borrar')
// =============================================================================
acciones.forEach(accion => {
    accion.addEventListener('click', () => {
        // TODO 3:
        // 1. Lee la acción: const valor = accion.dataset.accion;
        // 2. Mediante un switch(valor):
        //    - case 'igual':
        //        si operadorPendiente !== null:
        //           numeroActual = Number(pantalla.textContent);
        //           numeroAnterior = calcular(numeroAnterior, numeroActual, operadorPendiente);
        //           pantalla.textContent = numeroAnterior;
        //        operadorPendiente = null;
        //        empezarNumero = true;
        //    - case 'borrar':
        //        pantalla.textContent = '0';
        //        operadorPendiente = null;
        //        empezarNumero = true;

    });
});
