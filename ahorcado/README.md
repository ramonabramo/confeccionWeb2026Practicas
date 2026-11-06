# 🎮 Práctica: El Juego del Ahorcado en JavaScript

Bienvenido/a al repositorio maestro de la práctica del **Juego del Ahorcado**. En este proyecto se proporciona el **enunciado completo del ejercicio para el alumnado** y la **explicación detallada de tres soluciones técnicas progresivas** (de la más sencilla a la más avanzada), cada una en su propia carpeta con su interfaz, código maestro, plantilla para alumnos y solución canónica. Las presentaciones y los PDF están reunidos en la carpeta `documentacion/`.

---

## 📚 Documentación (carpeta `documentacion/`)

Todas las presentaciones HTML y los PDF están en la carpeta [`documentacion/`](documentacion/). El índice con el objetivo de cada archivo y el orden de uso recomendado está en **[documentacion.pdf](documentacion/documentacion.pdf)**.

**PDF**
* 📘 **[Guía General del Proyecto](documentacion/Guia_General_Ahorcado_JS_Ramon_Abramo.pdf)**: Enunciado oficial, objetivos, arquitectura, los 6 hitos de desarrollo, comparativa técnica de las 3 opciones y consejos docentes de Ramón Abramo.
* 🧭 **[Guía del Alumno Paso a Paso](documentacion/Guia_Alumno_Paso_a_Paso_Ahorcado.pdf)**: Un paso por página para programar cada solución, con pruebas y las soluciones en un anexo.
* ⚖️ **[Explicación de las Tres Soluciones](documentacion/Explicacion_Tres_Soluciones_Ahorcado.pdf)**: Las tres opciones explicadas con analogías sencillas y comparadas.
* 👨‍🏫 **[Guía Detallada Solución 1 - Básica Lineal](documentacion/Guia_Detallada_Solucion_1_Basica_Lineal.pdf)**: Variables globales, `getElementById`, bucles `for` y entrada mediante `<input>` tradicional.
* 🛠️ **[Guía Detallada Solución 2 - Teclado Virtual](documentacion/Guia_Detallada_Solucion_2_Teclado_Eventos.pdf)**: Teclado generado dinámicamente, delegación de eventos (`Event Bubbling`), pistas temáticas y teclado físico.
* 🚀 **[Guía Detallada Solución 3 - POO & Audio](documentacion/Guia_Detallada_Solucion_3_Avanzada_POO.pdf)**: Clases ES6 desacopladas, Web Audio API, dificultades adaptativas y persistencia en `localStorage`.

**Presentaciones HTML** (se abren en el navegador)
* `presentacion_solucion_1_basica.html`, `presentacion_solucion_2_teclado.html` y `presentacion_solucion_3_poo.html`: una presentación por solución.
* `presentacion_tres_soluciones.html`: las tres soluciones explicadas y comparadas, con guion del profesor (tecla <kbd>N</kbd>) y demo en vivo de la delegación de eventos.
* `guia_alumno_paso_a_paso.html`: guía interactiva para el alumnado, con soluciones ocultas y progreso guardado.

---

## 📁 Estructura del Proyecto

```
ahorcado/
├── README.md                                                # Este índice general
│
├── 📁 documentacion/                                        # Presentaciones HTML y PDF
│   ├── documentacion.pdf                                    # Índice: objetivo de cada archivo
│   ├── Guia_General_Ahorcado_JS_Ramon_Abramo.pdf            # Enunciado y visión global
│   ├── Guia_Alumno_Paso_a_Paso_Ahorcado.pdf                 # Guía guiada del alumno (papel)
│   ├── Explicacion_Tres_Soluciones_Ahorcado.pdf             # Las tres soluciones explicadas
│   ├── Guia_Detallada_Solucion_1_Basica_Lineal.pdf          # PDF detallado V1
│   ├── Guia_Detallada_Solucion_2_Teclado_Eventos.pdf        # PDF detallado V2
│   ├── Guia_Detallada_Solucion_3_Avanzada_POO.pdf           # PDF detallado V3
│   ├── presentacion_solucion_1_basica.html                  # Diapositivas V1
│   ├── presentacion_solucion_2_teclado.html                 # Diapositivas V2
│   ├── presentacion_solucion_3_poo.html                     # Diapositivas V3
│   ├── presentacion_tres_soluciones.html                    # Diapositivas comparativas
│   └── guia_alumno_paso_a_paso.html                         # Guía interactiva del alumno
│
├── 📁 version-1-basica-lineal/                              # [OPCIÓN 1] Iniciación y lógica imperativa
├── 📁 version-2-teclado-eventos/                            # [OPCIÓN 2] Teclado virtual y delegación de eventos
└── 📁 version-3-avanzada-poo/                               # [OPCIÓN 3] POO, Web Audio y LocalStorage
    ├── index.html                                           # Interfaz visual con SVG del ahorcado
    ├── main.css                                             # Estilos y animaciones del dibujo
    ├── app.js                                               # Código maestro comentado
    ├── app.alumnos.js                                       # Plantilla para entregar a los alumnos
    ├── app.solucion.js                                      # Solución limpia canónica
    └── GUIA_PASO_A_PASO.md                                  # Guía en Markdown
```

---

## 📋 PARTE 1: Enunciado del Ejercicio

### 1.1 Contexto y Objetivo
El objetivo de la práctica es programar en JavaScript el clásico **Juego del Ahorcado**. El programa debe elegir aleatoriamente una palabra oculta de un banco de palabras y mostrar en pantalla tantos guiones bajos como letras tenga la palabra. 

El jugador irá proponiendo letras una a una:
- Si la letra **acierta**, se descubren todas sus apariciones en el panel.
- Si la letra **falla**, se descuenta una vida y **se dibuja progresivamente el cuerpo del ahorcado en el gráfico vectorial**.
- Si el jugador descubre la palabra completa antes de consumir sus vidas, **gana la partida**.
- Si se cometen los fallos máximos (6 vidas), **pierde la partida**, se revela la palabra y el ahorcado muestra su cara de derrota.

---

### 1.2 Hitos de Desarrollo Obligatorios

| Hito | Nombre del Hito | Descripción del Comportamiento | Prueba de Validación |
| :---: | :--- | :--- | :--- |
| **1** | **Palabra aleatoria & display** | Extraer una palabra al azar del banco (`Math.random()`) y generar un array de guiones bajos con su misma longitud. | Para `"HTML"` se debe ver `_ _ _ _`. |
| **2** | **Validación preventiva de letra** | Comprobar que el usuario escribe una letra válida (A-Z) y verificar que no haya sido intentada antes. | Teclear una letra repetida muestra un aviso y **no descuenta vidas**. |
| **3** | **Descubrimiento de aciertos** | Si la letra está en la palabra secreta, sustituir los guiones correspondientes por la letra en todas las posiciones. | Letra `'A'` en `"PANTALLA"` ➔ `_ A _ _ A _ _ A`. |
| **4** | **Dibujo progresivo del ahorcado** | Si la letra no coincide, incrementar el contador de fallos y mostrar la parte correspondiente del muñeco en el SVG. | 1º fallo: Cabeza, 2º: Tronco, 3º: Brazo Izq, 4º: Brazo Der, 5º: Pierna Izq, 6º: Pierna Der. |
| **5** | **Condición de victoria** | Comprobar tras cada jugada si ya no quedan guiones bajos en el display. Si se completa la palabra, mostrar felicitación y bloquear inputs. | Descubrir la última letra ➔ 🎉 ¡Victoria! |
| **6** | **Condición de derrota & revelación** | Si se alcanzan los 6 fallos, activar la cara de derrota del ahorcado, revelar la palabra completa y bloquear inputs. | 6º fallo ➔ 💀 Game Over y destape de palabra. |

---

## ⚖️ Cuadro Comparativo de las Tres Opciones Técnicas

| Criterio | Versión 1: Básica Lineal | Versión 2: Teclado & Eventos | Versión 3: Avanzada POO |
| :--- | :--- | :--- | :--- |
| **Carpeta** | `version-1-basica-lineal/` | `version-2-teclado-eventos/` | `version-3-avanzada-poo/` |
| **PDF de Detalle** | `documentacion/Guia_Detallada_Solucion_1_Basica_Lineal.pdf` | `documentacion/Guia_Detallada_Solucion_2_Teclado_Eventos.pdf` | `documentacion/Guia_Detallada_Solucion_3_Avanzada_POO.pdf` |
| **Paradigma** | Imperativo / Secuencial | Basado en Eventos / Modular | **Orientado a Objetos (POO)** |
| **Entrada del jugador** | `<input type="text" maxlength="1">` | Teclado virtual dinámico + Teclado físico | Teclado virtual + Físico con feedback |
| **Estructura del Banco** | Array simple de cadenas | Array de objetos (`palabra`, `categoria`, `pista`) | Banco categorizado con pistas pro |
| **Gestión de eventos** | Listeners directos en botones | **Event Bubbling** en el padre (`closest`) | Desacoplado entre UI y Engine |
| **Estructura de datos** | Array clásico (`includes`, `push`) | **`Set` nativo** para evitar duplicados | Encapsulada dentro de la clase Engine |
| **Persistencia** | Ninguna (en memoria) | Ninguna | **`localStorage` (rachas, % victorias)** |
| **Efectos sonoros** | Sin sonido | Sin sonido | **Web Audio API puro (Do-Mi, fanfarrias)** |
| **Niveles de dificultad** | Fija (6 vidas) | Fija (6 vidas) | **3 Niveles (Fácil, Normal, Difícil 45s)** |
| **Efecto visual extra** | Cambio de clases SVG | Animación CSS en casillas de letras | **Lluvia de confeti en Canvas 2D** |
| **Recomendación didáctica** | **Iniciación / Fundamentos de JS** | **Práctica estándar de clase** | **Reto profesional / Portafolio** |

---

## 🖥️ Cómo Impartir la Práctica en Clase

1. **Para proyectar en el aula:** Abre en cualquier navegador `documentacion/presentacion_tres_soluciones.html` para la comparativa global (tecla <kbd>N</kbd> para el guion del profesor), o la `presentacion_solucion_*.html` de la versión elegida (usa las teclas <kbd>→</kbd> y <kbd>←</kbd> para navegar y <kbd>F</kbd> para pantalla completa).
2. **Para entregar al alumnado:** Proporciona la carpeta de la versión deseada con el archivo `app.alumnos.js` (renombrado a `app.js`), que contiene los esqueletos y bloques `TODO` ordenados hito a hito.
3. **Para corrección del docente:** Utiliza el archivo `app.solucion.js` de cada carpeta como solución canónica de referencia.
4. **Trabajo autónomo del alumnado:** `documentacion/guia_alumno_paso_a_paso.html` (o su PDF) guía cada solución paso a paso, con pruebas y soluciones ocultas.
5. **Documentación impresa o digital:** Entrega los PDF de `documentacion/` como material de consulta; `documentacion.pdf` explica para qué sirve cada uno.
