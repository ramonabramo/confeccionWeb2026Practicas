# 🖩 Práctica: Calculadora en JavaScript

Bienvenido/a al repositorio de la práctica de la Calculadora Web. En este proyecto se proporciona el **enunciado completo del ejercicio para el alumnado** y la **explicación detallada de dos soluciones técnicas independientes**, cada una con su propio código, diapositivas y **documento PDF detallado**.

---

## 📄 Documentación en PDF

* 📘 **[Guía General del Proyecto (PDF)](Guia_General_Calculadora_JS_Ramon_Abramo.pdf)**: Enunciado oficial, objetivos, arquitectura, los 7 hitos de desarrollo, comparativa técnica y consejos docentes de Ramón Abramo.
* 🛠️ **[Guía Detallada Solución 1 (PDF)](version-1-escuchadores-individuales/Guia_Detallada_Solucion_1_Escuchadores_Individuales.pdf)**: Desglose exhaustivo paso a paso de la solución con escuchadores individuales (sin burbujeo).
* 🚀 **[Guía Detallada Solución 2 (PDF)](version-2-delegacion-eventos/Guia_Detallada_Solucion_2_Delegacion_Eventos.pdf)**: Desglose exhaustivo paso a paso de la solución con delegación de eventos (`Event Bubbling`).

---

## 📋 PARTE 1: Enunciado del Ejercicio

### 1.1 Contexto y Objetivo
El objetivo de la práctica es programar en JavaScript la lógica de una calculadora interactiva utilizando una base ya maquetada en HTML (`index.html`) y CSS (`main.css`).

El alumnado debe construir el código de forma **incremental por hitos de funcionamiento**, asegurándose de que cada funcionalidad sea operativa y verificable en pantalla antes de abordar la siguiente.

---

### 1.2 Hitos de Funcionamiento Obligatorios

| Hito | Nombre del Hito | Descripción del Comportamiento | Prueba de Validación |
| :---: | :--- | :--- | :--- |
| **1** | **Escribir números** | Al hacer clic en los botones numéricos (0-9), deben mostrarse en el display. Si la pantalla muestra `'0'`, se reemplaza por el dígito tecleado (evitando valores como `"07"`). Los siguientes dígitos se concatenan. | Teclear `1`, `2`, `3` ➔ En pantalla se ve `123`. |
| **2** | **Guardar memoria y suma (+)** | Al presionar `+`, se guarda el número escrito en memoria (`operandoAnterior`) y se activa una bandera (`reiniciarDisplay = true`) para que el siguiente número no se pegue al anterior. | Escribir `15`, pulsar `+`, escribir `4` ➔ En pantalla se ve `4` (el `15` se mantiene en memoria). |
| **3** | **Calcular con el igual (=)** | Al pulsar `=`, se convierten los operandos a números (`parseFloat`), se realiza la suma y se muestra el resultado final en el display. | `7` `+` `8` `=` ➔ Muestra `15`. |
| **4** | **Resto de operaciones** | Implementar la resta (`-`), multiplicación (`*`) y división (`/`) mediante una estructura `switch (operacion)`. | `9 - 4 = 5`<br>`6 * 3 = 18`<br>`20 / 4 = 5` |
| **5** | **Operaciones encadenadas** | Si el usuario teclea `5 + 3 + 2 =`, al presionar el segundo `+` la calculadora debe calcular automáticamente el subtotal `8` antes de registrar la nueva operación. | `5` `+` `3` `+` ➔ La pantalla ya muestra `8`. Luego `2` `=` ➔ Muestra `10`. |
| **6** | **Botón de borrado (C)** | Al pulsar `C`, se restablecen todas las variables a su estado de fábrica (`'0'`, `null`, `false`) y el display se limpia. | Teclear `999`, pulsar `C` ➔ Vuelve a `0`. |
| **7** | **Control de errores y afinado** | Controlar la división entre cero (mostrando `'Error'`) y redondear decimales con `Math.round` para evitar imprecisiones de coma flotante (ej. `0.1 + 0.2`). | `8` `/` `0` `=` ➔ Muestra `Error`. |

---

## 💡 PARTE 2: Explicación de las Dos Soluciones

Para abordar este ejercicio existen dos filosofías de gestión de eventos en el DOM. Ambas están implementadas de forma autónoma en sus respectivas carpetas:

```
calculadora/
├── Guia_General_Calculadora_JS_Ramon_Abramo.pdf     # [PDF GENERAL] Visión global y enunciado
├── README.md                                        # Índice markdown
│
├── version-1-escuchadores-individuales/             # [SOLUCIÓN 1] 1 listener por tecla (sin burbujeo)
│   ├── Guia_Detallada_Solucion_1_Escuchadores_Individuales.pdf # [PDF DETALLADO V1]
│   ├── index.html
│   ├── main.css
│   ├── app.js                                       # Código guiado completo con explicaciones
│   ├── app.alumnos.js                               # Plantilla con TODOs para el alumnado
│   ├── app.solucion.js                              # Solución limpia de referencia
│   ├── presentacion.html                            # Diapositivas para proyectar en clase
│   └── GUIA_PASO_A_PASO.md                          # Guía didáctica en Markdown
│
└── version-2-delegacion-eventos/                    # [SOLUCIÓN 2] 1 listener en el padre (con burbujeo)
    ├── Guia_Detallada_Solucion_2_Delegacion_Eventos.pdf # [PDF DETALLADO V2]
    ├── index.html
    ├── main.css
    ├── app.js                                       # Código guiado completo con explicaciones
    ├── app.alumnos.js                               # Plantilla con TODOs para el alumnado
    ├── app.solucion.js                              # Solución limpia de referencia
    ├── presentacion.html                            # Diapositivas para proyectar en clase
    └── GUIA_PASO_A_PASO.md                          # Guía didáctica en Markdown
```

---

### Solución 1: [Escuchadores Individuales (sin burbujeo)](version-1-escuchadores-individuales/)

En este enfoque no se aprovecha el contenedor padre ni el borboteo de eventos. Se seleccionan los botones mediante `document.querySelectorAll()` y se recorren con bucles `forEach()`, vinculando un `addEventListener('click')` específico a cada elemento (16 escuchadores en memoria).

#### Implementación clave:
```javascript
// Selección por grupos
const botonesNumeros = document.querySelectorAll('[data-numero]');
const botonesOperadores = document.querySelectorAll('[data-operador]');
const botonIgual = document.querySelector('[data-accion="igual"]');
const botonBorrar = document.querySelector('[data-accion="borrar"]');

// Conexión individual de cada tecla numérica
botonesNumeros.forEach((boton) => {
    boton.addEventListener('click', () => {
        agregarNumero(boton.dataset.numero);
    });
});

// Conexión individual de operadores
botonesOperadores.forEach((boton) => {
    boton.addEventListener('click', () => {
        seleccionarOperador(boton.dataset.operador);
    });
});

// Conexión directa a teclas únicas
botonIgual.addEventListener('click', () => calcular());
botonBorrar.addEventListener('click', () => borrar());
```

* **Ventajas didácticas:** Muy intuitivo para alumnos noveles; existe una relación 1 a 1 transparente entre pulsar un botón y disparar su callback sin requerir condicionales complejos.
* **Inconvenientes:** Crea 16 escuchadores en memoria; si en el futuro se creara un botón dinámico con JavaScript, no respondería al clic sin reconectar manualmente el listener.

---

### Solución 2: [Delegación de Eventos (con Event Bubbling)](version-2-delegacion-eventos/)

En este enfoque profesional se aprovecha el mecanismo de propagación de eventos (`Event Bubbling`). Se registra un **único `addEventListener('click')`** en el contenedor padre `.teclado`. Al pulsar cualquier tecla, el evento viaja hacia arriba, se identifica el botón pulsado mediante `evento.target.closest('button')` y se leen sus atributos semánticos `dataset`.

#### Implementación clave:
```javascript
// Selección única del contenedor padre
const teclado = document.querySelector('.teclado');

// Un solo escuchador para toda la calculadora
teclado.addEventListener('click', (evento) => {
    const boton = evento.target.closest('button');
    if (!boton) return; // Se hizo clic fuera de un botón

    const { numero, operador, accion } = boton.dataset;

    if (numero !== undefined) {
        agregarNumero(numero);          // Hito 1
    } else if (operador !== undefined) {
        seleccionarOperador(operador);  // Hito 2, 4 y 5
    } else if (accion === 'igual') {
        calcular();                     // Hito 3
    } else if (accion === 'borrar') {
        borrar();                       // Hito 6
    }
});
```

* **Ventajas técnicas:** Máxima eficiencia (1 solo escuchador en memoria en lugar de 16), menor acoplamiento con el HTML y escalabilidad total (cualquier nuevo botón añadido dinámicamente funcionará al instante).
* **Curva de aprendizaje:** Exige entender conceptos más avanzados como el objeto `evento`, la propiedad `target`, el método `closest()` y los atributos `dataset`.

---

## ⚖️ Cuadro Comparativo de Ambas Soluciones

| Criterio | Versión 1: Escuchadores Individuales | Versión 2: Delegación de Eventos |
| :--- | :--- | :--- |
| **Carpeta** | `version-1-escuchadores-individuales/` | `version-2-delegacion-eventos/` |
| **PDF de Detalle** | `Guia_Detallada_Solucion_1_Escuchadores_Individuales.pdf` | `Guia_Detallada_Solucion_2_Delegacion_Eventos.pdf` |
| **Número de Listeners** | 16 escuchadores activos | **1 solo escuchador activo** |
| **Mecanismo DOM** | Vínculo directo a cada nodo | **Event Bubbling** en el contenedor padre |
| **Identificación de la tecla** | Directa (un callback por botón) | `evento.target.closest('button')` + `dataset` |
| **Nuevos botones dinámicos** | Requieren añadir un nuevo listener | Funcionan inmediatamente sin tocar JavaScript |
| **Recomendación didáctica** | Primera sesión (introducción sencilla a eventos) | Segunda sesión (optimización y buenas prácticas) |

---

## 🖥️ Cómo Impartir la Práctica en Clase

1. **Para proyectar en el aula:** Cada carpeta dispone de un archivo `presentacion.html` autónomo listo para abrir en cualquier navegador (usa las teclas <kbd>→</kbd> y <kbd>←</kbd> para navegar y <kbd>F</kbd> para pantalla completa).
2. **Para entregar al alumnado:** Proporcionar la carpeta correspondiente con el archivo `app.alumnos.js` (renombrado a `app.js`), que contiene los esqueletos y bloques `TODO` ordenados hito a hito.
3. **Para corrección del docente:** Usar el archivo `app.solucion.js` de cada carpeta como solución canónica.
