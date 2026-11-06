from pdf_builder_base import CSS_GLOBAL, render_pdf

html_v3 = f"""<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Solución 3: POO, Audio y Persistencia - Ramón Abramo</title>
<style>
{CSS_GLOBAL}
</style>
</head>
<body>

  <!-- PÁGINA 1: PORTADA V3 -->
  <div class="page">
    <div class="page-header">
      <span>📁 VERSIÓN 3 • GUÍA DETALLADA PASO A PASO</span>
      <span class="badge-header">PROFESIONAL & POO</span>
    </div>
    <div class="content-area">
      <div class="cover-card">
        <div class="author-badge">👨‍🏫 RAMÓN ABRAMO • GUÍA TÉCNICA DETALLADA</div>
        <h1>Versión 3: Arquitectura POO & Audio</h1>
        <p style="color: #94a3b8; font-size: 9pt; margin: 0;">
          Diseño de software empresarial con clases ES6, Web Audio API nativo, confeti en Canvas 2D y persistencia con localStorage.
        </p>
      </div>

      <p class="lead">
        La <strong>Versión 3</strong> traslada el ejercicio al nivel de un producto comercial terminado. Aplica el paradigma de Programación Orientada a Objetos (POO) para separar drásticamente la lógica pura del juego (Engine) de la manipulación de la interfaz (UI), el audio sintético y el almacenamiento local persistente.
      </p>

      <h2>Estructura de la Carpeta <code>version-3-avanzada-poo/</code></h2>
      <table class="custom-table">
        <tr>
          <th style="width: 25%;">Archivo</th>
          <th style="width: 50%;">Propósito</th>
          <th style="width: 25%;">Destinatario</th>
        </tr>
        <tr>
          <td><code>index.html</code></td>
          <td>Selector de dificultad, temporizador, barra de salud, modales y canvas.</td>
          <td>Alumno / Docente</td>
        </tr>
        <tr>
          <td><code>main.css</code></td>
          <td>Diseño gaming premium, barra de salud dinámica, animaciones y modales.</td>
          <td>Alumno / Docente</td>
        </tr>
        <tr>
          <td><code>app.js</code></td>
          <td>Código maestro con las 4 clases completas y comentarios formativos.</td>
          <td>Docente</td>
        </tr>
        <tr>
          <td><code>app.alumnos.js</code></td>
          <td>Plantilla con la arquitectura de clases y bloques <code>TODO</code>.</td>
          <td>Alumnado</td>
        </tr>
        <tr>
          <td><code>app.solucion.js</code></td>
          <td>Solución limpia de referencia para el profesor.</td>
          <td>Docente</td>
        </tr>
        <tr>
          <td><code>presentacion.html</code></td>
          <td>Diapositivas interactivas para proyectar en clase.</td>
          <td>Docente en Aula</td>
        </tr>
      </table>

      <h2>Arquitectura Modular de Clases ES6</h2>
      <div class="grid-2">
        <div class="box box-info">
          <div class="box-title">1. AhorcadoEngine</div>
          <p style="font-size: 7.6pt; margin: 0;">
            Motor lógico puro. Maneja el estado, las reglas, las vidas y los 3 niveles de dificultad sin tocar el DOM.
          </p>
        </div>
        <div class="box box-tip">
          <div class="box-title">2. SoundSynthesizer</div>
          <p style="font-size: 7.6pt; margin: 0;">
            Genera ondas sonoras con Web Audio API puro. No depende de archivos mp3 externos ni conexiones de red.
          </p>
        </div>
      </div>
      <div class="grid-2" style="margin-top: 5px;">
        <div class="box box-warning">
          <div class="box-title">3. StatsRepository</div>
          <p style="font-size: 7.6pt; margin: 0;">
            Almacena estadísticas permanentes en <code>localStorage</code>: partidas, victorias, derrotas y rachas récord.
          </p>
        </div>
        <div class="box box-info">
          <div class="box-title">4. AhorcadoUI & Confetti</div>
          <p style="font-size: 7.6pt; margin: 0;">
            Coordina eventos de usuario, modales interactivos y renderiza confeti físico a 60 FPS sobre un <code>&lt;canvas&gt;</code>.
          </p>
        </div>
      </div>
    </div>
    <div class="page-footer">
      <span>Guía Detallada Versión 3 • Ramón Abramo</span>
      <span>Página 1 de 6</span>
    </div>
  </div>

  <!-- PÁGINA 2: WEB AUDIO API -->
  <div class="page">
    <div class="page-header">
      <span>📁 VERSIÓN 3 • MÓDULO DE AUDIO</span>
      <span class="badge-header">WEB AUDIO API SINTÉTICO</span>
    </div>
    <div class="content-area">
      <h2>Módulo de Audio Nativo: <code>SoundSynthesizer</code></h2>
      <p class="lead">
        En videojuegos web para el aula, depender de archivos de audio externos (<code>.mp3</code>) genera problemas de rutas relativas o bloqueos CORS locales. La solución profesional es sintetizar el sonido con la Web Audio API estándar:
      </p>

      <pre><code><span class="kw">class</span> SoundSynthesizer &#123;
  <span class="fn">constructor</span>() &#123;
    this.audioCtx = <span class="kw">null</span>;
    this.muted = localStorage.<span class="fn">getItem</span>(<span class="str">'ahorcado_muted'</span>) === <span class="str">'true'</span>;
  &#125;

  <span class="fn">initContext</span>() &#123;
    <span class="kw">if</span> (!this.audioCtx) &#123;
      <span class="kw">const</span> AudioCtx = window.AudioContext || window.webkitAudioContext;
      <span class="kw">if</span> (AudioCtx) this.audioCtx = <span class="kw">new</span> <span class="fn">AudioCtx</span>();
    &#125;
  &#125;

  <span class="fn">playTone</span>(frecuencia, tipo, duracion, retardo = <span class="num">0</span>) &#123;
    <span class="kw">if</span> (this.muted) <span class="kw">return</span>;
    this.<span class="fn">initContext</span>();
    <span class="kw">if</span> (!this.audioCtx) <span class="kw">return</span>;

    <span class="kw">const</span> osc = this.audioCtx.<span class="fn">createOscillator</span>();
    <span class="kw">const</span> gain = this.audioCtx.<span class="fn">createGain</span>();

    osc.type = tipo; <span class="cm">// 'sine', 'triangle', 'sawtooth'</span>
    osc.frequency.<span class="fn">setValueAtTime</span>(frecuencia, this.audioCtx.currentTime + retardo);

    <span class="cm">// Atenuación suave para evitar chasquidos en los altavoces</span>
    gain.gain.<span class="fn">setValueAtTime</span>(<span class="num">0.12</span>, this.audioCtx.currentTime + retardo);
    gain.gain.<span class="fn">exponentialRampToValueAtTime</span>(<span class="num">0.001</span>, this.audioCtx.currentTime + retardo + duracion);

    osc.<span class="fn">connect</span>(gain);
    gain.<span class="fn">connect</span>(this.audioCtx.destination);
    osc.<span class="fn">start</span>(this.audioCtx.currentTime + retardo);
    osc.<span class="fn">stop</span>(this.audioCtx.currentTime + retardo + duracion);
  &#125;

  <span class="fn">playSuccess</span>() &#123; this.<span class="fn">playTone</span>(<span class="num">587.33</span>, <span class="str">'sine'</span>, <span class="num">0.15</span>); &#125; <span class="cm">// Re5 agudo</span>
  <span class="fn">playError</span>()   &#123; this.<span class="fn">playTone</span>(<span class="num">180.00</span>, <span class="str">'sawtooth'</span>, <span class="num">0.2</span>); &#125; <span class="cm">// Tono grave</span>
  <span class="fn">playVictory</span>() &#123;
    [<span class="num">523</span>, <span class="num">659</span>, <span class="num">783</span>, <span class="num">1046</span>].<span class="fn">forEach</span>((f, i) =&gt; this.<span class="fn">playTone</span>(f, <span class="str">'triangle'</span>, <span class="num">0.2</span>, i * <span class="num">0.08</span>));
  &#125;
&#125;</code></pre>

      <div class="box box-tip">
        <div class="box-title">Autoplay Policy del Navegador</div>
        <p style="font-size: 7.7pt; margin: 0;">
          Los navegadores modernos no permiten emitir sonido hasta que el usuario interactúa (hace clic). Por eso <code>initContext()</code> se ejecuta perezosamente (<em>lazy initialization</em>) en la primera jugada.
        </p>
      </div>
    </div>
    <div class="page-footer">
      <span>Guía Detallada Versión 3 • Ramón Abramo</span>
      <span>Página 2 de 6</span>
    </div>
  </div>

  <!-- PÁGINA 3: PERSISTENCIA LOCALSTORAGE -->
  <div class="page">
    <div class="page-header">
      <span>📁 VERSIÓN 3 • PERSISTENCIA</span>
      <span class="badge-header">LOCALSTORAGE & JSON</span>
    </div>
    <div class="content-area">
      <h2>Módulo de Persistencia: <code>StatsRepository</code></h2>
      <p class="lead">
        Conserva el progreso del jugador entre sesiones (partidas, victorias, rachas y récords) sin necesidad de backend o servidor de base de datos:
      </p>

      <pre><code><span class="kw">class</span> StatsRepository &#123;
  <span class="fn">constructor</span>() &#123;
    this.KEY = <span class="str">'ahorcado_stats_pro_2026'</span>;
    this.stats = this.<span class="fn">load</span>();
  &#125;

  <span class="fn">load</span>() &#123;
    <span class="kw">try</span> &#123;
      <span class="kw">const</span> data = localStorage.<span class="fn">getItem</span>(this.KEY);
      <span class="kw">if</span> (data) <span class="kw">return</span> JSON.<span class="fn">parse</span>(data);
    &#125; <span class="kw">catch</span> (e) &#123;&#125;
    <span class="kw">return</span> &#123; partidas: <span class="num">0</span>, victorias: <span class="num">0</span>, derrotas: <span class="num">0</span>, rachaActual: <span class="num">0</span>, mejorRacha: <span class="num">0</span> &#125;;
  &#125;

  <span class="fn">save</span>() &#123;
    localStorage.<span class="fn">setItem</span>(this.KEY, JSON.<span class="fn">stringify</span>(this.stats));
  &#125;

  <span class="fn">recordGame</span>(victoria) &#123;
    this.stats.partidas++;
    <span class="kw">if</span> (victoria) &#123;
      this.stats.victorias++;
      this.stats.rachaActual++;
      <span class="kw">if</span> (this.stats.rachaActual &gt; this.stats.mejorRacha) &#123;
        this.stats.mejorRacha = this.stats.rachaActual;
      &#125;
    &#125; <span class="kw">else</span> &#123;
      this.stats.derrotas++;
      this.stats.rachaActual = <span class="num">0</span>;
    &#125;
    this.<span class="fn">save</span>();
  &#125;

  <span class="kw">get</span> <span class="fn">winPercentage</span>() &#123;
    <span class="kw">return</span> this.stats.partidas ? Math.<span class="fn">round</span>((this.stats.victorias / this.stats.partidas) * <span class="num">100</span>) : <span class="num">0</span>;
  &#125;
&#125;</code></pre>

      <div class="box box-info">
        <div class="box-title">Getters Computados en Clases ES6</div>
        <p style="font-size: 7.7pt; margin: 0;">
          El método <code>get winPercentage()</code> permite acceder al porcentaje como si fuera una propiedad regular (<code>repo.winPercentage</code>), calculándose dinámicamente cada vez que se consulta.
        </p>
      </div>
    </div>
    <div class="page-footer">
      <span>Guía Detallada Versión 3 • Ramón Abramo</span>
      <span>Página 3 de 6</span>
    </div>
  </div>

  <!-- PÁGINA 4: EL MOTOR LÓGICO DESACOPLADO -->
  <div class="page">
    <div class="page-header">
      <span>📁 VERSIÓN 3 • MOTOR LÓGICO</span>
      <span class="badge-header">AHORCADO ENGINE & DIFICULTADES</span>
    </div>
    <div class="content-area">
      <h2>El Motor Lógico: <code>AhorcadoEngine</code></h2>
      <p class="lead">
        El motor no contiene una sola referencia al DOM (ni <code>document</code>, ni <code>window</code>). Es código puro y testeable que gestiona las reglas y los niveles de dificultad:
      </p>

      <pre><code><span class="kw">class</span> AhorcadoEngine &#123;
  <span class="fn">constructor</span>() &#123;
    this.dificultad = <span class="str">'medio'</span>;
    this.configs = &#123;
      facil:   &#123; maxFallos: <span class="num">8</span>, tiempoMax: <span class="kw">null</span>, iniciales: <span class="num">2</span> &#125;,
      medio:   &#123; maxFallos: <span class="num">6</span>, tiempoMax: <span class="kw">null</span>, iniciales: <span class="num">0</span> &#125;,
      dificil: &#123; maxFallos: <span class="num">5</span>, tiempoMax: <span class="num">45</span>,   iniciales: <span class="num">0</span> &#125;
    &#125;;
  &#125;

  <span class="fn">nuevaPartida</span>() &#123;
    this.item = BANCO_DATOS[Math.<span class="fn">floor</span>(Math.<span class="fn">random</span>() * BANCO_DATOS.length)];
    this.adivinadas = <span class="kw">Array</span>(this.item.palabra.length).<span class="fn">fill</span>(<span class="str">''</span>);
    this.usadas = <span class="kw">new</span> <span class="fn">Set</span>();
    this.fallos = <span class="num">0</span>;
    this.terminado = <span class="kw">false</span>;

    <span class="kw">const</span> conf = this.<span class="fn">getConfig</span>();
    <span class="kw">if</span> (conf.iniciales &gt; <span class="num">0</span>) &#123;
      <span class="cm">// Revelar 2 letras iniciales en modo fácil</span>
      <span class="kw">const</span> unicas = [...new <span class="fn">Set</span>(this.item.palabra.<span class="fn">split</span>(<span class="str">''</span>))];
      <span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; conf.iniciales &amp;&amp; i &lt; unicas.length; i++) &#123;
        <span class="kw">const</span> l = unicas[i];
        this.usadas.<span class="fn">add</span>(l);
        <span class="kw">for</span> (<span class="kw">let</span> j = <span class="num">0</span>; j &lt; this.item.palabra.length; j++)
          <span class="kw">if</span> (this.item.palabra[j] === l) this.adivinadas[j] = l;
      &#125;
    &#125;
    <span class="kw">return</span> &#123; ...this.item, maxFallos: conf.maxFallos, tiempoMax: conf.tiempoMax &#125;;
  &#125;

  <span class="fn">probarLetra</span>(letra) &#123;
    <span class="kw">if</span> (this.terminado || this.usadas.<span class="fn">has</span>(letra)) <span class="kw">return</span> <span class="kw">null</span>;
    this.usadas.<span class="fn">add</span>(letra);

    <span class="kw">const</span> acierto = this.item.palabra.<span class="fn">includes</span>(letra);
    <span class="kw">if</span> (acierto) &#123;
      <span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; this.item.palabra.length; i++)
        <span class="kw">if</span> (this.item.palabra[i] === letra) this.adivinadas[i] = letra;
    &#125; <span class="kw">else</span> &#123;
      this.fallos++;
    &#125;

    <span class="kw">const</span> victoria = !this.adivinadas.<span class="fn">includes</span>(<span class="str">''</span>);
    <span class="kw">const</span> derrota = this.fallos &gt;= this.<span class="fn">getConfig</span>().maxFallos;
    <span class="kw">if</span> (victoria || derrota) this.terminado = <span class="kw">true</span>;

    <span class="kw">return</span> &#123; letra, acierto, fallos: this.fallos, victoria, derrota, palabra: this.item.palabra &#125;;
  &#125;
&#125;</code></pre>
    </div>
    <div class="page-footer">
      <span>Guía Detallada Versión 3 • Ramón Abramo</span>
      <span>Página 4 de 6</span>
    </div>
  </div>

  <!-- PÁGINA 5: CONTROLADOR DE VISTA Y CONFETI -->
  <div class="page">
    <div class="page-header">
      <span>📁 VERSIÓN 3 • CONTROLADOR UI</span>
      <span class="badge-header">UI & CONFETI CANVAS</span>
    </div>
    <div class="content-area">
      <h2>El Controlador: <code>AhorcadoUI</code> y Confeti Canvas</h2>
      <p class="lead">
        <code>AhorcadoUI</code> actúa como orquestador central: recibe los clics y pulsaciones, consulta a <code>AhorcadoEngine</code>, activa sonidos con <code>SoundSynthesizer</code> y lanza el confeti:
      </p>

      <pre><code><span class="kw">class</span> AhorcadoUI &#123;
  <span class="fn">jugar</span>(letra) &#123;
    <span class="kw">const</span> res = this.engine.<span class="fn">probarLetra</span>(letra);
    <span class="kw">if</span> (!res) <span class="kw">return</span>;

    <span class="kw">const</span> btn = this.dom.teclado.<span class="fn">querySelector</span>(<span class="str">`[data-letra="$&#123;letra&#125;"]`</span>);
    <span class="kw">if</span> (btn) &#123; btn.disabled = <span class="kw">true</span>; btn.classList.<span class="fn">add</span>(res.acierto ? <span class="str">'acierto'</span> : <span class="str">'fallo'</span>); &#125;

    <span class="kw">if</span> (res.acierto) &#123;
      this.audio.<span class="fn">playSuccess</span>();
      this.<span class="fn">renderPalabra</span>();
    &#125; <span class="kw">else</span> &#123;
      this.audio.<span class="fn">playError</span>();
      <span class="kw">if</span> (this.dom.partesSvg[res.fallos - <span class="num">1</span>]) &#123;
        this.dom.partesSvg[res.fallos - <span class="num">1</span>].classList.<span class="fn">add</span>(<span class="str">'visible'</span>);
      &#125;
      this.<span class="fn">actualizarSalud</span>();
    &#125;

    <span class="kw">if</span> (res.victoria || res.derrota) this.<span class="fn">finPartida</span>(res);
  &#125;

  <span class="fn">finPartida</span>(res) &#123;
    <span class="fn">clearInterval</span>(this.timer);
    this.stats.<span class="fn">recordGame</span>(res.victoria);

    <span class="kw">if</span> (res.victoria) &#123;
      this.audio.<span class="fn">playVictory</span>();
      this.confetti.<span class="fn">start</span>(); <span class="cm">// Partículas físicas en &lt;canvas&gt;</span>
      this.dom.modalTitulo.textContent = <span class="str">'¡Victoria Brillante!'</span>;
    &#125; <span class="kw">else</span> &#123;
      this.audio.<span class="fn">playDefeat</span>();
      this.dom.caraDerrota.classList.<span class="fn">add</span>(<span class="str">'visible'</span>);
      this.dom.modalTitulo.textContent = <span class="str">'Fin de la Partida'</span>;
    &#125;
    this.dom.modalFin.classList.<span class="fn">remove</span>(<span class="str">'oculta'</span>);
  &#125;
&#125;</code></pre>

      <div class="box box-tip">
        <div class="box-title">Física de Partículas en Canvas</div>
        <p style="font-size: 7.7pt; margin: 0;">
          La clase <code>ConfettiAnimation</code> genera 120 partículas con gravedad (<code>p.y += p.speedY</code>), oscilación horizontal (<code>p.x += Math.sin(...)</code>) y rotación a 60 FPS con <code>requestAnimationFrame()</code>.
        </p>
      </div>
    </div>
    <div class="page-footer">
      <span>Guía Detallada Versión 3 • Ramón Abramo</span>
      <span>Página 5 de 6</span>
    </div>
  </div>

  <!-- PÁGINA 6: SOLUCIÓN LIMPIA Y CONCLUSIÓN V3 -->
  <div class="page">
    <div class="page-header">
      <span>📁 VERSIÓN 3 • SOLUCIÓN CANÓNICA</span>
      <span class="badge-header">REFERENCIA DOCENTE</span>
    </div>
    <div class="content-area">
      <h2>Resumen Didáctico de la Versión 3</h2>
      <p class="lead">
        Esta solución demuestra a los alumnos cómo escalar un desarrollo web sin crear "código espagueti". Cada clase tiene un único propósito bien delimitado.
      </p>

      <div class="grid-2">
        <div class="box box-info">
          <div class="box-title">Patrón Modelo-Vista (MVC básico)</div>
          <p style="font-size: 7.7pt; margin: 0;">
            - <strong>Modelo:</strong> <code>AhorcadoEngine</code> y <code>StatsRepository</code>.<br>
            - <strong>Vista:</strong> El DOM, SVG y el lienzo <code>&lt;canvas&gt;</code>.<br>
            - <strong>Controlador:</strong> <code>AhorcadoUI</code> que escucha los eventos y coordina las llamadas.
          </p>
        </div>
        <div class="box box-tip">
          <div class="box-title">Por qué es un proyecto de Portafolio</div>
          <p style="font-size: 7.7pt; margin: 0;">
            Cualquier reclutador o empresa que evalúe este código verá: dominio de POO, arquitectura de eventos, APIs modernas de navegador (Audio, Canvas, Storage) y experiencia de usuario profesional.
          </p>
        </div>
      </div>

      <h2>Rúbrica de Corrección para la Versión 3</h2>
      <table class="custom-table">
        <tr>
          <th>Aspecto</th>
          <th>Excelente (10)</th>
          <th>Mejorable (&lt; 7)</th>
        </tr>
        <tr>
          <td><strong>Desacoplamiento</strong></td>
          <td>Engine no tiene llamadas al DOM.</td>
          <td>Engine manipula elementos HTML directamente.</td>
        </tr>
        <tr>
          <td><strong>Web Audio API</strong></td>
          <td>Sonidos limpios con rampas de ganancia.</td>
          <td>Uso de archivos externos que fallan en local.</td>
        </tr>
        <tr>
          <td><strong>LocalStorage</strong></td>
          <td>Serialización limpia con bloque <code>try/catch</code>.</td>
          <td>Errores si el navegador tiene cookies bloqueadas.</td>
        </tr>
      </table>

      <p style="text-align: center; margin-top: 8px; font-weight: 700; color: #059669; font-size: 8.5pt;">
        ¡Enhorabuena! Has completado el análisis de la Versión 3 Avanzada POO. 🚀🎓
      </p>
    </div>
    <div class="page-footer">
      <span>Guía Detallada Versión 3 • Ramón Abramo</span>
      <span>Página 6 de 6</span>
    </div>
  </div>

</body>
</html>
"""

pdf_out = r"d:\Ramon\www\confeccion2026\practicas\ahorcado\version-3-avanzada-poo\Guia_Detallada_Solucion_3_Avanzada_POO.pdf"
render_pdf(html_v3, pdf_out)
