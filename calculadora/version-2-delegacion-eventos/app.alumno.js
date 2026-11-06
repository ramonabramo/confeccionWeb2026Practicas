/**
 * =============================================================================
 * VERSIÓN 2 (PLANTILLA ALUMNADO): POR HITOS DE FUNCIONAMIENTO
 * =============================================================================
 * Enfoque: Delegación de eventos en el contenedor '.teclado' (Event Bubbling).
 * 
 * Sigue la guía paso a paso resolviendo cada Hito y comprobando el resultado
 * en el navegador antes de pasar al siguiente.
 */

// -----------------------------------------------------------------------------
// PREPARATIVOS: SELECTORES DEL DOM Y MEMORIA
// -----------------------------------------------------------------------------
const display = document.getElementById('display');
const teclado = document.querySelector('.teclado');

// Variables de estado (memoria)
let operandoActual = '0';
let operandoAnterior = null;
let operacion = null;
let reiniciarDisplay = false;

// Función auxiliar para pintar en pantalla
function actualizarDisplay() {
    display.textContent = operandoActual;
}


// =============================================================================
// [HITO 1] ESCRIBIR NÚMEROS EN PANTALLA
// =============================================================================
function agregarNumero(numero) {
    // TODO 1.1:
    // - Si reiniciarDisplay es true: asigna el número a operandoActual y pon reiniciarDisplay en false.
    // - Si no: si operandoActual es '0', cámbialo por el número; si no, concatena (+).
    // - Llama a actualizarDisplay().

}


// =============================================================================
// [HITO 2] LA PRIMERA OPERACIÓN: LA SUMA (+) Y GUARDAR EL PRIMER NÚMERO
// =============================================================================
function seleccionarOperador(nuevoOperador) {
    // TODO 2.1:
    // - (Opcional por ahora) Si ya había operacion y reiniciarDisplay es false, llama a calcular().
    // - Guarda operandoActual en operandoAnterior.
    // - Guarda nuevoOperador en operacion.
    // - Pon reiniciarDisplay en true.

}


// =============================================================================
// [HITO 3] RESOLVER CON EL BOTÓN IGUAL (=)
// =============================================================================
function calcular() {
    // TODO 3.1:
    // - Si operacion o operandoAnterior son null, sal con return.
    // - Convierte operandoAnterior y operandoActual con parseFloat().
    // - Declara let resultado.
    // - Realiza el switch(operacion):
    //     case '+': resultado = anterior + actual; break;
    //     case '-': resultado = anterior - actual; break; // [HITO 4]
    //     case '*': resultado = anterior * actual; break; // [HITO 4]
    //     case '/':                                       // [HITO 4 y 7]
    //         resultado = (actual === 0) ? 'Error' : anterior / actual;
    //         break;
    // - Guarda resultado.toString() en operandoActual.
    // - Resetea operacion = null y operandoAnterior = null.
    // - Pon reiniciarDisplay = true.
    // - Llama a actualizarDisplay().

}


// =============================================================================
// [HITO 4] RESTA (-), MULTIPLICACIÓN (*) Y DIVISIÓN (/)
// =============================================================================
// Completa los cases '-', '*' y '/' en la función calcular().


// =============================================================================
// [HITO 5] OPERACIONES ENCADENADAS
// =============================================================================
// Asegúrate de que seleccionarOperador() llama a calcular() si ya había operacion.


// =============================================================================
// [HITO 6] BOTÓN DE BORRADO (C)
// =============================================================================
function borrar() {
    // TODO 6.1:
    // Restablece operandoActual a '0', operandoAnterior a null,
    // operacion a null y reiniciarDisplay a false.
    // Llama a actualizarDisplay().

}


// =============================================================================
// DELEGACIÓN DE EVENTOS EN EL TECLADO
// =============================================================================
teclado.addEventListener('click', (evento) => {
    // TODO:
    // 1. Obtén el botón pulsado mediante evento.target.closest('button').
    // 2. Si no es un botón, sal con return.
    // 3. Extrae { numero, operador, accion } de boton.dataset.
    // 4. Conecta cada hito:
    //    - Si hay numero: agregarNumero(numero)          [HITO 1]
    //    - Si hay operador: seleccionarOperador(operador) [HITO 2, 4 y 5]
    //    - Si accion === 'igual': calcular()             [HITO 3]
    //    - Si accion === 'borrar': borrar()              [HITO 6]

    const boton = evento.target.closest('button');
    if (!boton) return;

    const { numero, operador, accion } = boton.dataset;

    // Escribe las condiciones aquí:

});
