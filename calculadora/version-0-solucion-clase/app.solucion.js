/**
 * =============================================================================
 * VERSIÓN 0 (SOLUCIÓN DE CLASE): SOLUCIÓN CANÓNICA
 * =============================================================================
 * Autor: Ramón Abramo
 * 
 * Enfoque: Agrupación por tipos (numeros, operadores, acciones) y función pura
 * de cálculo calcular(numero1, numero2, operacion).
 * =============================================================================
 */

// 1. Función pura de cálculo matemático
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
            if (numero2 === 0) {
                resultado = 'Error';
            } else {
                resultado = numero1 / numero2;
            }
            break;
    }

    return resultado;
}

// 2. Variables de estado (la memoria de la calculadora)
// Indica si tras pulsar un operador el próximo dígito debe limpiar el display
let empezarNumero = false;

// Almacena el operador pendiente que se pulsó anteriormente
let operadorPendiente = null;

// Almacena el número que había en pantalla antes de pulsar el operador
let numeroAnterior = null;

// Almacena el número actual en pantalla al pulsar operador o igual
let numeroActual = null;


// 3. Selección de elementos en el DOM
const numeros = document.querySelectorAll('[data-numero]');
const operadores = document.querySelectorAll('[data-operador]');
const acciones = document.querySelectorAll('[data-accion]');
const pantalla = document.querySelector('output');


// 4. Gestión de eventos por grupos

// 4.1 NÚMERO PULSADO
numeros.forEach(numero => {
    numero.addEventListener('click', () => {
        // Leemos el dígito pulsado desde el atributo data-numero
        const valor = numero.dataset.numero;

        // Comprobamos si hay un '0' en pantalla o si venimos de pulsar un operador
        if (pantalla.textContent === '0' || empezarNumero) {
            pantalla.textContent = valor;
            // Indicamos que los siguientes dígitos ya no deben borrar la pantalla
            empezarNumero = false;
        } else {
            // Concatenamos el dígito al final
            pantalla.textContent += valor;
        }
    });
});


// 4.2 OPERADOR PULSADO (+, -, *, /)
operadores.forEach(operador => {
    operador.addEventListener('click', () => {
        // Leemos el operador pulsado
        const valor = operador.dataset.operador;

        // Si ya teníamos una operación pendiente y no estamos en display limpio, calculamos subtotal
        if (operadorPendiente !== null && empezarNumero !== true) {
            numeroActual = Number(pantalla.textContent);
            numeroAnterior = calcular(numeroAnterior, numeroActual, operadorPendiente);
            pantalla.textContent = numeroAnterior;
        } else {
            numeroAnterior = Number(pantalla.textContent);
        }

        // Si hubo un error en la división, anulamos el operador pendiente; si no, guardamos el operador
        operadorPendiente = (numeroAnterior === 'Error') ? null : valor;
        
        // Marcamos que el próximo dígito debe limpiar el display
        empezarNumero = true;
    });
});


// 4.3 ACCIÓN PULSADA ('igual' o 'borrar')
acciones.forEach(accion => {
    accion.addEventListener('click', () => {
        const valor = accion.dataset.accion;

        switch (valor) {
            case 'igual':
                // Si hay una operación pendiente, la resolvemos
                if (operadorPendiente !== null) {
                    numeroActual = Number(pantalla.textContent);
                    numeroAnterior = calcular(numeroAnterior, numeroActual, operadorPendiente);
                    pantalla.textContent = numeroAnterior;
                }
                // Limpiamos variables
                operadorPendiente = null;
                empezarNumero = true;
                break;

            case 'borrar':
                // Limpiamos pantalla a '0'
                pantalla.textContent = '0';
                // Limpiamos variables
                operadorPendiente = null;
                empezarNumero = true;
                break;
        }
    });
});
