from pdf_builder_base import CSS_GLOBAL, render_pdf

html_general = f"""<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Guía General: El Juego del Ahorcado en JavaScript - Ramón Abramo</title>
<style>
{CSS_GLOBAL}
</style>
</head>
<body>

  <!-- PÁGINA 1: PORTADA Y PRESENTACIÓN -->
  <div class="page">
    <div class="page-header">
      <span>📘 GUÍA DOCENTE MAESTRA • CONFECCIÓN WEB 2026</span>
      <span class="badge-header">ENUNCIADO Y TRES SOLUCIONES</span>
    </div>
    <div class="content-area">
      <div class="cover-card">
        <div class="author-badge">👨‍🏫 RAMÓN ABRAMO • CURSO DE DESARROLLO WEB 2026</div>
        <h1>El Juego del Ahorcado en JavaScript</h1>
        <p style="color: #94a3b8; font-size: 9pt; margin: 0;">
          Guía pedagógica integral, especificación de hitos de desarrollo y desglose comparativo de tres soluciones técnicas progresivas.
        </p>
      </div>

      <p class="lead">
        El <strong>Juego del Ahorcado</strong> es uno de los proyectos didácticos más completos en la formación de desarrolladores web frontend. Integra el manejo de arrays y cadenas, manipulación del DOM, captura de eventos de usuario y dibujo vectorial progresivo con SVG en base al estado del juego.
      </p>

      <h2>Índice General del Documento</h2>
      <table class="custom-table">
        <tr>
          <th style="width: 25%;">Sección</th>
          <th style="width: 50%;">Contenido Pedagógico</th>
          <th style="width: 25%;">Página</th>
        </tr>
        <tr>
          <td><strong>1. Presentación</strong></td>
          <td>Contexto docente, objetivos formativos y resumen del ejercicio.</td>
          <td>Página 1</td>
        </tr>
        <tr>
          <td><strong>2. Enunciado Oficial</strong></td>
          <td>Ciclo de vida del juego, reglas, dibujo del muñeco y flujo de datos.</td>
          <td>Página 2</td>
        </tr>
        <tr>
          <td><strong>3. Los 6 Hitos</strong></td>
          <td>Desglose de fases obligatorias de desarrollo y pruebas de validación.</td>
          <td>Página 3</td>
        </tr>
        <tr>
          <td><strong>4. Gráficos SVG</strong></td>
          <td>Lienzo vectorial, coordenadas de la horca y revelado por CSS.</td>
          <td>Página 4</td>
        </tr>
        <tr>
          <td><strong>5. Tres Soluciones</strong></td>
          <td>Matriz comparativa: V1 Básica, V2 Teclado Virtual y V3 POO & Audio.</td>
          <td>Página 5</td>
        </tr>
        <tr>
          <td><strong>6. Rúbrica & Docencia</strong></td>
          <td>Pautas metodológicas, temporización en el aula y rúbrica de evaluación.</td>
          <td>Página 6</td>
        </tr>
      </table>

      <h2>Competencias Técnicas que Desarrolla el Alumno</h2>
      <div class="grid-3">
        <div class="box box-info">
          <div class="box-title">Lógica Algorítmica</div>
          <p style="font-size: 7.6pt; margin: 0;">
            Gestión de arrays paralelos, búsquedas con bucles <code>for</code> e <code>includes()</code>, y control de vidas.
          </p>
        </div>
        <div class="box box-tip">
          <div class="box-title">Manipulación del DOM</div>
          <p style="font-size: 7.6pt; margin: 0;">
            Creación dinámica de elementos, manipulación de clases semánticas y actualización reactiva de la interfaz.
          </p>
        </div>
        <div class="box box-warning">
          <div class="box-title">Arquitectura de Eventos</div>
          <p style="font-size: 7.6pt; margin: 0;">
            Uso de <em>Event Bubbling</em>, sincronización con teclado físico y desacoplamiento mediante clases POO.
          </p>
        </div>
      </div>
    </div>
    <div class="page-footer">
      <span>Práctica del Ahorcado • Ramón Abramo</span>
      <span>Página 1 de 6</span>
    </div>
  </div>

  <!-- PÁGINA 2: ENUNCIADO OFICIAL Y ARQUITECTURA -->
  <div class="page">
    <div class="page-header">
      <span>📘 GUÍA DOCENTE MAESTRA • ENUNCIADO OFICIAL</span>
      <span class="badge-header">ARQUITECTURA DE JUEGO</span>
    </div>
    <div class="content-area">
      <h2>1. Enunciado Oficial del Ejercicio</h2>
      <p class="lead">
        El alumnado debe implementar la lógica de un juego del ahorcado donde el sistema elige una palabra al azar de un banco predeterminado, oculta sus caracteres mediante guiones bajos y permite al usuario descubrirla proponiendo letras una a una.
      </p>

      <div class="box box-info">
        <div class="box-title">Reglas Clave de la Dinámica</div>
        <p style="font-size: 7.7pt; margin: 0;">
          1. <strong>Acierto:</strong> Si la letra propuesta está en la palabra secreta, se revelan <em>todas</em> sus apariciones en el display.<br>
          2. <strong>Fallo:</strong> Si la letra no coincide, se descuenta 1 vida y se dibuja la siguiente parte del muñeco ahorcado.<br>
          3. <strong>Validación preventiva:</strong> Proponer una letra repetida o un carácter no alfabético <em>nunca</em> debe descontar vidas.<br>
          4. <strong>Victoria:</strong> Se produce cuando no queda ningún guion bajo en la palabra adivinada.<br>
          5. <strong>Derrota:</strong> Se produce al cometer 6 fallos consecutivos. Se revela la palabra y el muñeco muestra cara de derrota.
        </p>
      </div>

      <h2>2. Diagrama de Flujo del Estado de Partida</h2>
      <div class="box box-tip">
        <div class="box-title">Flujo de Ejecución por Jugada</div>
        <p style="font-size: 7.6pt; line-height: 1.35; margin: 0;">
          <code>[Entrada de Letra]</code> ➔ ¿Es válida y no usada? ➔ SI ➔ Añadir a <code>letrasUsadas</code>.<br>
          ➔ ¿Está en <code>palabraSecreta</code>?<br>
          &nbsp;&nbsp;&nbsp;&nbsp;├─► <strong>SÍ:</strong> Destapar posiciones en <code>letrasAdivinadas</code> ➔ ¿Quedan guiones? ➔ NO ➔ <strong>🎉 VICTORIA</strong>.<br>
          &nbsp;&nbsp;&nbsp;&nbsp;└─► <strong>NO:</strong> Incrementar <code>fallos++</code> ➔ Dibujar parte SVG ➔ ¿Fallos == 6? ➔ <strong>💀 DERROTA</strong>.
        </p>
      </div>

      <h2>3. Estructuras de Datos Fundamentales</h2>
      <table class="custom-table">
        <tr>
          <th>Variable / Estructura</th>
          <th>Tipo</th>
          <th>Propósito Pedagógico</th>
        </tr>
        <tr>
          <td><code>palabraSecreta</code></td>
          <td>String</td>
          <td>Almacena la palabra seleccionada al azar (ej: <code>"JAVASCRIPT"</code>).</td>
        </tr>
        <tr>
          <td><code>letrasAdivinadas</code></td>
          <td>Array &lt;String&gt;</td>
          <td>Contiene guiones y letras acertadas (ej: <code>['_', 'A', '_', 'A']</code>).</td>
        </tr>
        <tr>
          <td><code>letrasUsadas</code></td>
          <td>Array o Set</td>
          <td>Historial de caracteres ya propuestos para evitar penalizaciones dobles.</td>
        </tr>
        <tr>
          <td><code>fallos</code></td>
          <td>Number</td>
          <td>Contador de 0 a 6 que determina directamente qué piezas del SVG mostrar.</td>
        </tr>
      </table>
    </div>
    <div class="page-footer">
      <span>Práctica del Ahorcado • Ramón Abramo</span>
      <span>Página 2 de 6</span>
    </div>
  </div>

  <!-- PÁGINA 3: LOS 6 HITOS DE DESARROLLO -->
  <div class="page">
    <div class="page-header">
      <span>📘 GUÍA DOCENTE MAESTRA • HITOS OBLIGATORIOS</span>
      <span class="badge-header">FASES DE CONSTRUCCIÓN</span>
    </div>
    <div class="content-area">
      <h2>Los 6 Hitos Obligatorios de Construcción</h2>
      <p class="lead">
        El desarrollo incremental garantiza que el alumnado valide visualmente cada funcionalidad antes de continuar con la siguiente:
      </p>

      <table class="custom-table">
        <tr>
          <th style="width: 8%;">Hito</th>
          <th style="width: 22%;">Objetivo Técnico</th>
          <th style="width: 45%;">Detalle de Implementación</th>
          <th style="width: 25%;">Prueba de Aula</th>
        </tr>
        <tr>
          <td><span class="badge-step">H1</span></td>
          <td><strong>Palabra & Display</strong></td>
          <td>Elegir palabra aleatoria con <code>Math.random()</code> y crear un array de guiones bajos de igual longitud.</td>
          <td>Palabra de 4 letras genera exactamente <code>_ _ _ _</code>.</td>
        </tr>
        <tr>
          <td><span class="badge-step">H2</span></td>
          <td><strong>Validación Letra</strong></td>
          <td>Filtrar entradas vacías, números o caracteres especiales. Comprobar no duplicidad en el historial.</td>
          <td>Probar dos veces 'A' no suma fallo ni modifica vidas.</td>
        </tr>
        <tr>
          <td><span class="badge-step">H3</span></td>
          <td><strong>Descubrir Aciertos</strong></td>
          <td>Recorrer la palabra con un bucle. Si coincide la letra, reemplazar el guion en la misma posición.</td>
          <td>'A' en "PANTALLA" desvela las 3 apariciones juntas.</td>
        </tr>
        <tr>
          <td><span class="badge-step">H4</span></td>
          <td><strong>Dibujo Progresivo</strong></td>
          <td>Si la letra no existe, incrementar <code>fallos</code> y activar la clase <code>.visible</code> en la parte SVG correspondiente.</td>
          <td>Con 1 fallo se ve la cabeza; con 2 el tronco...</td>
        </tr>
        <tr>
          <td><span class="badge-step">H5</span></td>
          <td><strong>Victoria</strong></td>
          <td>Verificar si <code>!letrasAdivinadas.includes('_')</code>. Si es verdad, emitir mensaje de felicitación y deshabilitar inputs.</td>
          <td>Adivinar la última letra bloquea el teclado y felicita.</td>
        </tr>
        <tr>
          <td><span class="badge-step">H6</span></td>
          <td><strong>Derrota & Fin</strong></td>
          <td>Si <code>fallos >= 6</code>, mostrar expresión de derrota en el muñeco, destapar la palabra oculta y bloquear inputs.</td>
          <td>Al 6º fallo el juego termina y muestra la solución.</td>
        </tr>
      </table>

      <h2>Estrategia Didáctica para el Aula</h2>
      <div class="grid-2">
        <div class="box box-tip">
          <div class="box-title">Paso 1: La prueba en consola</div>
          <p style="font-size: 7.6pt; margin: 0;">
            Antes de conectar el HTML, el alumno puede imprimir <code>console.log(letrasAdivinadas.join(' '))</code> tras cada jugada para entender la sincronía entre memoria y pantalla.
          </p>
        </div>
        <div class="box box-warning">
          <div class="box-title">Paso 2: La sincronía visual</div>
          <p style="font-size: 7.6pt; margin: 0;">
            Asegurar que las vidas mostradas en texto coincidan estrictamente con las partes dibujadas en el SVG (6 - fallos).
          </p>
        </div>
      </div>
    </div>
    <div class="page-footer">
      <span>Práctica del Ahorcado • Ramón Abramo</span>
      <span>Página 3 de 6</span>
    </div>
  </div>

  <!-- PÁGINA 4: EL LIENZO VECTORIAL SVG -->
  <div class="page">
    <div class="page-header">
      <span>📘 GUÍA DOCENTE MAESTRA • GRÁFICOS SVG</span>
      <span class="badge-header">DIBUJO VECTORIAL DEL AHORCADO</span>
    </div>
    <div class="content-area">
      <h2>El Lienzo Vectorial SVG del Ahorcado</h2>
      <p class="lead">
        El juego utiliza un elemento <code>&lt;svg viewBox="0 0 200 240"&gt;</code> que garantiza escalabilidad infinita, nitidez en cualquier resolución y un consumo de recursos prácticamente nulo.
      </p>

      <h2>1. Estructura de Elementos y Coordenadas</h2>
      <table class="custom-table">
        <tr>
          <th>Parte</th>
          <th>Etiqueta SVG</th>
          <th>Coordenadas / Parámetros</th>
          <th>Estado Inicial</th>
        </tr>
        <tr>
          <td><strong>Base</strong></td>
          <td><code>&lt;line&gt;</code></td>
          <td><code>x1="20" y1="220" x2="100" y2="220"</code></td>
          <td>Siempre visible</td>
        </tr>
        <tr>
          <td><strong>Poste & Viga</strong></td>
          <td><code>&lt;line&gt;</code></td>
          <td><code>x1="50" y1="220" x2="50" y2="20"</code> (poste) y <code>x2="140"</code> (viga)</td>
          <td>Siempre visible</td>
        </tr>
        <tr>
          <td><strong>Cuerda</strong></td>
          <td><code>&lt;line&gt;</code></td>
          <td><code>x1="140" y1="20" x2="140" y2="50"</code></td>
          <td>Siempre visible</td>
        </tr>
        <tr>
          <td><strong>1. Cabeza</strong></td>
          <td><code>&lt;circle&gt;</code></td>
          <td><code>cx="140" cy="70" r="20"</code></td>
          <td>Oculta (clase <code>.parte-oculta</code>)</td>
        </tr>
        <tr>
          <td><strong>2. Tronco</strong></td>
          <td><code>&lt;line&gt;</code></td>
          <td><code>x1="140" y1="90" x2="140" y2="150"</code></td>
          <td>Oculta</td>
        </tr>
        <tr>
          <td><strong>3. Brazo Izquierdo</strong></td>
          <td><code>&lt;line&gt;</code></td>
          <td><code>x1="140" y1="105" x2="115" y2="135"</code></td>
          <td>Oculta</td>
        </tr>
        <tr>
          <td><strong>4. Brazo Derecho</strong></td>
          <td><code>&lt;line&gt;</code></td>
          <td><code>x1="140" y1="105" x2="165" y2="135"</code></td>
          <td>Oculta</td>
        </tr>
        <tr>
          <td><strong>5. Pierna Izquierda</strong></td>
          <td><code>&lt;line&gt;</code></td>
          <td><code>x1="140" y1="150" x2="120" y2="195"</code></td>
          <td>Oculta</td>
        </tr>
        <tr>
          <td><strong>6. Pierna Derecha</strong></td>
          <td><code>&lt;line&gt;</code></td>
          <td><code>x1="140" y1="150" x2="160" y2="195"</code></td>
          <td>Oculta</td>
        </tr>
      </table>

      <h2>2. El Mecanismo de Revelado con CSS</h2>
      <pre><code><span class="cm">/* main.css */</span>
<span class="kw">.parte-oculta</span> &#123;
  <span class="prop">opacity</span>: <span class="num">0</span>;
  <span class="prop">transition</span>: opacity <span class="num">0.3s</span> ease;
&#125;
<span class="kw">.parte-oculta.visible</span> &#123;
  <span class="prop">opacity</span>: <span class="num">1</span>;
&#125;</code></pre>

      <div class="box box-tip">
        <div class="box-title">Ventaja Didáctica de la Solución Vectorial</div>
        <p style="font-size: 7.7pt; margin: 0;">
          No requiere cargar 7 imágenes PNG separadas ni lidiar con rutas rotas. Todo el dibujo reside en el propio documento HTML y se activa limpiamente mediante <code>partes[fallos - 1].classList.add('visible')</code>.
        </p>
      </div>
    </div>
    <div class="page-footer">
      <span>Práctica del Ahorcado • Ramón Abramo</span>
      <span>Página 4 de 6</span>
    </div>
  </div>

  <!-- PÁGINA 5: COMPARATIVA DE LAS TRES OPCIONES -->
  <div class="page">
    <div class="page-header">
      <span>📘 GUÍA DOCENTE MAESTRA • TRES SOLUCIONES</span>
      <span class="badge-header">MATRIZ TÉCNICA COMPARATIVA</span>
    </div>
    <div class="content-area">
      <h2>Cuadro Comparativo de las Tres Versiones</h2>
      <p class="lead">
        Se proporcionan tres implementaciones completas e independientes para adaptarse al ritmo y perfil de aprendizaje de cada grupo:
      </p>

      <table class="custom-table">
        <tr>
          <th>Criterio</th>
          <th style="color: #0284c7;">V1: Básica Lineal</th>
          <th style="color: #7c3aed;">V2: Teclado & Eventos</th>
          <th style="color: #059669;">V3: Avanzada POO</th>
        </tr>
        <tr>
          <td><strong>Carpeta</strong></td>
          <td><code>version-1-basica-lineal/</code></td>
          <td><code>version-2-teclado-eventos/</code></td>
          <td><code>version-3-avanzada-poo/</code></td>
        </tr>
        <tr>
          <td><strong>Paradigma</strong></td>
          <td>Imperativo lineal directo</td>
          <td>Basado en eventos y UX</td>
          <td>Orientado a Objetos (POO)</td>
        </tr>
        <tr>
          <td><strong>Entrada del usuario</strong></td>
          <td><code>&lt;input type="text"&gt;</code> clásico</td>
          <td>Teclado virtual + Teclado físico</td>
          <td>Teclado virtual + Físico accesible</td>
        </tr>
        <tr>
          <td><strong>Estructura del Banco</strong></td>
          <td>Array simple de strings</td>
          <td>Array de objetos (palabra, cat, pista)</td>
          <td>Banco clasificado con dificultad</td>
        </tr>
        <tr>
          <td><strong>Manejo de eventos</strong></td>
          <td>Listeners en botones fijos</td>
          <td><strong>Event Bubbling</strong> en el padre</td>
          <td>Desacoplado (UI vs Engine)</td>
        </tr>
        <tr>
          <td><strong>Estructura de datos</strong></td>
          <td>Array básico (<code>includes</code>, <code>push</code>)</td>
          <td><strong><code>Set</code> nativo</strong> sin duplicados</td>
          <td>Estado encapsulado en clase</td>
        </tr>
        <tr>
          <td><strong>Persistencia</strong></td>
          <td>Ninguna (en memoria)</td>
          <td>Ninguna</td>
          <td><strong><code>localStorage</code> (rachas y %)</strong></td>
        </tr>
        <tr>
          <td><strong>Efectos de sonido</strong></td>
          <td>Sin audio</td>
          <td>Sin audio</td>
          <td><strong>Web Audio API puro nativo</strong></td>
        </tr>
        <tr>
          <td><strong>Efectos visuales</strong></td>
          <td>SVG estático con opacidades</td>
          <td>Casillas animadas y corazones</td>
          <td><strong>Lluvia de confeti Canvas</strong></td>
        </tr>
        <tr>
          <td><strong>Niveles de dificultad</strong></td>
          <td>Fija (6 vidas)</td>
          <td>Fija (6 vidas)</td>
          <td><strong>3 Niveles + Contrarreloj 45s</strong></td>
        </tr>
        <tr>
          <td><strong>Recomendación docente</strong></td>
          <td><strong>Iniciación y fundamentos</strong></td>
          <td><strong>Práctica estándar guiada</strong></td>
          <td><strong>Ampliación y portafolio</strong></td>
        </tr>
      </table>

      <h2>Progresión Pedagógica Sugerida</h2>
      <div class="grid-3">
        <div class="box box-info">
          <div class="box-title">Semana 1: V1</div>
          <p style="font-size: 7.5pt; margin: 0;">
            Explicar variables, arrays, bucles <code>for</code> e <code>if/else</code>. Consolidar el flujo imperativo.
          </p>
        </div>
        <div class="box box-warning">
          <div class="box-title">Semana 2: V2</div>
          <p style="font-size: 7.5pt; margin: 0;">
            Añadir UX profesional: teclado dinámico, delegación de eventos y objetos con pistas.
          </p>
        </div>
        <div class="box box-tip">
          <div class="box-title">Semana 3: V3</div>
          <p style="font-size: 7.5pt; margin: 0;">
            Subir de nivel: Clases ES6, Web Audio API, Canvas y persistencia con <code>localStorage</code>.
          </p>
        </div>
      </div>
    </div>
    <div class="page-footer">
      <span>Práctica del Ahorcado • Ramón Abramo</span>
      <span>Página 5 de 6</span>
    </div>
  </div>

  <!-- PÁGINA 6: GUÍA DE EVALUACIÓN Y RÚBRICA -->
  <div class="page">
    <div class="page-header">
      <span>📘 GUÍA DOCENTE MAESTRA • EVALUACIÓN Y RÚBRICA</span>
      <span class="badge-header">CRITERIOS DOCENTES</span>
    </div>
    <div class="content-area">
      <h2>Pautas Docentes y Rúbrica de Calificación</h2>
      <p class="lead">
        Criterios recomendados para la evaluación objetiva de la práctica entregada por el alumnado:
      </p>

      <table class="custom-table">
        <tr>
          <th style="width: 30%;">Criterio de Evaluación</th>
          <th style="width: 50%;">Descripción Técnica</th>
          <th style="width: 20%;">Ponderación</th>
        </tr>
        <tr>
          <td><strong>1. Lógica de Acierto y Guiones</strong></td>
          <td>El array de guiones refleja la longitud exacta y destapa todas las letras coincidentes.</td>
          <td><strong>25%</strong></td>
        </tr>
        <tr>
          <td><strong>2. Sincronía del Dibujo SVG</strong></td>
          <td>Cada fallo activa la pieza corporal correspondiente sin desfasarse del contador de vidas.</td>
          <td><strong>25%</strong></td>
        </tr>
        <tr>
          <td><strong>3. Validación Preventiva</strong></td>
          <td>Letras repetidas o caracteres no válidos muestran alerta y no penalizan al jugador.</td>
          <td><strong>20%</strong></td>
        </tr>
        <tr>
          <td><strong>4. Fin de Juego y Bloqueo</strong></td>
          <td>Al ganar o perder, los controles se bloquean y se revela el resultado sin bugs.</td>
          <td><strong>15%</strong></td>
        </tr>
        <tr>
          <td><strong>5. Calidad del Código</strong></td>
          <td>Nombres de variables semánticos, indentación correcta y ausencia de errores en consola.</td>
          <td><strong>15%</strong></td>
        </tr>
      </table>

      <h2>Errores Típicos del Alumnado y Cómo Anticiparlos</h2>
      <div class="box box-warning">
        <div class="box-title">1. El error del "primer acierto único"</div>
        <p style="font-size: 7.7pt; margin: 0;">
          Muchos alumnos usan <code>indexOf()</code> y solo descubren la primera 'A' de una palabra como "CASA". Recuerda explicar que se debe usar un bucle <code>for</code> completo para recorrer todos los índices.
        </p>
      </div>

      <div class="box box-warning">
        <div class="box-title">2. Descontar vida en letras repetidas</div>
        <p style="font-size: 7.7pt; margin: 0;">
          Si el usuario vuelve a teclear una letra ya probada, el código debe abortar con <code>return</code> antes de llamar a la lógica de acierto/fallo.
        </p>
      </div>

      <div class="box box-tip">
        <div class="box-title">Material Proporcionado en este Repositorio</div>
        <p style="font-size: 7.7pt; margin: 0;">
          📁 Código maestro para el profesor (<code>app.js</code>)<br>
          📝 Plantilla guiada con TODOs para los alumnos (<code>app.alumnos.js</code>)<br>
          🔑 Clave canónica de corrección limpia (<code>app.solucion.js</code>)<br>
          🖥️ Presentaciones HTML interactivas con pantalla completa para clase.
        </p>
      </div>
    </div>
    <div class="page-footer">
      <span>Práctica del Ahorcado • Ramón Abramo</span>
      <span>Página 6 de 6</span>
    </div>
  </div>

</body>
</html>
"""

pdf_out = r"d:\Ramon\www\confeccion2026\practicas\ahorcado\Guia_General_Ahorcado_JS_Ramon_Abramo.pdf"
render_pdf(html_general, pdf_out)
