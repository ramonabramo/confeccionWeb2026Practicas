// variables de estado
let operacionPendiente = null;
let limpiarPantalla = true;
let numeroAnterior = null;

function calcular(operacion, numeroAnterior, numeroActual) {
    switch (operacion) {
        case '+':
            //sumar
            numeroAnterior += numeroActual;
            break;
        case '-':
            //restar
            numeroAnterior -= numeroActual;
            break;
        case '*':
            //multiplicar
            numeroAnterior *= numeroActual;
            break;
        case '/':
            //dividir
            if (numeroActual === 0) {
                return 'Error';
            }
            numeroAnterior /= numeroActual;
            break;
    }

    // compruebo si es un numero real y redondeo a 3 decimales
    if (!Number.isInteger(numeroAnterior)) {
        numeroAnterior = parseFloat(numeroAnterior.toFixed(3));
    } else {
        numeroAnterior = parseInt(numeroAnterior);
    }



    return numeroAnterior;
}


const numeros = document.querySelectorAll('[data-numero]');
const operadores = document.querySelectorAll('[data-operador]');
const acciones = document.querySelectorAll('[data-accion]');
const pantalla = document.querySelector('output');

// objetivo (hito): conseguir que se escriba el numero en pantalla

numeros.forEach(botonNumero => {
    botonNumero.addEventListener('click', e => {
        const textoNumeroPulsado = botonNumero.dataset.numero;

        if (pantalla.textContent === '0' || limpiarPantalla) {
            pantalla.textContent = textoNumeroPulsado;
            limpiarPantalla = false;
        } else {
            pantalla.textContent += textoNumeroPulsado;
        }

    })
});


// objetivo (hito): conseguir que el operador de sumar sume
operadores.forEach(operador => {
    operador.addEventListener('click', e => {
        const operadorPulsado = operador.dataset.operador;
        const numeroActual = Number(pantalla.textContent);

        if (operacionPendiente !== null && limpiarPantalla !== true) {
            numeroAnterior = calcular(operacionPendiente, numeroAnterior, numeroActual);

            pantalla.textContent = numeroAnterior;

        } else {
            numeroAnterior = Number(pantalla.textContent);
        }

        if (numeroAnterior === 'Error') {
            operacionPendiente = null;
        } else {
            operacionPendiente = operadorPulsado;
        }

        limpiarPantalla = true;

    })
});


acciones.forEach(botonAccion => {
    botonAccion.addEventListener('click', e => {
        const accionPulsada = botonAccion.dataset.accion;

        switch (accionPulsada) {
            case 'igual':
                const numeroActual = Number(pantalla.textContent);
                if (operacionPendiente !== null) {
                    numeroAnterior = calcular(operacionPendiente, numeroAnterior, numeroActual);
                    pantalla.textContent = numeroAnterior;
                }
                operacionPendiente = null;
                limpiarPantalla = true;
                break;
            case 'borrar':
                pantalla.textContent = '0';
                operacionPendiente = null;
                limpiarPantalla = true;
                break;
        }
    });
});

