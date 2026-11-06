# 🎮 Guía de Práctica: El Ahorcado en JS (Versión 2 - Teclado Virtual y Categorías)

> **Autor:** Ramón Abramo  
> **Nivel:** Intermedio de JavaScript  
> **Enfoque:** Creación dinámica de elementos del DOM, delegación de eventos, objetos con metadatos y sincronización con el teclado físico.

---

## 🗺️ Arquitectura de la Versión 2

Esta solución eleva el estándar del proyecto al implementar una experiencia de usuario (UX) rica e intuitiva, similar a los juegos comerciales modernos:

```
                  ┌────────────────────────┐
                  │ BANCO_PALABRAS (Array) │
                  │  { palabra, cat, pista}│
                  └───────────┬────────────┘
                              │
                              ▼
                   ┌──────────────────────┐
                   │   iniciarJuego()     │
                   └──────────┬───────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│ Casillas DOM  │     │ Teclado A-Z   │     │ Pistas & Vidas│
│ (.casilla)    │     │ dinámico (27) │     │ (❤️ Corazones)│
└───────────────┘     └───────┬───────┘     └───────────────┘
                              │
         ┌────────────────────┴────────────────────┐
         │ Interacción dual de usuario             │
         ▼                                         ▼
[ Clic en botón .tecla ]               [ keydown en Window ]
         │                                         │
         └────────────────────┬────────────────────┘
                              ▼
                     ┌──────────────────┐
                     │   jugarLetra()   │
                     └──────────────────┘
```

---

## 👣 Paso a Paso del Desarrollo

### Hito 1: Estructuración de Datos con Objetos
En lugar de un array plano de cadenas, cada palabra se modela como un objeto semántico:

```javascript
const BANCO_PALABRAS = [
  {
    palabra: 'JAVASCRIPT',
    categoria: 'Programación Web',
    pista: 'Lenguaje interpretado interactivo para navegadores.'
  },
  {
    palabra: 'RESPONSIVE',
    categoria: 'Diseño Web',
    pista: 'Técnica para que un diseño se adapte a cualquier pantalla.'
  }
];
```

---

### Hito 2: Generación Dinámica del Teclado (`document.createElement`)
Evitamos escribir 27 botones manualmente en el HTML. Los generamos mediante un bucle en JavaScript:

```javascript
function renderizarTecladoVirtual() {
  tecladoVirtual.innerHTML = '';
  LETRAS_ALFABETO.forEach(letra => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'tecla';
    btn.textContent = letra;
    btn.dataset.letra = letra;
    tecladoVirtual.appendChild(btn);
  });
}
```

---

### Hito 3: Delegación de Eventos en el Contenedor Padre
En vez de asociar 27 escuchadores individuales (`addEventListener`), vinculamos **un único escuchador** en el contenedor `#teclado-virtual` aprovechando el burbujeo de eventos (*Event Bubbling*):

```javascript
tecladoVirtual.addEventListener('click', evento => {
  const boton = evento.target.closest('.tecla');
  if (!boton || boton.disabled) return;
  jugarLetra(boton.dataset.letra);
});
```

---

### Hito 4: Soporte Dual con el Teclado Físico (`keydown`)
Permite al usuario teclear directamente en su teclado físico sin necesidad de apuntar con el ratón:

```javascript
window.addEventListener('keydown', evento => {
  if (juegoTerminado) return;
  if (evento.ctrlKey || evento.altKey || evento.metaKey) return;

  const letra = evento.key.toUpperCase();
  if (LETRAS_ALFABETO.includes(letra)) {
    jugarLetra(letra);
  }
});
```

---

### Hito 5: La Colección `Set` para Letras Jugadas
En lugar de un array con `indexOf` o `includes`, utilizamos la estructura de datos nativa `Set`, optimizada para colecciones sin duplicados:

```javascript
let letrasUsadas = new Set();

// Comprobar existencia en tiempo constante O(1):
if (letrasUsadas.has(letra)) return;

// Añadir elemento:
letrasUsadas.add(letra);
```

---

### Hito 6: Estados Semánticos de las Teclas
Cuando una letra se pulsa, el botón correspondiente se desactiva y adquiere una clase de retroalimentación:
- `.acierto`: Fondo verde esmeralda y texto claro.
- `.fallo`: Fondo rojo coral con texto tachado.

---

## 💡 Consejos Didácticos para el Aula
- **`dataset` y atributos de datos:** Explica a los alumnos la potencia de `data-letra` para comunicar el HTML con JavaScript sin depender del texto visible.
- **`event.target.closest()`:** Ilustra por qué `closest()` es más robusto que `event.target`, especialmente si el botón tuviera iconos o etiquetas internas.
- **Rendimiento:** Destaca la diferencia entre añadir 27 listeners individuales versus 1 listener delegado en el padre.
