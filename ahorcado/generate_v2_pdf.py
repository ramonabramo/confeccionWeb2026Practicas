from pdf_builder_base import CSS_GLOBAL, render_pdf

html_v2 = f"""<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Solución 2: Teclado Virtual y Categorías - Ramón Abramo</title>
<style>
{CSS_GLOBAL}
</style>
</head>
<body>

  <!-- PÁGINA 1: PORTADA V2 -->
  <div class="page">
    <div class="page-header">
      <span>📁 VERSIÓN 2 • GUÍA DETALLADA PASO A PASO</span>
      <span class="badge-header">INTERMEDIO & EVENTOS</span>
    </div>
    <div class="content-area">
      <div class="cover-card">
        <div class="author-badge">👨‍🏫 RAMÓN ABRAMO • GUÍA TÉCNICA DETALLADA</div>
        <h1>Versión 2: Teclado Virtual y Categorías</h1>
        <p style="color: #94a3b8; font-size: 9pt; margin: 0;">
          Evolución hacia una experiencia de usuario rica e interactiva con delegación de eventos, objetos semánticos y sincronización de teclado físico.
        </p>
      </div>

      <p class="lead">
        La <strong>Versión 2</strong> representa el salto de calidad más significativo en la usabilidad del juego. Sustituye el formulario estático por un teclado virtual generado dinámicamente con JavaScript, incorpora pistas temáticas por categorías y escucha en tiempo real las pulsaciones del teclado físico del usuario mediante eventos de ventana.
      </p>

      <h2>Estructura de la Carpeta <code>version-2-teclado-eventos/</code></h2>
      <table class="custom-table">
        <tr>
          <th style="width: 25%;">Archivo</th>
          <th style="width: 50%;">Propósito</th>
          <th style="width: 25%;">Destinatario</th>
        </tr>
        <tr>
          <td><code>index.html</code></td>
          <td>Interfaz con panel de categoría, botón de pista, casillas y contenedor del teclado.</td>
          <td>Alumno / Docente</td>
        </tr>
        <tr>
          <td><code>main.css</code></td>
          <td>Estilos para teclado virtual, teclas con retroalimentación (verde/rojo) y corazones.</td>
          <td>Alumno / Docente</td>
        </tr>
        <tr>
          <td><code>app.js</code></td>
          <td>Código maestro comentado detallando delegación de eventos y generación DOM.</td>
          <td>Docente</td>
        </tr>
        <tr>
          <td><code>app.alumnos.js</code></td>
          <td>Plantilla con bloques <code>TODO</code> guiados para la práctica de aula.</td>
          <td>Alumnado</td>
        </tr>
        <tr>
          <td><code>app.solucion.js</code></td>
          <td>Solución limpia de referencia para evaluación rápida del profesor.</td>
          <td>Docente</td>
        </tr>
        <tr>
          <td><code>presentacion.html</code></td>
          <td>Diapositivas interactivas en pantalla completa para proyectar en clase.</td>
          <td>Docente en Aula</td>
        </tr>
      </table>

      <h2>Conceptos Avanzados de JavaScript Aplicados</h2>
      <div class="grid-3">
        <div class="box box-info">
          <div class="box-title">Event Delegation</div>
          <p style="font-size: 7.6pt; margin: 0;">
            Un único escuchador en el contenedor <code>#teclado-virtual</code> gestiona los 27 botones mediante <code>e.target.closest('.tecla')</code>.
          </p>
        </div>
        <div class="box box-tip">
          <div class="box-title">Estructura Set</div>
          <p style="font-size: 7.6pt; margin: 0;">
            Utilización de <code>new Set()</code> para garantizar comprobaciones de letras usadas en tiempo constante <code>O(1)</code>.
          </p>
        </div>
        <div class="box box-warning">
          <div class="box-title">Sincronización Dual</div>
          <p style="font-size: 7.6pt; margin: 0;">
            El usuario puede jugar indistintamente haciendo clic en pantalla o presionando cualquier tecla de su ordenador.
          </p>
        </div>
      </div>
    </div>
    <div class="page-footer">
      <span>Guía Detallada Versión 2 • Ramón Abramo</span>
      <span>Página 1 de 6</span>
    </div>
  </div>

  <!-- PÁGINA 2: BANCO DE DATOS CON OBJETOS Y SET -->
  <div class="page">
    <div class="page-header">
      <span>📁 VERSIÓN 2 • HITOS 1 Y 2</span>
      <span class="badge-header">DATOS ENRIQUECIDOS</span>
    </div>
    <div class="content-area">
      <h2>[HITO 1] Banco de Datos con Objetos Semánticos</h2>
      <p class="lead">
        En lugar de cadenas de texto aisladas, cada elemento del juego es ahora un objeto con información contextual rica:
      </p>

      <pre><code><span class="kw">const</span> BANCO_PALABRAS = [
  &#123;
    palabra: <span class="str">'JAVASCRIPT'</span>,
    categoria: <span class="str">'Programación Web'</span>,
    pista: <span class="str">'Lenguaje interpretado interactivo que corre en el navegador.'</span>
  &#125;,
  &#123;
    palabra: <span class="str">'CSS'</span>,
    categoria: <span class="str">'Diseño Web'</span>,
    pista: <span class="str">'Hojas de estilo en cascada para colores, maquetación y fuentes.'</span>
  &#125;,
  &#123;
    palabra: <span class="str">'RESPONSIVE'</span>,
    categoria: <span class="str">'Diseño Web'</span>,
    pista: <span class="str">'Técnica para adaptar interfaces a móviles, tablets y monitores.'</span>
  &#125;
];

<span class="kw">const</span> LETRAS_ALFABETO = <span class="str">'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'</span>.<span class="fn">split</span>(<span class="str">''</span>);
<span class="kw">const</span> MAX_FALLOS = <span class="num">6</span>;</code></pre>

      <h2>[HITO 2] La Colección Set para Letras Jugadas</h2>
      <p>
        En la Versión 1 usábamos un array tradicional y <code>includes()</code>. En la Versión 2 enseñamos la colección nativa <code>Set</code> de ES6:
      </p>

      <pre><code><span class="cm">// Declaración del conjunto reactivo</span>
<span class="kw">let</span> letrasUsadas = <span class="kw">new</span> <span class="fn">Set</span>();

<span class="cm">// Comprobación eficiente:</span>
<span class="kw">if</span> (letrasUsadas.<span class="fn">has</span>(letra)) <span class="kw">return</span>;

<span class="cm">// Inserción sin duplicados:</span>
letrasUsadas.<span class="fn">add</span>(letra);

<span class="cm">// Limpieza al reiniciar partida:</span>
letrasUsadas.<span class="fn">clear</span>();</code></pre>

      <div class="box box-tip">
        <div class="box-title">Valor Didáctico del Set frente al Array</div>
        <p style="font-size: 7.7pt; margin: 0;">
          Permite explicar la diferencia entre una colección secuencial indexada (Array) y un conjunto matemático de valores únicos (Set), introduciendo conceptos de eficiencia y legibilidad en el código.
        </p>
      </div>
    </div>
    <div class="page-footer">
      <span>Guía Detallada Versión 2 • Ramón Abramo</span>
      <span>Página 2 de 6</span>
    </div>
  </div>

  <!-- PÁGINA 3: GENERACIÓN DINÁMICA DEL DOM -->
  <div class="page">
    <div class="page-header">
      <span>📁 VERSIÓN 2 • HITO 3</span>
      <span class="badge-header">MANIPULACIÓN DINÁMICA DEL DOM</span>
    </div>
    <div class="content-area">
      <h2>[HITO 3] Inyección Dinámica del Teclado Virtual</h2>
      <p class="lead">
        En lugar de escribir manualmente 27 etiquetas <code>&lt;button&gt;</code> en el archivo HTML, las generamos mediante programación JavaScript:
      </p>

      <pre><code><span class="kw">function</span> <span class="fn">renderizarTecladoVirtual</span>() &#123;
  tecladoVirtual.innerHTML = <span class="str">''</span>;

  LETRAS_ALFABETO.<span class="fn">forEach</span>(letra =&gt; &#123;
    <span class="kw">const</span> btn = document.<span class="fn">createElement</span>(<span class="str">'button'</span>);
    btn.type = <span class="str">'button'</span>;
    btn.className = <span class="str">'tecla'</span>;
    btn.textContent = letra;
    btn.dataset.letra = letra; <span class="cm">// data-letra="A"</span>
    btn.<span class="fn">setAttribute</span>(<span class="str">'aria-label'</span>, <span class="str">`Letra $&#123;letra&#125;`</span>);
    tecladoVirtual.<span class="fn">appendChild</span>(btn);
  &#125;);
&#125;</code></pre>

      <h2>Renderizado de Casillas de Letras Individuales</h2>
      <p>
        Para elevar la estética visual, cada letra oculta se renderiza como una casilla independiente con bordes y animaciones CSS:
      </p>

      <pre><code><span class="kw">function</span> <span class="fn">actualizarPalabraVisual</span>() &#123;
  palabraDisplay.innerHTML = <span class="str">''</span>;

  <span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; partidaActual.palabra.length; i++) &#123;
    <span class="kw">const</span> casilla = document.<span class="fn">createElement</span>(<span class="str">'span'</span>);
    casilla.className = <span class="str">'casilla-letra'</span>;

    <span class="kw">const</span> letraDescubierta = letrasAdivinadas[i];
    <span class="kw">if</span> (letraDescubierta) &#123;
      casilla.textContent = letraDescubierta;
      casilla.classList.<span class="fn">add</span>(<span class="str">'revelada'</span>); <span class="cm">// Activa animación CSS</span>
    &#125;

    palabraDisplay.<span class="fn">appendChild</span>(casilla);
  &#125;
&#125;</code></pre>

      <div class="box box-info">
        <div class="box-title">Los atributos dataset en el DOM</div>
        <p style="font-size: 7.7pt; margin: 0;">
          El uso de <code>btn.dataset.letra = letra</code> inyecta en el HTML el atributo <code>data-letra="..."</code>. Esto desacopla el texto visible del botón del dato que procesa la lógica en JavaScript.
        </p>
      </div>
    </div>
    <div class="page-footer">
      <span>Guía Detallada Versión 2 • Ramón Abramo</span>
      <span>Página 3 de 6</span>
    </div>
  </div>

  <!-- PÁGINA 4: DELEGACIÓN DE EVENTOS Y KEYDOWN -->
  <div class="page">
    <div class="page-header">
      <span>📁 VERSIÓN 2 • HITO 4</span>
      <span class="badge-header">DELEGACIÓN DE EVENTOS</span>
    </div>
    <div class="content-area">
      <h2>[HITO 4] Delegación de Eventos (Event Bubbling)</h2>
      <p class="lead">
        En vez de asociar 27 escuchadores de eventos con <code>forEach</code>, vinculamos **un único escuchador** en el contenedor padre:
      </p>

      <pre><code><span class="cm">// Delegación de eventos óptima</span>
tecladoVirtual.<span class="fn">addEventListener</span>(<span class="str">'click'</span>, evento =&gt; &#123;
  <span class="cm">// Busca el botón con clase .tecla más cercano al clic</span>
  <span class="kw">const</span> boton = evento.target.<span class="fn">closest</span>(<span class="str">'.tecla'</span>);

  <span class="cm">// Si se hizo clic fuera o la tecla ya está desactivada, ignoramos</span>
  <span class="kw">if</span> (!boton || boton.disabled) <span class="kw">return</span>;

  <span class="cm">// Obtenemos la letra del atributo dataset</span>
  <span class="kw">const</span> letra = boton.dataset.letra;
  <span class="fn">jugarLetra</span>(letra);
&#125;);</code></pre>

      <h2>Soporte Universal de Teclado Físico (keydown)</h2>
      <p>
        El usuario puede escribir con el teclado físico de su ordenador y el juego responde exactamente igual que si pulsara en pantalla:
      </p>

      <pre><code>window.<span class="fn">addEventListener</span>(<span class="str">'keydown'</span>, evento =&gt; &#123;
  <span class="kw">if</span> (juegoTerminado) <span class="kw">return</span>;

  <span class="cm">// Ignoramos combinaciones de sistema (Ctrl+C, Alt+Tab, etc.)</span>
  <span class="kw">if</span> (evento.ctrlKey || evento.altKey || evento.metaKey) <span class="kw">return</span>;

  <span class="kw">const</span> letraPulsada = evento.key.<span class="fn">toUpperCase</span>();

  <span class="cm">// Si la tecla pulsada pertenece al alfabeto válido, la jugamos</span>
  <span class="kw">if</span> (LETRAS_ALFABETO.<span class="fn">includes</span>(letraPulsada)) &#123;
    <span class="fn">jugarLetra</span>(letraPulsada);
  &#125;
&#125;);</code></pre>

      <div class="grid-2">
        <div class="box box-tip">
          <div class="box-title">Ventaja de closest()</div>
          <p style="font-size: 7.6pt; margin: 0;">
            Garantiza que el evento se capture correctamente aunque el botón contenga iconos internos o etiquetas anidadas como <code>&lt;span&gt;</code>.
          </p>
        </div>
        <div class="box box-warning">
          <div class="box-title">Eficiencia en Memoria</div>
          <p style="font-size: 7.6pt; margin: 0;">
            1 solo listener en memoria consume una fracción de los recursos que consumirían 27 listeners individuales.
          </p>
        </div>
      </div>
    </div>
    <div class="page-footer">
      <span>Guía Detallada Versión 2 • Ramón Abramo</span>
      <span>Página 4 de 6</span>
    </div>
  </div>

  <!-- PÁGINA 5: LA FUNCIÓN UNIFICADA JUGARLETRA -->
  <div class="page">
    <div class="page-header">
      <span>📁 VERSIÓN 2 • HITOS 5 Y 6</span>
      <span class="badge-header">LÓGICA UNIFICADA Y UX</span>
    </div>
    <div class="content-area">
      <h2>[HITO 5] Función Unificada <code>jugarLetra(letra)</code></h2>
      <p class="lead">
        Centraliza la ejecución tanto para clics virtuales como para pulsaciones de teclado físico:
      </p>

      <pre><code><span class="kw">function</span> <span class="fn">jugarLetra</span>(letra) &#123;
  <span class="kw">if</span> (juegoTerminado || letrasUsadas.<span class="fn">has</span>(letra)) <span class="kw">return</span>;
  letrasUsadas.<span class="fn">add</span>(letra);

  <span class="cm">// Localizamos la tecla en pantalla y la desactivamos</span>
  <span class="kw">const</span> boton = tecladoVirtual.<span class="fn">querySelector</span>(<span class="str">`[data-letra="$&#123;letra&#125;"]`</span>);
  <span class="kw">if</span> (boton) boton.disabled = <span class="kw">true</span>;

  <span class="kw">if</span> (partidaActual.palabra.<span class="fn">includes</span>(letra)) &#123;
    <span class="kw">if</span> (boton) boton.classList.<span class="fn">add</span>(<span class="str">'acierto'</span>); <span class="cm">// Estilo verde</span>
    <span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; partidaActual.palabra.length; i++) &#123;
      <span class="kw">if</span> (partidaActual.palabra[i] === letra) letrasAdivinadas[i] = letra;
    &#125;
  &#125; <span class="kw">else</span> &#123;
    <span class="kw">if</span> (boton) boton.classList.<span class="fn">add</span>(<span class="str">'fallo'</span>); <span class="cm">// Estilo rojo tachado</span>
    fallos++;
    <span class="kw">if</span> (partesAhorcado[fallos - <span class="num">1</span>]) &#123;
      partesAhorcado[fallos - <span class="num">1</span>].classList.<span class="fn">add</span>(<span class="str">'visible'</span>);
    &#125;
  &#125;

  <span class="fn">actualizarPalabraVisual</span>();
  <span class="fn">actualizarMarcadorVidas</span>();
  <span class="fn">verificarFinJuego</span>();
&#125;</code></pre>

      <h2>[HITO 6] Pistas y Marcador con Corazones</h2>
      <div class="grid-2">
        <div class="box box-info">
          <div class="box-title">Sistema de Pistas</div>
          <p style="font-size: 7.6pt; margin: 0;">
            Al pulsar "💡 Pedir Pista", se muestra el texto descriptivo del objeto y el botón se desactiva para evitar abusos.
          </p>
        </div>
        <div class="box box-tip">
          <div class="box-title">Feedback con Corazones</div>
          <p style="font-size: 7.6pt; margin: 0;">
            Se recorren los 6 corazones: los que superen las vidas restantes adquieren la clase <code>.perdido</code> pasando a escala de grises.
          </p>
        </div>
      </div>
    </div>
    <div class="page-footer">
      <span>Guía Detallada Versión 2 • Ramón Abramo</span>
      <span>Página 5 de 6</span>
    </div>
  </div>

  <!-- PÁGINA 6: SOLUCIÓN LIMPIA Y CONCLUSIÓN V2 -->
  <div class="page">
    <div class="page-header">
      <span>📁 VERSIÓN 2 • SOLUCIÓN CANÓNICA</span>
      <span class="badge-header">REFERENCIA DOCENTE</span>
    </div>
    <div class="content-area">
      <h2>Solución Canónica Completa (app.solucion.js)</h2>
      <pre><code><span class="kw">const</span> BANCO_PALABRAS = [
  &#123; palabra: <span class="str">'JAVASCRIPT'</span>, categoria: <span class="str">'Web'</span>, pista: <span class="str">'Lenguaje interactivo.'</span> &#125;,
  &#123; palabra: <span class="str">'RESPONSIVE'</span>, categoria: <span class="str">'Diseño'</span>, pista: <span class="str">'Adaptabilidad a pantallas.'</span> &#125;
];
<span class="kw">const</span> LETRAS_ALFABETO = <span class="str">'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'</span>.<span class="fn">split</span>(<span class="str">''</span>);
<span class="kw">const</span> MAX_FALLOS = <span class="num">6</span>;
<span class="kw">let</span> partidaActual = <span class="kw">null</span>, letrasAdivinadas = [], letrasUsadas = <span class="kw">new</span> <span class="fn">Set</span>(), fallos = <span class="num">0</span>, juegoTerminado = <span class="kw">false</span>;

<span class="kw">function</span> <span class="fn">renderizarTecladoVirtual</span>() &#123;
  tecladoVirtual.innerHTML = <span class="str">''</span>;
  LETRAS_ALFABETO.<span class="fn">forEach</span>(letra =&gt; &#123;
    <span class="kw">const</span> btn = document.<span class="fn">createElement</span>(<span class="str">'button'</span>);
    btn.className = <span class="str">'tecla'</span>; btn.textContent = letra; btn.dataset.letra = letra;
    tecladoVirtual.<span class="fn">appendChild</span>(btn);
  &#125;);
&#125;

<span class="kw">function</span> <span class="fn">jugarLetra</span>(letra) &#123;
  <span class="kw">if</span> (juegoTerminado || !LETRAS_ALFABETO.<span class="fn">includes</span>(letra) || letrasUsadas.<span class="fn">has</span>(letra)) <span class="kw">return</span>;
  letrasUsadas.<span class="fn">add</span>(letra);
  <span class="kw">const</span> boton = tecladoVirtual.<span class="fn">querySelector</span>(<span class="str">`[data-letra="$&#123;letra&#125;"]`</span>);
  <span class="kw">if</span> (boton) boton.disabled = <span class="kw">true</span>;
  <span class="kw">if</span> (partidaActual.palabra.<span class="fn">includes</span>(letra)) &#123;
    <span class="kw">if</span> (boton) boton.classList.<span class="fn">add</span>(<span class="str">'acierto'</span>);
    <span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; partidaActual.palabra.length; i++)
      <span class="kw">if</span> (partidaActual.palabra[i] === letra) letrasAdivinadas[i] = letra;
  &#125; <span class="kw">else</span> &#123;
    <span class="kw">if</span> (boton) boton.classList.<span class="fn">add</span>(<span class="str">'fallo'</span>);
    fallos++;
    <span class="kw">if</span> (partesAhorcado[fallos - <span class="num">1</span>]) partesAhorcado[fallos - <span class="num">1</span>].classList.<span class="fn">add</span>(<span class="str">'visible'</span>);
  &#125;
  <span class="fn">actualizarPalabraVisual</span>(); <span class="fn">actualizarMarcadorVidas</span>(); <span class="fn">verificarFinJuego</span>();
&#125;

tecladoVirtual.<span class="fn">addEventListener</span>(<span class="str">'click'</span>, e =&gt; &#123;
  <span class="kw">const</span> btn = e.target.<span class="fn">closest</span>(<span class="str">'.tecla'</span>);
  <span class="kw">if</span> (btn &amp;&amp; !btn.disabled) <span class="fn">jugarLetra</span>(btn.dataset.letra);
&#125;);

window.<span class="fn">addEventListener</span>(<span class="str">'keydown'</span>, e =&gt; &#123;
  <span class="kw">if</span> (e.ctrlKey || e.altKey) <span class="kw">return</span>;
  <span class="kw">const</span> l = e.key.<span class="fn">toUpperCase</span>();
  <span class="kw">if</span> (LETRAS_ALFABETO.<span class="fn">includes</span>(l)) <span class="fn">jugarLetra</span>(l);
&#125;);</code></pre>

      <p style="text-align: center; margin-top: 6px; font-weight: 700; color: #7c3aed; font-size: 8.5pt;">
        ¡Enhorabuena! Has completado el análisis de la Versión 2 con Teclado Virtual. ⌨️💜
      </p>
    </div>
    <div class="page-footer">
      <span>Guía Detallada Versión 2 • Ramón Abramo</span>
      <span>Página 6 de 6</span>
    </div>
  </div>

</body>
</html>
"""

pdf_out = r"d:\Ramon\www\confeccion2026\practicas\ahorcado\version-2-teclado-eventos\Guia_Detallada_Solucion_2_Teclado_Eventos.pdf"
render_pdf(html_v2, pdf_out)
