/**
 * =============================================================================
 * VERSIÓN 1 (PLANTILLA ALUMNADO): POR HITOS DE FUNCIONAMIENTO
 * =============================================================================
 * Enfoque: Escuchadores individuales a cada botón (sin burbujeo).
 * 
 * Sigue la guía paso a paso resolviendo cada Hito y comprobando el resultado
 * en el navegador antes de pasar al siguiente.
 */

// -----------------------------------------------------------------------------
// PREPARATIVOS: SELECTORES DEL DOM Y VARIABLES DE MEMORIA
// -----------------------------------------------------------------------------
const display = document.getElementById('display');
const botonesNumeros = document.querySelectorAll('[data-numero]');
const botonesOperadores = document.querySelectorAll('[data-operador]');
const botonIgual = document.querySelector('[data-accion="igual"]');
const botonBorrar = document.querySelector('[data-accion="borrar"]');

// Variables de estado (memoria)
let operandoActual = '0';
let operandoAnterior = null;
let operacion = null;
let reiniciarDisplay = false;

// Función auxiliar para pintar en el display
function actualizarDisplay() {
    display.textContent = operandoActual;
}


// =============================================================================
// [HITO 1] ESCRIBIR NÚMEROS EN PANTALLA
// =============================================================================
// Objetivo: Al pulsar cualquier botón del 0 al 9, debe mostrarse en el display.

function agregarNumero(numero) {
    // TODO 1.1:
    // - Si reiniciarDisplay es true: asigna el número a operandoActual y pon reiniciarDisplay en false.
    // - Si no: si operandoActual es '0', reemplázalo con el número; si no, concaténalo (+).
    // - Llama a actualizarDisplay().

}

// TODO 1.2: Recorre botonesNumeros con forEach y añade un addEventListener('click', ...)
// que llame a agregarNumero(boton.dataset.numero).
botonesNumeros.forEach((boton) => {
    // Tu código aquí:

});
// 🧪 Comprueba en el navegador: ¿Puedes escribir "123"?


// =============================================================================
// [HITO 2] LA PRIMERA OPERACIÓN: LA SUMA (+) Y GUARDAR EL PRIMER NÚMERO
// =============================================================================
// Objetivo: Al pulsar un operador, guardar el primer número y preparar la pantalla.

function seleccionarOperador(nuevoOperador) {
    // TODO 2.1:
    // - (Opcional por ahora) Si ya había operacion y reiniciarDisplay es false, llama a calcular().
    // - Guarda operandoActual en operandoAnterior.
    // - Guarda nuevoOperador en operacion.
    // - Pon reiniciarDisplay en true.

}

// TODO 2.2: Recorre botonesOperadores con forEach y añade un addEventListener('click', ...)
// que llame a seleccionarOperador(boton.dataset.operador).
botonesOperadores.forEach((boton) => {
    // Tu código aquí:

});
// 🧪 Comprueba en el navegador: Escribe "12", pulsa "+", escribe "5". ¿Se ve el "5"?


// =============================================================================
// [HITO 3] RESOLVER CON EL BOTÓN IGUAL (=)
// =============================================================================
// Objetivo: Al pulsar '=', convertir los valores a número y realizar la suma.

function calcular() {
    // TODO 3.1:
    // - Si operacion o operandoAnterior son null, sal con return.
    // - Convierte operandoAnterior y operandoActual con parseFloat().
    // - Declara la variable let resultado.
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

// TODO 3.2: Añade addEventListener('click', ...) a botonIgual para llamar a calcular().
// Tu código aquí:

// 🧪 Comprueba en el navegador: Escribe "7", pulsa "+", escribe "8", pulsa "=". ¿Da 15?


// =============================================================================
// [HITO 4] RESTA (-), MULTIPLICACIÓN (*) Y DIVISIÓN (/)
// =============================================================================
// Asegúrate de que tu switch en calcular() incluye los casos '-', '*' y '/'.
// 🧪 Comprueba: 9 - 4 = 5; 6 * 3 = 18; 8 / 2 = 4.


// =============================================================================
// [HITO 5] OPERACIONES ENCADENADAS
// =============================================================================
// Revisa que en seleccionarOperador() llamas a calcular() si ya había una
// operación previa y reiniciarDisplay es false.
// 🧪 Comprueba: 5 + 3 + 2 = debe dar 10.


// =============================================================================
// [HITO 6] BOTÓN DE BORRADO (C)
// =============================================================================
function borrar() {
    // TODO 6.1:
    // Restablece operandoActual a '0', operandoAnterior a null,
    // operacion a null y reiniciarDisplay a false.
    // Llama a actualizarDisplay().

}

// TODO 6.2: Añade addEventListener('click', ...) a botonBorrar para llamar a borrar().
// Tu código aquí:

// 🧪 Comprueba: Escribe "999", pulsa "C". ¿Vuelve a 0?


// =============================================================================
// [HITO 7] CONTROL DE ERRORES (DIVISIÓN ENTRE 0)
// =============================================================================
// En el case '/' de calcular(), si actual === 0 muestra 'Error'.
// 🧪 Comprueba: 8 / 0 = debe mostrar "Error".
