from pdf_builder_base import CSS_GLOBAL, render_pdf

html_v1 = f"""<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Solución 1: Básica e Imperativa - Ramón Abramo</title>
<style>
{CSS_GLOBAL}
</style>
</head>
<body>

  <!-- PÁGINA 1: PORTADA V1 -->
  <div class="page">
    <div class="page-header">
      <span>📁 VERSIÓN 1 • GUÍA DETALLADA PASO A PASO</span>
      <span class="badge-header">INICIACIÓN & IMPERATIVO</span>
    </div>
    <div class="content-area">
      <div class="cover-card">
        <div class="author-badge">👨‍🏫 RAMÓN ABRAMO • GUÍA TÉCNICA DETALLADA</div>
        <h1>Versión 1: Lógica Básica Lineal</h1>
        <p style="color: #94a3b8; font-size: 9pt; margin: 0;">
          Desglose pedagógico de la solución elemental con variables globales, bucles clásicos y manipulación directa del DOM.
        </p>
      </div>

      <p class="lead">
        La <strong>Versión 1</strong> constituye el punto de entrada natural para cualquier estudiante que aborda por primera vez la lógica de un videojuego en JavaScript. Elimina complejidades avanzadas de programación orientada a objetos o patrones reactivos para centrarse estrictamente en los fundamentos: variables, arrays, bucles <code>for</code> y condiciones <code>if/else</code>.
      </p>

      <h2>Estructura de la Carpeta <code>version-1-basica-lineal/</code></h2>
      <table class="custom-table">
        <tr>
          <th style="width: 25%;">Archivo</th>
          <th style="width: 50%;">Propósito</th>
          <th style="width: 25%;">Destinatario</th>
        </tr>
        <tr>
          <td><code>index.html</code></td>
          <td>Estructura semántica con SVG del ahorcado, display y campo de texto.</td>
          <td>Alumno / Docente</td>
        </tr>
        <tr>
          <td><code>main.css</code></td>
          <td>Estilos visuales, contraste moderno y clases <code>.visible</code> para el SVG.</td>
          <td>Alumno / Docente</td>
        </tr>
        <tr>
          <td><code>app.js</code></td>
          <td>Código maestro con explicaciones exhaustivas hito por hito.</td>
          <td>Docente</td>
        </tr>
        <tr>
          <td><code>app.alumnos.js</code></td>
          <td>Plantilla con esqueletos y bloques <code>TODO</code> listos para completar.</td>
          <td>Alumnado</td>
        </tr>
        <tr>
          <td><code>app.solucion.js</code></td>
          <td>Solución canónica limpia sin comentarios extensos para corrección rápida.</td>
          <td>Docente</td>
        </tr>
        <tr>
          <td><code>presentacion.html</code></td>
          <td>Diapositivas interactivas proyectables en el aula para explicar la V1.</td>
          <td>Docente en Aula</td>
        </tr>
      </table>

      <h2>Metodología de Trabajo en el Aula</h2>
      <div class="box box-tip">
        <div class="box-title">Recomendación para Ramón Abramo</div>
        <p style="font-size: 7.7pt; margin: 0;">
          1. Proyecta en la pizarra digital <code>presentacion.html</code> de esta carpeta.<br>
          2. Entrega al alumnado <code>index.html</code>, <code>main.css</code> y <code>app.alumnos.js</code> (renombrado a <code>app.js</code>).<br>
          3. Guía la resolución de los Hitos 1 a 6 de forma incremental comprobando la consola del navegador.
        </p>
      </div>
    </div>
    <div class="page-footer">
      <span>Guía Detallada Versión 1 • Ramón Abramo</span>
      <span>Página 1 de 6</span>
    </div>
  </div>

  <!-- PÁGINA 2: HITO 1 Y 2 -->
  <div class="page">
    <div class="page-header">
      <span>📁 VERSIÓN 1 • HITOS 1 Y 2</span>
      <span class="badge-header">DATOS Y DOM</span>
    </div>
    <div class="content-area">
      <h2>[HITO 1] Banco de Palabras y Variables de Estado</h2>
      <p class="lead">
        Definimos el vocabulario y las variables globales que retendrán en memoria el estado completo de la partida:
      </p>

      <pre><code><span class="cm">// Banco de palabras fijas en mayúsculas</span>
<span class="kw">const</span> PALABRAS = [<span class="str">'JAVASCRIPT'</span>, <span class="str">'VARIABLE'</span>, <span class="str">'FUNCION'</span>, <span class="str">'ARRAY'</span>, <span class="str">'OBJETO'</span>, <span class="str">'BUCLE'</span>];
<span class="kw">const</span> MAX_FALLOS = <span class="num">6</span>;

<span class="kw">let</span> palabraSecreta = <span class="str">''</span>;    <span class="cm">// Palabra a adivinar en la partida (ej: "VARIABLE")</span>
<span class="kw">let</span> letrasAdivinadas = [];  <span class="cm">// Array con guiones y aciertos: ['_', 'A', '_']</span>
<span class="kw">let</span> letrasUsadas = [];      <span class="cm">// Array con letras ya probadas: ['E', 'A', 'Z']</span>
<span class="kw">let</span> fallos = <span class="num">0</span>;             <span class="cm">// Contador numérico de fallos cometidos (0 a 6)</span>
<span class="kw">let</span> juegoTerminado = <span class="kw">false</span>; <span class="cm">// Bandera booleana de control</span></code></pre>

      <h2>[HITO 2] Selección de Elementos del DOM y Partes SVG</h2>
      <p>
        Guardamos en constantes las referencias a los elementos visuales una sola vez para no repetir consultas con <code>getElementById</code>:
      </p>

      <pre><code><span class="kw">const</span> palabraDisplay = document.<span class="fn">getElementById</span>(<span class="str">'palabra-display'</span>);
<span class="kw">const</span> inputLetra = document.<span class="fn">getElementById</span>(<span class="str">'input-letra'</span>);
<span class="kw">const</span> btnProbar = document.<span class="fn">getElementById</span>(<span class="str">'btn-probar'</span>);
<span class="kw">const</span> letrasUsadasDisplay = document.<span class="fn">getElementById</span>(<span class="str">'letras-usadas-display'</span>);
<span class="kw">const</span> vidasRestantes = document.<span class="fn">getElementById</span>(<span class="str">'vidas-restantes'</span>);
<span class="kw">const</span> mensajeEstado = document.<span class="fn">getElementById</span>(<span class="str">'mensaje-estado'</span>);
<span class="kw">const</span> btnReiniciar = document.<span class="fn">getElementById</span>(<span class="str">'btn-reiniciar'</span>);

<span class="cm">// Array indexado con las 6 partes corporales del SVG</span>
<span class="kw">const</span> partesAhorcado = [
  document.<span class="fn">getElementById</span>(<span class="str">'parte-cabeza'</span>),     <span class="cm">// Índice 0 ➔ Fallo 1</span>
  document.<span class="fn">getElementById</span>(<span class="str">'parte-cuerpo'</span>),     <span class="cm">// Índice 1 ➔ Fallo 2</span>
  document.<span class="fn">getElementById</span>(<span class="str">'parte-brazo-izq'</span>),  <span class="cm">// Índice 2 ➔ Fallo 3</span>
  document.<span class="fn">getElementById</span>(<span class="str">'parte-brazo-der'</span>),  <span class="cm">// Índice 3 ➔ Fallo 4</span>
  document.<span class="fn">getElementById</span>(<span class="str">'parte-pierna-izq'</span>), <span class="cm">// Índice 4 ➔ Fallo 5</span>
  document.<span class="fn">getElementById</span>(<span class="str">'parte-pierna-der'</span>)  <span class="cm">// Índice 5 ➔ Fallo 6</span>
];</code></pre>

      <div class="box box-info">
        <div class="box-title">¿Por qué un array de elementos DOM?</div>
        <p style="font-size: 7.7pt; margin: 0;">
          Agrupar las partes del muñeco en un array permite acceder a la pieza exacta en tiempo constante simplemente con <code>partesAhorcado[fallos - 1]</code>, evitando una estructura <code>switch (fallos)</code> innecesariamente larga.
        </p>
      </div>
    </div>
    <div class="page-footer">
      <span>Guía Detallada Versión 1 • Ramón Abramo</span>
      <span>Página 2 de 6</span>
    </div>
  </div>

  <!-- PÁGINA 3: HITO 3 -->
  <div class="page">
    <div class="page-header">
      <span>📁 VERSIÓN 1 • HITO 3</span>
      <span class="badge-header">INICIALIZACIÓN DEL JUEGO</span>
    </div>
    <div class="content-area">
      <h2>[HITO 3] La Función <code>iniciarJuego()</code></h2>
      <p class="lead">
        Esta función se encarga de resetear la memoria de la partida, seleccionar una nueva palabra aleatoria y restaurar el dibujo a su estado inicial:
      </p>

      <pre><code><span class="kw">function</span> <span class="fn">iniciarJuego</span>() &#123;
  <span class="cm">// 1. Selección aleatoria de la palabra secreta</span>
  <span class="kw">const</span> indiceAleatorio = Math.<span class="fn">floor</span>(Math.<span class="fn">random</span>() * PALABRAS.length);
  palabraSecreta = PALABRAS[indiceAleatorio];

  <span class="cm">// 2. Creación del array de guiones con la longitud exacta</span>
  letrasAdivinadas = [];
  <span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; palabraSecreta.length; i++) &#123;
    letrasAdivinadas.<span class="fn">push</span>(<span class="str">'_'</span>);
  &#125;

  <span class="cm">// 3. Reset de variables de control</span>
  letrasUsadas = [];
  fallos = <span class="num">0</span>;
  juegoTerminado = <span class="kw">false</span>;

  <span class="cm">// 4. Ocultar todas las partes del ahorcado quitando la clase 'visible'</span>
  partesAhorcado.<span class="fn">forEach</span>(parte =&gt; &#123;
    parte.classList.<span class="fn">remove</span>(<span class="str">'visible'</span>);
  &#125;);
  caraDerrota.classList.<span class="fn">remove</span>(<span class="str">'visible'</span>);

  <span class="cm">// 5. Restaurar estado de controles y autoenfoque</span>
  inputLetra.disabled = <span class="kw">false</span>;
  btnProbar.disabled = <span class="kw">false</span>;
  inputLetra.value = <span class="str">''</span>;
  inputLetra.<span class="fn">focus</span>();

  <span class="cm">// 6. Refrescar interfaz</span>
  <span class="fn">actualizarPantalla</span>();
  <span class="fn">mostrarMensaje</span>(<span class="str">'¡Nueva partida iniciada! Escribe una letra.'</span>, <span class="str">'normal'</span>);
&#125;</code></pre>

      <h2>Puntos Clave Explicados para el Alumnado</h2>
      <div class="grid-2">
        <div class="box box-tip">
          <div class="box-title">El algoritmo Math.random()</div>
          <p style="font-size: 7.6pt; margin: 0;">
            <code>Math.random()</code> devuelve un número decimal entre 0 y 0.999... Al multiplicarlo por la longitud del array (ej. 6) y aplicar <code>Math.floor()</code>, obtenemos un entero exacto entre 0 y 5.
          </p>
        </div>
        <div class="box box-warning">
          <div class="box-title">El bucle for de guiones</div>
          <p style="font-size: 7.6pt; margin: 0;">
            Si <code>palabraSecreta = "HTML"</code> (longitud 4), el bucle se ejecuta 4 veces insertando <code>'_'</code>, resultando en <code>['_', '_', '_', '_']</code>.
          </p>
        </div>
      </div>
    </div>
    <div class="page-footer">
      <span>Guía Detallada Versión 1 • Ramón Abramo</span>
      <span>Página 3 de 6</span>
    </div>
  </div>

  <!-- PÁGINA 4: HITO 4 -->
  <div class="page">
    <div class="page-header">
      <span>📁 VERSIÓN 1 • HITO 4</span>
      <span class="badge-header">PROCESAMIENTO DE LETRA</span>
    </div>
    <div class="content-area">
      <h2>[HITO 4] La Función <code>procesarLetra()</code></h2>
      <p class="lead">
        Es el corazón algorítmico de la aplicación: valida la entrada del usuario, registra la jugada y bifurca el flujo según si la letra acierta o falla:
      </p>

      <pre><code><span class="kw">function</span> <span class="fn">procesarLetra</span>() &#123;
  <span class="kw">if</span> (juegoTerminado) <span class="kw">return</span>;

  <span class="cm">// 1. Obtener y sanitizar el texto</span>
  <span class="kw">const</span> letra = inputLetra.value.<span class="fn">trim</span>().<span class="fn">toUpperCase</span>();
  inputLetra.value = <span class="str">''</span>;
  inputLetra.<span class="fn">focus</span>();

  <span class="cm">// 2. Validaciones preventivas</span>
  <span class="kw">if</span> (letra === <span class="str">''</span> || !/^[A-ZÑ]$/.<span class="fn">test</span>(letra)) &#123;
    <span class="fn">mostrarMensaje</span>(<span class="str">'Introduce una sola letra válida (A-Z).'</span>, <span class="str">'aviso'</span>);
    <span class="kw">return</span>;
  &#125;

  <span class="kw">if</span> (letrasUsadas.<span class="fn">includes</span>(letra)) &#123;
    <span class="fn">mostrarMensaje</span>(<span class="str">`La letra "$&#123;letra&#125;" ya fue jugada.`</span>, <span class="str">'aviso'</span>);
    <span class="kw">return</span>;
  &#125;

  <span class="cm">// 3. Añadir a historial</span>
  letrasUsadas.<span class="fn">push</span>(letra);

  <span class="cm">// 4. Comprobación en la palabra secreta</span>
  <span class="kw">if</span> (palabraSecreta.<span class="fn">includes</span>(letra)) &#123;
    <span class="cm">// ACIERTO: Recorremos para destapar TODAS las apariciones</span>
    <span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; palabraSecreta.length; i++) &#123;
      <span class="kw">if</span> (palabraSecreta[i] === letra) &#123;
        letrasAdivinadas[i] = letra;
      &#125;
    &#125;
    <span class="fn">mostrarMensaje</span>(<span class="str">`¡Acierto! La letra "$&#123;letra&#125;" está en la palabra.`</span>, <span class="str">'exito'</span>);
  &#125; <span class="kw">else</span> &#123;
    <span class="cm">// FALLO: Incrementamos fallos y dibujamos la pieza SVG</span>
    fallos++;
    <span class="fn">dibujarSiguienteParte</span>(fallos);
    <span class="fn">mostrarMensaje</span>(<span class="str">`¡Fallo! La letra "$&#123;letra&#125;" no existe.`</span>, <span class="str">'error'</span>);
  &#125;

  <span class="cm">// 5. Actualizar display y verificar fin</span>
  <span class="fn">actualizarPantalla</span>();
  <span class="fn">verificarFinJuego</span>();
&#125;</code></pre>

      <div class="box box-warning">
        <div class="box-title">Pregunta frecuente de alumnos: ¿Por qué no usar indexOf?</div>
        <p style="font-size: 7.7pt; margin: 0;">
          Porque <code>indexOf()</code> devuelve únicamente el índice del <em>primer</em> encuentro. Si la palabra es "PROGRAMACION", la letra 'A' aparece en las posiciones 5 y 8; el bucle <code>for</code> asegura descubrir ambas sin dejar letras ocultas.
        </p>
      </div>
    </div>
    <div class="page-footer">
      <span>Guía Detallada Versión 1 • Ramón Abramo</span>
      <span>Página 4 de 6</span>
    </div>
  </div>

  <!-- PÁGINA 5: HITOS 5 Y 6 -->
  <div class="page">
    <div class="page-header">
      <span>📁 VERSIÓN 1 • HITOS 5 Y 6</span>
      <span class="badge-header">DIBUJO Y FIN DE JUEGO</span>
    </div>
    <div class="content-area">
      <h2>[HITO 5] Actualización y Dibujo del Ahorcado</h2>
      <p class="lead">
        Mantenemos la interfaz sincronizada mediante funciones con propósitos específicos y reutilizables:
      </p>

      <pre><code><span class="kw">function</span> <span class="fn">actualizarPantalla</span>() &#123;
  <span class="cm">// Unimos los elementos con espacios para que se vea: "_ _ J _ S"</span>
  palabraDisplay.textContent = letrasAdivinadas.<span class="fn">join</span>(<span class="str">' '</span>);

  <span class="kw">const</span> vidas = MAX_FALLOS - fallos;
  vidasRestantes.textContent = vidas;
  vidasRestantes.classList.<span class="fn">toggle</span>(<span class="str">'peligro'</span>, vidas &lt;= <span class="num">2</span>);

  letrasUsadasDisplay.textContent = letrasUsadas.length ? letrasUsadas.<span class="fn">join</span>(<span class="str">', '</span>) : <span class="str">'Ninguna aún'</span>;
&#125;

<span class="kw">function</span> <span class="fn">dibujarSiguienteParte</span>(numeroFallo) &#123;
  <span class="kw">const</span> indice = numeroFallo - <span class="num">1</span>;
  <span class="kw">if</span> (indice &gt;= <span class="num">0</span> &amp;&amp; indice &lt; partesAhorcado.length) &#123;
    partesAhorcado[indice].classList.<span class="fn">add</span>(<span class="str">'visible'</span>);
  &#125;
&#125;</code></pre>

      <h2>[HITO 6] Verificación de Fin de Partida</h2>
      <pre><code><span class="kw">function</span> <span class="fn">verificarFinJuego</span>() &#123;
  <span class="cm">// Condición 1: VICTORIA (¡ya no quedan guiones bajos!)</span>
  <span class="kw">if</span> (!letrasAdivinadas.<span class="fn">includes</span>(<span class="str">'_'</span>)) &#123;
    juegoTerminado = <span class="kw">true</span>;
    <span class="fn">mostrarMensaje</span>(<span class="str">`🎉 ¡VICTORIA! Has descubierto "$&#123;palabraSecreta&#125;".`</span>, <span class="str">'exito'</span>);
    <span class="fn">finalizarPartida</span>();
    <span class="kw">return</span>;
  &#125;

  <span class="cm">// Condición 2: DERROTA (se han cometido 6 fallos)</span>
  <span class="kw">if</span> (fallos &gt;= MAX_FALLOS) &#123;
    juegoTerminado = <span class="kw">true</span>;
    caraDerrota.classList.<span class="fn">add</span>(<span class="str">'visible'</span>);
    palabraDisplay.textContent = palabraSecreta.<span class="fn">split</span>(<span class="str">''</span>).<span class="fn">join</span>(<span class="str">' '</span>);
    <span class="fn">mostrarMensaje</span>(<span class="str">`💀 ¡GAME OVER! La palabra era "$&#123;palabraSecreta&#125;".`</span>, <span class="str">'error'</span>);
    <span class="fn">finalizarPartida</span>();
  &#125;
&#125;

<span class="kw">function</span> <span class="fn">finalizarPartida</span>() &#123;
  inputLetra.disabled = <span class="kw">true</span>;
  btnProbar.disabled = <span class="kw">true</span>;
  btnReiniciar.<span class="fn">focus</span>();
&#125;</code></pre>
    </div>
    <div class="page-footer">
      <span>Guía Detallada Versión 1 • Ramón Abramo</span>
      <span>Página 5 de 6</span>
    </div>
  </div>

  <!-- PÁGINA 6: SOLUCIÓN LIMPIA Y CONCLUSIÓN -->
  <div class="page">
    <div class="page-header">
      <span>📁 VERSIÓN 1 • SOLUCIÓN CANÓNICA</span>
      <span class="badge-header">REFERENCIA DOCENTE</span>
    </div>
    <div class="content-area">
      <h2>Solución Canónica Completa (app.solucion.js)</h2>
      <pre><code><span class="kw">const</span> PALABRAS = [<span class="str">'JAVASCRIPT'</span>, <span class="str">'PROGRAMACION'</span>, <span class="str">'VARIABLE'</span>, <span class="str">'FUNCION'</span>, <span class="str">'ARRAY'</span>, <span class="str">'OBJETO'</span>];
<span class="kw">const</span> MAX_FALLOS = <span class="num">6</span>;
<span class="kw">let</span> palabraSecreta = <span class="str">''</span>, letrasAdivinadas = [], letrasUsadas = [], fallos = <span class="num">0</span>, juegoTerminado = <span class="kw">false</span>;

<span class="kw">const</span> palabraDisplay = document.<span class="fn">getElementById</span>(<span class="str">'palabra-display'</span>);
<span class="kw">const</span> inputLetra = document.<span class="fn">getElementById</span>(<span class="str">'input-letra'</span>);
<span class="kw">const</span> btnProbar = document.<span class="fn">getElementById</span>(<span class="str">'btn-probar'</span>);
<span class="kw">const</span> letrasUsadasDisplay = document.<span class="fn">getElementById</span>(<span class="str">'letras-usadas-display'</span>);
<span class="kw">const</span> vidasRestantes = document.<span class="fn">getElementById</span>(<span class="str">'vidas-restantes'</span>);
<span class="kw">const</span> mensajeEstado = document.<span class="fn">getElementById</span>(<span class="str">'mensaje-estado'</span>);
<span class="kw">const</span> btnReiniciar = document.<span class="fn">getElementById</span>(<span class="str">'btn-reiniciar'</span>);
<span class="kw">const</span> partesAhorcado = [<span class="str">'cabeza'</span>, <span class="str">'cuerpo'</span>, <span class="str">'brazo-izq'</span>, <span class="str">'brazo-der'</span>, <span class="str">'pierna-izq'</span>, <span class="str">'pierna-der'</span>]
  .<span class="fn">map</span>(id =&gt; document.<span class="fn">getElementById</span>(<span class="str">`parte-$&#123;id&#125;`</span>));
<span class="kw">const</span> caraDerrota = document.<span class="fn">getElementById</span>(<span class="str">'parte-cara-derrota'</span>);

<span class="kw">function</span> <span class="fn">iniciarJuego</span>() &#123;
  palabraSecreta = PALABRAS[Math.<span class="fn">floor</span>(Math.<span class="fn">random</span>() * PALABRAS.length)];
  letrasAdivinadas = <span class="kw">Array</span>(palabraSecreta.length).<span class="fn">fill</span>(<span class="str">'_'</span>);
  letrasUsadas = []; fallos = <span class="num">0</span>; juegoTerminado = <span class="kw">false</span>;
  partesAhorcado.<span class="fn">forEach</span>(p =&gt; p.classList.<span class="fn">remove</span>(<span class="str">'visible'</span>));
  caraDerrota.classList.<span class="fn">remove</span>(<span class="str">'visible'</span>);
  inputLetra.disabled = <span class="kw">false</span>; btnProbar.disabled = <span class="kw">false</span>; inputLetra.value = <span class="str">''</span>; inputLetra.<span class="fn">focus</span>();
  <span class="fn">actualizarPantalla</span>();
&#125;

<span class="kw">function</span> <span class="fn">procesarLetra</span>() &#123;
  <span class="kw">if</span> (juegoTerminado) <span class="kw">return</span>;
  <span class="kw">const</span> l = inputLetra.value.<span class="fn">trim</span>().<span class="fn">toUpperCase</span>();
  inputLetra.value = <span class="str">''</span>; inputLetra.<span class="fn">focus</span>();
  <span class="kw">if</span> (!l || !/^[A-ZÑ]$/.<span class="fn">test</span>(l) || letrasUsadas.<span class="fn">includes</span>(l)) <span class="kw">return</span>;
  letrasUsadas.<span class="fn">push</span>(l);
  <span class="kw">if</span> (palabraSecreta.<span class="fn">includes</span>(l)) &#123;
    <span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; palabraSecreta.length; i++) <span class="kw">if</span> (palabraSecreta[i] === l) letrasAdivinadas[i] = l;
  &#125; <span class="kw">else</span> &#123;
    fallos++;
    <span class="kw">if</span> (partesAhorcado[fallos - <span class="num">1</span>]) partesAhorcado[fallos - <span class="num">1</span>].classList.<span class="fn">add</span>(<span class="str">'visible'</span>);
  &#125;
  <span class="fn">actualizarPantalla</span>();
  <span class="fn">verificarFinJuego</span>();
&#125;

btnProbar.<span class="fn">addEventListener</span>(<span class="str">'click'</span>, procesarLetra);
inputLetra.<span class="fn">addEventListener</span>(<span class="str">'keydown'</span>, e =&gt; &#123; <span class="kw">if</span> (e.key === <span class="str">'Enter'</span>) <span class="fn">procesarLetra</span>(); &#125;);
btnReiniciar.<span class="fn">addEventListener</span>(<span class="str">'click'</span>, iniciarJuego);
<span class="fn">iniciarJuego</span>();</code></pre>

      <p style="text-align: center; margin-top: 6px; font-weight: 700; color: #0284c7; font-size: 8.5pt;">
        ¡Enhorabuena! Has completado el análisis de la Versión 1 Básica Lineal. 🎮🎓
      </p>
    </div>
    <div class="page-footer">
      <span>Guía Detallada Versión 1 • Ramón Abramo</span>
      <span>Página 6 de 6</span>
    </div>
  </div>

</body>
</html>
"""

pdf_out = r"d:\Ramon\www\confeccion2026\practicas\ahorcado\version-1-basica-lineal\Guia_Detallada_Solucion_1_Basica_Lineal.pdf"
render_pdf(html_v1, pdf_out)
