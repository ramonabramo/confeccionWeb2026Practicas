# 🖩 Guía de Práctica: Calculadora en JS por Hitos de Funcionamiento

> **Versión 2: Delegación de eventos en el contenedor padre (con burbujeo)**

Esta guía está diseñada con una **metodología incremental**: cada hito añade una nueva funcionalidad que el alumno puede probar inmediatamente en el navegador.

---

## 🗺️ Mapa de Hitos de Funcionamiento

```
[HITO 1] Escribir números en pantalla (1, 2, 3...)
    ↓
[HITO 2] Guardar el primer número y elegir la suma (+)
    ↓
[HITO 3] Resolver la operación con el botón igual (=)
    ↓
[HITO 4] Añadir los demás operadores (-, *, /)
    ↓
[HITO 5] Operaciones encadenadas (5 + 3 + 2 = 10)
    ↓
[HITO 6] Botón de borrado total (C)
    ↓
[HITO 7] Casos límite: división por cero y decimales
```

---

## 👣 Desarrollo Incremental

### Preparativos: Selección en el DOM y Memoria

```javascript
// Display y Contenedor del teclado
const display = document.getElementById('display');
const teclado = document.querySelector('.teclado');

// Variables de estado
let operandoActual = '0';
let operandoAnterior = null;
let operacion = null;
let reiniciarDisplay = false;

// Renderizado en pantalla
function actualizarDisplay() {
    display.textContent = operandoActual;
}
```

---

### [HITO 1] Escribir números en el display

**Objetivo:** Al pulsar cualquier tecla numérica, debe verse en pantalla.

```javascript
function agregarNumero(numero) {
    if (reiniciarDisplay) {
        operandoActual = numero;
        reiniciarDisplay = false;
    } else {
        operandoActual = (operandoActual === '0') ? numero : operandoActual + numero;
    }
    actualizarDisplay();
}
```

🧪 **Prueba del alumno:** Haz clic en `7`, `8`, `9`. La pantalla debe mostrar `789`.

---

### [HITO 2] La primera operación: La Suma (+)

**Objetivo:** Al pulsar `+`, la calculadora debe recordar el primer número (`operandoAnterior`) y preparar la pantalla para el segundo número.

```javascript
function seleccionarOperador(nuevoOperador) {
    // Si ya había operación y el usuario teclea otro operador, calcula antes (Hito 5)
    if (operacion !== null && !reiniciarDisplay) {
        calcular();
    }

    operandoAnterior = operandoActual; // Memoriza el primer número
    operacion = nuevoOperador;         // Memoriza la operación ('+')
    reiniciarDisplay = true;           // El próximo número limpiará la pantalla
}
```

🧪 **Prueba del alumno:** Escribe `15`, pulsa `+`, escribe `4`. La pantalla debe mostrar `4` (el 15 está a salvo en la memoria).

---

### [HITO 3] Resolver con el botón Igual (=)

**Objetivo:** Recuperar ambos números, convertirlos a números reales con `parseFloat()` y sumarlos.

```javascript
function calcular() {
    if (operacion === null || operandoAnterior === null) return;

    const anterior = parseFloat(operandoAnterior);
    const actual = parseFloat(operandoActual);
    let resultado;

    switch (operacion) {
        case '+':
            resultado = anterior + actual;
            break;
        // (Otros operadores en el Hito 4)
    }

    operandoActual = resultado.toString();
    operacion = null;
    operandoAnterior = null;
    reiniciarDisplay = true;
    actualizarDisplay();
}
```

🧪 **Prueba del alumno:** `7` `+` `8` `=` debe mostrar `15`.

---

### [HITO 4] Añadir Resta (-), Multiplicación (*) y División (/)

**Objetivo:** Completar el `switch` de la función `calcular()`:

```javascript
switch (operacion) {
    case '+': resultado = anterior + actual; break;
    case '-': resultado = anterior - actual; break;
    case '*': resultado = anterior * actual; break;
    case '/':
        resultado = (actual === 0) ? 'Error' : anterior / actual;
        break;
}
```

🧪 **Pruebas:**
- `9` `-` `4` `=` ➔ `5`
- `6` `*` `3` `=` ➔ `18`
- `8` `/` `2` `=` ➔ `4`

---

### [HITO 5] Operaciones encadenadas

**Objetivo:** ¿Qué ocurre al pulsar `5` `+` `3` `+` `2` `=`?
Al pulsar el segundo `+`, la calculadora detecta que ya había una operación pendiente (`operacion !== null`) y que no acabamos de reiniciar la pantalla. Por tanto llama a `calcular()` antes de guardar el nuevo operador:

```javascript
if (operacion !== null && !reiniciarDisplay) {
    calcular();
}
```

🧪 **Prueba del alumno:** `5` `+` `3` `+` ➔ al pulsar el segundo `+`, la pantalla muestra `8` automáticamente. Luego `2` `=` ➔ muestra `10`.

---

### [HITO 6] Botón de borrado (C)

**Objetivo:** Reset total de las variables a su valor inicial.

```javascript
function borrar() {
    operandoActual = '0';
    operandoAnterior = null;
    operacion = null;
    reiniciarDisplay = false;
    actualizarDisplay();
}
```

🧪 **Prueba del alumno:** Escribe cualquier número, pulsa `C` ➔ vuelve a `0`.

---

### [HITO 7] Control de errores y afinado

1. **División por cero:** Si el divisor es 0, asignamos `'Error'` en lugar de `Infinity`.
2. **Redondeo flotante:** En JavaScript, `0.1 + 0.2` da `0.30000000000000004`. Para evitarlo redondeamos:
```javascript
if (typeof resultado === 'number') {
    resultado = Math.round(resultado * 100000000) / 100000000;
}
```

🧪 **Prueba del alumno:** `5` `/` `0` `=` ➔ `Error`.

---

### Delegación de Eventos en el Teclado

Un único escuchador en `.teclado` despacha las acciones de cada hito:

```javascript
teclado.addEventListener('click', (evento) => {
    const boton = evento.target.closest('button');
    if (!boton) return;

    const { numero, operador, accion } = boton.dataset;

    if (numero !== undefined) {
        agregarNumero(numero);          // [HITO 1]
    } else if (operador !== undefined) {
        seleccionarOperador(operador);  // [HITO 2, 4 y 5]
    } else if (accion === 'igual') {
        calcular();                     // [HITO 3]
    } else if (accion === 'borrar') {
        borrar();                       // [HITO 6]
    }
});
```
