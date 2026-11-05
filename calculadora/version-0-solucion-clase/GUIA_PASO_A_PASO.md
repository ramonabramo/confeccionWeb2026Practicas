# 🖩 Guía de Práctica: Calculadora en JS (Versión 0 - Solución de Clase)

> **Autor:** Ramón Abramo  
> **Enfoque:** Agrupación por tipos (`numeros`, `operadores`, `acciones`), función pura `calcular()` y gestión directa sobre `pantalla.textContent`.

Esta versión representa la **solución original explicada en clase por Ramón Abramo**. Se caracteriza por una estructura muy limpia, separando los botones en 3 listas semánticas y utilizando una función pura de cálculo.

---

## 🗺️ Arquitectura de la Solución de Clase

```
[DOM: querySelectorAll]
  ├── numeros    ➔ dataset.numero   ➔ Escribir dígitos (sustituir o concatenar)
  ├── operadores ➔ dataset.operador ➔ Guardar memoria y resolver subtotal
  └── acciones   ➔ dataset.accion   ➔ switch: 'igual' o 'borrar'
```

---

## 👣 Paso a Paso Detallado

### 1. La Función Pura de Cálculo: `calcular(numero1, numero2, operacion)`
A diferencia de otras soluciones donde las funciones leen variables globales, aquí la función es **pura**: recibe los dos operandos y el símbolo como parámetros y devuelve el resultado numérico:

```javascript
function calcular(numero1, numero2, operacion) {
    let resultado = 0;

    switch (operacion) {
        case '+': resultado = numero1 + numero2; break;
        case '-': resultado = numero1 - numero2; break;
        case '*': resultado = numero1 * numero2; break;
        case '/':
            resultado = (numero2 === 0) ? 'Error' : numero1 / numero2;
            break;
    }

    return resultado;
}
```

---

### 2. Las Variables de Estado en Memoria
Ramón utiliza 4 variables con nombres muy descriptivos:

```javascript
let empezarNumero = false;     // Pasa a true al pulsar un operador para que el próximo número limpie la pantalla
let operadorPendiente = null; // Almacena '+', '-', '*' o '/' que está pendiente de resolverse
let numeroAnterior = null;    // Almacena el número en pantalla antes de pulsar el operador
let numeroActual = null;      // Almacena el número actual en pantalla al calcular
```

---

### 3. Selección de Elementos del DOM
Se divide el teclado en tres colecciones semánticas:

```javascript
const numeros = document.querySelectorAll('[data-numero]');
const operadores = document.querySelectorAll('[data-operador]');
const acciones = document.querySelectorAll('[data-accion]');
const pantalla = document.querySelector('output');
```

---

### 4. Gestión de Eventos

#### 4.1 Teclas Numéricas (0 al 9)
```javascript
numeros.forEach(numero => {
    numero.addEventListener('click', () => {
        const valor = numero.dataset.numero;

        if (pantalla.textContent === '0' || empezarNumero) {
            pantalla.textContent = valor;
            empezarNumero = false;
        } else {
            pantalla.textContent += valor;
        }
    });
});
```
🧪 **Prueba:** Teclear `7`, `8`, `9` ➔ En pantalla se ve `789`.

#### 4.2 Teclas de Operadores (+, -, *, /)
Permite resolver subtotales encadenados automáticamente:
```javascript
operadores.forEach(operador => {
    operador.addEventListener('click', () => {
        const valor = operador.dataset.operador;

        if (operadorPendiente !== null && empezarNumero !== true) {
            numeroActual = Number(pantalla.textContent);
            numeroAnterior = calcular(numeroAnterior, numeroActual, operadorPendiente);
            pantalla.textContent = numeroAnterior;
        } else {
            numeroAnterior = Number(pantalla.textContent);
        }

        operadorPendiente = (numeroAnterior === 'Error') ? null : valor;
        empezarNumero = true;
    });
});
```
🧪 **Prueba:** Escribir `5 + 3 +` ➔ Al pulsar el 2º `+`, la pantalla muestra automáticamente `8`.

#### 4.3 Teclas de Acciones ('igual' y 'borrar')
```javascript
acciones.forEach(accion => {
    accion.addEventListener('click', () => {
        const valor = accion.dataset.accion;

        switch (valor) {
            case 'igual':
                if (operadorPendiente !== null) {
                    numeroActual = Number(pantalla.textContent);
                    numeroAnterior = calcular(numeroAnterior, numeroActual, operadorPendiente);
                    pantalla.textContent = numeroAnterior;
                }
                operadorPendiente = null;
                empezarNumero = true;
                break;

            case 'borrar':
                pantalla.textContent = '0';
                operadorPendiente = null;
                empezarNumero = true;
                break;
        }
    });
});
```
🧪 **Prueba:** `7 + 8 =` ➔ `15`. Pulsar `C` ➔ Vuelve a `0`.
