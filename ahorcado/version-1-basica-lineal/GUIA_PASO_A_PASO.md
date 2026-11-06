# 🎮 Guía de Práctica: El Ahorcado en JS (Versión 1 - Básica e Imperativa)

> **Autor:** Ramón Abramo  
> **Nivel:** Iniciación / Fundamentos de JavaScript  
> **Enfoque:** Lógica secuencial lineal, variables globales directas, bucles tradicionales y manipulación con `getElementById`.

---

## 🗺️ Arquitectura de la Versión 1

Esta versión es el punto de partida perfecto para estudiantes. Toda la lógica se basa en el flujo clásico de un programa imperativo:

```
[Inicio de Partida]
       │
       ▼
[Palabra aleatoria en PALABRAS] ──► ['_', '_', '_', '_', '_']
       │
       ▼
[Usuario introduce letra en <input>]
       │
       ├── ¿Letra ya usada o inválida? ──► Aviso en pantalla (no resta vida)
       │
       ├── ¿Letra acierta? ──► Reemplaza guiones en las posiciones correctas
       │                       ¿No quedan '_' en array? ──► 🎉 ¡VICTORIA!
       │
       └── ¿Letra falla?   ──► fallos++ ──► Muestra pieza N en SVG
                               ¿fallos === 6? ──► 💀 ¡DERROTA! (revela palabra)
```

---

## 👣 Paso a Paso del Desarrollo

### Hito 1: Banco de Palabras y Variables de Estado
Definimos el vocabulario y las variables que almacenan el estado en la memoria del navegador:

```javascript
const PALABRAS = ['JAVASCRIPT', 'PROGRAMACION', 'VARIABLE', 'FUNCION', 'ARRAY', 'OBJETO', 'BUCLE'];
const MAX_FALLOS = 6;

let palabraSecreta = '';        // Palabra activa
let letrasAdivinadas = [];      // Array con guiones y aciertos: ['_', 'A', '_']
let letrasUsadas = [];          // Registro de letras probadas: ['E', 'A', 'Z']
let fallos = 0;                 // Contador de 0 a 6
let juegoTerminado = false;     // Control de partida activa
```

---

### Hito 2: Selección de Elementos del DOM y Partes SVG
Guardamos las referencias a los elementos visuales una sola vez al cargar la página:

```javascript
const palabraDisplay = document.getElementById('palabra-display');
const inputLetra = document.getElementById('input-letra');
const btnProbar = document.getElementById('btn-probar');
const letrasUsadasDisplay = document.getElementById('letras-usadas-display');
const vidasRestantes = document.getElementById('vidas-restantes');
const mensajeEstado = document.getElementById('mensaje-estado');
const btnReiniciar = document.getElementById('btn-reiniciar');

// Partes del cuerpo ordenadas por número de fallo (1 a 6)
const partesAhorcado = [
  document.getElementById('parte-cabeza'),     // Fallo 1
  document.getElementById('parte-cuerpo'),     // Fallo 2
  document.getElementById('parte-brazo-izq'),  // Fallo 3
  document.getElementById('parte-brazo-der'),  // Fallo 4
  document.getElementById('parte-pierna-izq'), // Fallo 5
  document.getElementById('parte-pierna-der')  // Fallo 6
];
```

---

### Hito 3: Función `iniciarJuego()`
Reinicia el estado para comenzar una partida limpia:
1. `Math.floor(Math.random() * PALABRAS.length)` extrae una palabra al azar.
2. Llena `letrasAdivinadas` con guiones `'_'`.
3. Quita la clase `.visible` a todas las piezas del SVG del ahorcado.
4. Restaura los inputs y da el foco a la casilla de texto con `.focus()`.

---

### Hito 4: Procesar y Comprobar la Letra (`procesarLetra()`)
1. Leemos el valor con `inputLetra.value.trim().toUpperCase()`.
2. Validamos que no esté vacío, sea una letra válida (A-Z) y no esté ya en `letrasUsadas`.
3. Si `palabraSecreta.includes(letra)`:
   - Recorremos la palabra con un bucle `for (let i = 0; i < palabraSecreta.length; i++)`.
   - Si `palabraSecreta[i] === letra`, sustituimos `letrasAdivinadas[i] = letra`.
4. Si la letra no coincide:
   - Incrementamos `fallos++`.
   - Llamamos a `dibujarSiguienteParte(fallos)` para añadir la clase `.visible` al elemento SVG correspondiente.

---

### Hito 5: Actualización del Display (`actualizarPantalla()`)
- Formateamos el array con `letrasAdivinadas.join(' ')` para que en pantalla aparezca `_ A _ A _` en vez de `_A_A_`.
- Calculamos vidas restantes: `MAX_FALLOS - fallos`.
- Listamos las letras ya intentadas.

---

### Hito 6: Comprobación de Fin de Partida (`verificarFinJuego()`)
- **Victoria:** Si `!letrasAdivinadas.includes('_')`, el jugador ha ganado.
- **Derrota:** Si `fallos >= MAX_FALLOS`, el jugador se queda sin vidas. Mostramos la cara de derrota y revelamos la palabra en pantalla.
- En ambos casos se deshabilita el campo de texto (`inputLetra.disabled = true`).

---

## 💡 Consejos Didácticos para el Aula
- **El método `.join(' ')`:** Enseña la diferencia entre el array en memoria `['_', 'A']` y la cadena formateada visualmente en el display.
- **Validación preventiva:** Recalca que un intento repetido **no debe penalizar** al alumno con un fallo.
- **Autoenfoque (`.focus()`):** Mejora enormemente la experiencia de usuario (UX) al evitar que el alumno tenga que hacer clic con el ratón en cada intento.
