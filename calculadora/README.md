# 🖩 Práctica: Calculadora en JavaScript

Bienvenido/a al repositorio maestro de la práctica de la Calculadora Web. En este proyecto se proporciona el **enunciado completo del ejercicio para el alumnado** y la **explicación detallada de tres soluciones técnicas independientes**, cada una en su propia carpeta con su código, plantilla para alumnos y solución canónica. Las presentaciones y los PDF están reunidos en la carpeta `documentacion/`.

---

## 📚 Documentación (carpeta `documentacion/`)

Todas las presentaciones HTML y los PDF están en la carpeta [`documentacion/`](documentacion/). El índice con el objetivo de cada archivo y el orden de uso recomendado está en **[documentacion.pdf](documentacion/documentacion.pdf)**.

**PDF**
* 📘 **[Guía General del Proyecto](documentacion/Guia_General_Calculadora_JS_Ramon_Abramo.pdf)**: Enunciado oficial, objetivos, arquitectura, los 7 hitos de desarrollo, comparativa técnica de las 3 opciones y consejos docentes de Ramón Abramo.
* 🧭 **[Guía del Alumno Paso a Paso](documentacion/Guia_Alumno_Paso_a_Paso_Calculadora.pdf)**: Un paso por página para programar cada solución, con pruebas y las soluciones en un anexo.
* ⚖️ **[Explicación de las Tres Soluciones](documentacion/Explicacion_Tres_Soluciones_Calculadora.pdf)**: Las tres opciones explicadas con analogías sencillas y comparadas.
* 👨‍🏫 **[Guía Detallada Solución 0 - Clase](documentacion/Guia_Detallada_Solucion_0_Solucion_Clase.pdf)**: Desglose exhaustivo de la solución original de clase con función pura `calcular()`, 3 listas de selectores y variables semánticas.
* 🛠️ **[Guía Detallada Solución 1 - Individuales](documentacion/Guia_Detallada_Solucion_1_Escuchadores_Individuales.pdf)**: Desglose de la solución con escuchadores individuales tecla a tecla.
* 🚀 **[Guía Detallada Solución 2 - Delegación](documentacion/Guia_Detallada_Solucion_2_Delegacion_Eventos.pdf)**: Desglose del patrón profesional con Delegación de Eventos (`Event Bubbling`).

**Presentaciones HTML** (se abren en el navegador)
* `presentacion_solucion_0_clase.html`, `presentacion_solucion_1_escuchadores.html` y `presentacion_solucion_2_delegacion.html`: una presentación por solución.
* `presentacion_tres_soluciones.html`: las tres soluciones explicadas y comparadas, con guion del profesor (tecla <kbd>N</kbd>) y demo en vivo.
* `guia_alumno_paso_a_paso.html`: guía interactiva para el alumnado, con soluciones ocultas y progreso guardado.

---

## 📁 Estructura del Proyecto

```
calculadora/
├── README.md                                                # Este índice general
│
├── 📁 documentacion/                                        # Presentaciones HTML y PDF
│   ├── documentacion.pdf                                    # Índice: objetivo de cada archivo
│   ├── Guia_General_Calculadora_JS_Ramon_Abramo.pdf         # Enunciado y visión global
│   ├── Guia_Alumno_Paso_a_Paso_Calculadora.pdf              # Guía guiada del alumno (papel)
│   ├── Explicacion_Tres_Soluciones_Calculadora.pdf          # Las tres soluciones explicadas
│   ├── Guia_Detallada_Solucion_0_Solucion_Clase.pdf         # PDF detallado V0
│   ├── Guia_Detallada_Solucion_1_Escuchadores_Individuales.pdf # PDF detallado V1
│   ├── Guia_Detallada_Solucion_2_Delegacion_Eventos.pdf     # PDF detallado V2
│   ├── presentacion_solucion_0_clase.html                   # Diapositivas V0
│   ├── presentacion_solucion_1_escuchadores.html            # Diapositivas V1
│   ├── presentacion_solucion_2_delegacion.html              # Diapositivas V2
│   ├── presentacion_tres_soluciones.html                    # Diapositivas comparativas
│   └── guia_alumno_paso_a_paso.html                         # Guía interactiva del alumno
│
├── 📁 version-0-solucion-clase/                             # [OPCIÓN 0] Solución original de Ramón Abramo
├── 📁 version-1-escuchadores-individuales/                 # [OPCIÓN 1] Un listener por tecla (sin burbujeo)
└── 📁 version-2-delegacion-eventos/                        # [OPCIÓN 2] Delegación en el contenedor padre
    ├── index.html                                           # Interfaz visual
    ├── main.css                                             # Estilos CSS
    ├── app.js                                               # Solución completa comentada por hitos (la que carga index.html)
    ├── app.alumno.js                                        # Plantilla con TODO para entregar a los alumnos
    └── GUIA_PASO_A_PASO.md                                  # Guía en Markdown
```

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
| **2** | **Guardar memoria y suma (+)** | Al presionar `+`, se guarda el número escrito en memoria y se activa una bandera para que el siguiente número no se pegue al anterior. | Escribir `15`, pulsar `+`, escribir `4` ➔ En pantalla se ve `4` (el `15` se mantiene en memoria). |
| **3** | **Calcular con el igual (=)** | Al pulsar `=`, se convierten los operandos a números (`Number` o `parseFloat`), se realiza la suma y se muestra el resultado final en el display. | `7` `+` `8` `=` ➔ Muestra `15`. |
| **4** | **Resto de operaciones** | Implementar la resta (`-`), multiplicación (`*`) y división (`/`) mediante una estructura `switch (operacion)`. | `9 - 4 = 5`<br>`6 * 3 = 18`<br>`20 / 4 = 5` |
| **5** | **Operaciones encadenadas** | Si el usuario teclea `5 + 3 + 2 =`, al presionar el segundo `+` la calculadora debe calcular automáticamente el subtotal `8` antes de registrar la nueva operación. | `5` `+` `3` `+` ➔ La pantalla ya muestra `8`. Luego `2` `=` ➔ Muestra `10`. |
| **6** | **Botón de borrado (C)** | Al pulsar `C`, se restablecen todas las variables a su estado de fábrica (`'0'`, `null`, `false`) y el display se limpia. | Teclear `999`, pulsar `C` ➔ Vuelve a `0`. |
| **7** | **Control de errores y afinado** | Controlar la división entre cero (mostrando `'Error'`) y redondear decimales para evitar imprecisiones de coma flotante (ej. `0.1 + 0.2`). | `8` `/` `0` `=` ➔ Muestra `Error`. |

---

## ⚖️ Cuadro Comparativo de las Tres Opciones

| Criterio | Opción 0: Clase (Ramón Abramo) | Opción 1: Escuchadores Individuales | Opción 2: Delegación de Eventos |
| :--- | :--- | :--- | :--- |
| **Carpeta** | `version-0-solucion-clase/` | `version-1-escuchadores-individuales/` | `version-2-delegacion-eventos/` |
| **PDF de Detalle** | `Guia_Detallada_Solucion_0_Solucion_Clase.pdf` | `Guia_Detallada_Solucion_1_Escuchadores_Individuales.pdf` | `Guia_Detallada_Solucion_2_Delegacion_Eventos.pdf` |
| **Función de cálculo** | Pura: `calcular(n1, n2, op)` | Acoplada a variables globales | Acoplada a variables globales |
| **Agrupación DOM** | 3 listas: `numeros`, `operadores`, `acciones` | 5 selectores por tipo de botón | 1 selector: contenedor `.teclado` |
| **Número de Listeners** | 16 escuchadores activos | 16 escuchadores activos | **1 solo escuchador activo** |
| **Mecanismo DOM** | Vínculo directo por listas | Vínculo directo botón a botón | **Event Bubbling** en el padre |
| **Identificación de tecla** | Directa en cada bucle `forEach` | Directa en cada bucle `forEach` | `e.target.closest('button')` + `dataset` |
| **Elementos dinámicos** | Requieren añadir nuevo listener | Requieren añadir nuevo listener | Funcionan inmediatamente sin tocar JS |
| **Recomendación didáctica** | **Explicación estándar de clase** | Introducción básica desglosada | **Optimización profesional** |

---

## 🖥️ Cómo Impartir la Práctica en Clase

1. **Para proyectar en el aula:** La carpeta `documentacion/` tiene una presentación HTML autónoma por solución y otra comparativa, listas para abrir en cualquier navegador (usa las teclas <kbd>→</kbd> y <kbd>←</kbd> para navegar y <kbd>F</kbd> para pantalla completa).
2. **Para entregar al alumnado:** Proporcionar la carpeta correspondiente sustituyendo `app.js` por `app.alumno.js` (renombrado a `app.js`), que contiene los esqueletos y bloques `TODO` ordenados hito a hito.
3. **Para corrección del docente:** El `app.js` de cada carpeta es la solución completa y comentada.
