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

// cuando he realizado una operacion y tengo que limpiar el display lo coloca a true
let empezarNumero = false;

// es la variable que almacena el operador que has pulsado anteriormente que es la operacion pendiente a realizar
let operadorPendiente = null;

// es la variable que almacena el numero que tenia en la pantalla antes de pulsar el operador a realizar
let numeroAnterior = null;

// es el numero que almacena el numero que tienes en la pantalla actualmente
let numeroActual = null;


const numeros = document.querySelectorAll('[data-numero]');
const operadores = document.querySelectorAll('[data-operador]');
const acciones = document.querySelectorAll('[data-accion]');
const pantalla = document.querySelector('output');

// numero pulsado
numeros.forEach(numero => {
    numero.addEventListener('click', () => {
        // leo el numero que he pulsado
        const valor = numero.dataset.numero;
        // const valor=numero.textContent;

        // escribir el digito del numero en la pantalla

        // compruebo si tengo un cero en la pantalla o tengo que limpiar el display
        // porque vengo de una operacion pendiente
        if (pantalla.textContent === '0' || empezarNumero) {
            pantalla.textContent = valor;
            // tengo que indicar que ya no tiene que borrar el displa
            empezarNumero = false;
        } else {
            // escribir el digito del numero en la pantalla detras de los existentes
            pantalla.textContent += valor;
        }
    });
});

// operador pulsado
operadores.forEach(operador => {
    operador.addEventListener('click', () => {
        // leo el operador que he pulsado
        const valor = operador.dataset.operador;
        // const valor=operador.textContent;

        // compruebo si tengo un operador pendiente
        if (operadorPendiente !== null && empezarNumero !== true) {
            // leo el numero de la pantalla
            numeroActual = Number(pantalla.textContent);

            numeroAnterior = calcular(numeroAnterior, numeroActual, operadorPendiente);


            // colocar en la pantalla el resultado de la operacion
            pantalla.textContent = numeroAnterior;

        } else {
            numeroAnterior = Number(pantalla.textContent);

        }
        // almaceno el operador que he pulsado
        operadorPendiente = (numeroAnterior === 'Error') ? null : valor;
        // tienes que borrar el display cuando escribas un digito
        empezarNumero = true;

    });
});


// accion pulsada
acciones.forEach(accion => {
    accion.addEventListener('click', () => {
        // leo el operador que he pulsado
        const valor = accion.dataset.accion;
        // const valor=accion.textContent;

        switch (valor) {
            case 'igual':
                // comprobar si tengo operador pendiente
                if (operadorPendiente !== null) {
                    // leo el numero de la pantalla
                    numeroActual = Number(pantalla.textContent);

                    numeroAnterior = calcular(numeroAnterior, numeroActual, operadorPendiente);

                    // colocar en la pantalla el resultado de la operacion
                    pantalla.textContent = numeroAnterior;
                }
                // limpiar variables
                operadorPendiente = null;
                empezarNumero = true;
                break;
            case 'borrar':
                // limpiar pantalla
                pantalla.textContent = '0';
                // limpiar variables
                operadorPendiente = null;
                empezarNumero = true;
                break;
        }
    });
});