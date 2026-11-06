/**
 * =============================================================================
 * CALCULADORA CORTA: POTENCIA (x^y), RAÍZ (√), RESTO (mod) Y PORCENTAJE (%)
 * =============================================================================
 * Autor: Ramón Abramo
 *
 * Basada en la solución de clase (Versión 0): agrupamos los botones en
 * números, operadores y acciones, y las cuentas van en funciones puras.
 *
 * Operaciones de DOS números (se escribe número, operador, número e =):
 * - x^y : potencia.                        2 x^y 3 = 8
 * - mod : resto de la división entera.     17 mod 5 = 2
 *
 * Operaciones de UN número (se aplican al momento a lo que hay en pantalla):
 * - √   : raíz cuadrada.                   9 √ → 3
 * - %   : porcentaje (divide entre 100).   50 % → 0.5
 * Su resultado vale como segundo número:   2 x^y 9 √ = 8   ·   4 x^y 50 % = 2
 * =============================================================================
 */

// 1. Funciones puras de cálculo (reciben datos y devuelven un resultado)

// Redondea a 8 decimales para evitar resultados como 1.4142135623730951
function redondear(numero) {
    return Math.round(numero * 100000000) / 100000000;
}

// Operaciones de dos números: potencia y resto
function calcular(numero1, numero2, operacion) {
    let resultado = 0;

    switch (operacion) {
        case '^':
            resultado = numero1 ** numero2;
            break;
        case 'mod':
            // Igual que en la división: no se puede hacer el resto entre 0
            if (numero2 === 0) {
                return 'Error';
            }
            resultado = numero1 % numero2;
            break;
    }

    // Si el número es tan grande que JavaScript lo da por infinito, es un error
    if (!Number.isFinite(resultado)) {
        return 'Error';
    }

    return redondear(resultado);
}

// Operación de un solo número: la raíz cuadrada
function raizCuadrada(numero) {
    if (numero < 0) {
        return 'Error';
    }
    return redondear(Math.sqrt(numero));
}

// Operación de un solo número: el porcentaje (50 % → 0.5)
function porcentaje(numero) {
    return redondear(numero / 100);
}


// 2. Variables de estado (la memoria de la calculadora)

// Indica si el próximo dígito debe sustituir lo que hay en pantalla
let empezarNumero = false;

// Operador pendiente: '^' o 'mod'
let operadorPendiente = null;

// Número que había en pantalla al pulsar el operador
let numeroAnterior = null;

// Indica si, tras pulsar el operador, ya hay un segundo número en pantalla
// (tecleado o sacado con √ o %). Sirve para encadenar: 2 x^y 3 x^y 2 = 64
let hayNumeroNuevo = false;


// 3. Selección de elementos en el DOM
const numeros = document.querySelectorAll('[data-numero]');
const operadores = document.querySelectorAll('[data-operador]');
const acciones = document.querySelectorAll('[data-accion]');
const pantalla = document.querySelector('output');


// 4. Gestión de eventos por grupos

// 4.1 NÚMERO PULSADO
numeros.forEach(numero => {
    numero.addEventListener('click', () => {
        const valor = numero.dataset.numero;

        if (pantalla.textContent === '0' || empezarNumero) {
            pantalla.textContent = valor;
            empezarNumero = false;
        } else {
            pantalla.textContent += valor;
        }

        hayNumeroNuevo = true;
    });
});


// 4.2 OPERADOR PULSADO (x^y o mod)
operadores.forEach(operador => {
    operador.addEventListener('click', () => {
        // Con 'Error' en pantalla no se puede operar: primero hay que teclear un número
        if (pantalla.textContent === 'Error') return;

        const valor = operador.dataset.operador;

        // Si ya había una operación a medias con su segundo número, calculamos el subtotal
        if (operadorPendiente !== null && hayNumeroNuevo) {
            numeroAnterior = calcular(numeroAnterior, Number(pantalla.textContent), operadorPendiente);
            pantalla.textContent = numeroAnterior;
        } else {
            numeroAnterior = Number(pantalla.textContent);
        }

        operadorPendiente = (numeroAnterior === 'Error') ? null : valor;
        empezarNumero = true;
        hayNumeroNuevo = false;
    });
});


// 4.3 ACCIÓN PULSADA ('raiz', 'porcentaje', 'igual' o 'borrar')
acciones.forEach(accion => {
    accion.addEventListener('click', () => {
        const valor = accion.dataset.accion;

        switch (valor) {
            // √ y % funcionan igual: cambian el número de la pantalla al momento
            case 'raiz':
            case 'porcentaje': {
                if (pantalla.textContent === 'Error') return;

                const numero = Number(pantalla.textContent);
                const resultado = (valor === 'raiz') ? raizCuadrada(numero) : porcentaje(numero);
                pantalla.textContent = resultado;

                // El resultado se puede usar como segundo número de una operación pendiente,
                // pero el próximo dígito empieza un número nuevo
                empezarNumero = true;
                hayNumeroNuevo = true;
                if (resultado === 'Error') {
                    operadorPendiente = null;
                }
                break;
            }

            case 'igual':
                if (operadorPendiente !== null) {
                    numeroAnterior = calcular(numeroAnterior, Number(pantalla.textContent), operadorPendiente);
                    pantalla.textContent = numeroAnterior;
                }
                operadorPendiente = null;
                empezarNumero = true;
                hayNumeroNuevo = false;
                break;

            case 'borrar':
                pantalla.textContent = '0';
                numeroAnterior = null;
                operadorPendiente = null;
                empezarNumero = false;
                hayNumeroNuevo = false;
                break;
        }
    });
});
