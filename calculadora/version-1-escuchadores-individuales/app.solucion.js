/**
 * =============================================================================
 * VERSIÓN 1 (SOLUCIÓN): ESCUCHADORES INDIVIDUALES A CADA BOTÓN
 * =============================================================================
 */

// 1. Selección de elementos del DOM
const display = document.getElementById('display');
const botonesNumeros = document.querySelectorAll('[data-numero]');
const botonesOperadores = document.querySelectorAll('[data-operador]');
const botonIgual = document.querySelector('[data-accion="igual"]');
const botonBorrar = document.querySelector('[data-accion="borrar"]');

// 2. Variables de estado
let operandoActual = '0';
let operandoAnterior = null;
let operacion = null;
let reiniciarDisplay = false;

// 3. Función para actualizar la pantalla
function actualizarDisplay() {
    display.textContent = operandoActual;
}

// 4. Funciones de lógica
function agregarNumero(numero) {
    if (reiniciarDisplay) {
        operandoActual = numero;
        reiniciarDisplay = false;
    } else {
        operandoActual = (operandoActual === '0') ? numero : operandoActual + numero;
    }
    actualizarDisplay();
}

function seleccionarOperador(nuevoOperador) {
    if (operacion !== null && !reiniciarDisplay) {
        calcular();
    }
    operandoAnterior = operandoActual;
    operacion = nuevoOperador;
    reiniciarDisplay = true;
}

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
            resultado = (actual === 0) ? 'Error' : anterior / actual;
            break;
        default:
            return;
    }

    if (typeof resultado === 'number') {
        resultado = Math.round(resultado * 100000000) / 100000000;
    }

    operandoActual = resultado.toString();
    operacion = null;
    operandoAnterior = null;
    reiniciarDisplay = true;
    actualizarDisplay();
}

function borrar() {
    operandoActual = '0';
    operandoAnterior = null;
    operacion = null;
    reiniciarDisplay = false;
    actualizarDisplay();
}

// 5. Escuchadores individuales
botonesNumeros.forEach((boton) => {
    boton.addEventListener('click', () => {
        agregarNumero(boton.dataset.numero);
    });
});

botonesOperadores.forEach((boton) => {
    boton.addEventListener('click', () => {
        seleccionarOperador(boton.dataset.operador);
    });
});

botonIgual.addEventListener('click', () => {
    calcular();
});

botonBorrar.addEventListener('click', () => {
    borrar();
});
