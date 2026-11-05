import os
import subprocess
import fitz

EDGE_EXE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

html_sol0 = """<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Solución 0: Solución de Clase - Ramón Abramo</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Inter:wght@400;500;600;700;800&display=swap');
  @page { size: A4 portrait; margin: 0; }
  * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { margin: 0; padding: 0; font-family: 'Inter', sans-serif; color: #0f172a; background: #fff; font-size: 8.7pt; line-height: 1.42; }
  .page { width: 210mm; height: 297mm; position: relative; padding: 12mm 15mm 10mm 15mm; page-break-after: always; background: #fff; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; }
  .page-header { display: flex; justify-content: space-between; align-items: center; font-size: 7.5pt; font-weight: 700; color: #475569; padding-bottom: 5px; border-bottom: 1.5px solid #cbd5e1; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px; }
  .page-header span.badge-header { background: #e0f2fe; color: #0369a1; padding: 2px 7px; border-radius: 4px; font-size: 7pt; font-weight: 800; }
  .page-footer { display: flex; justify-content: space-between; align-items: center; font-size: 7.5pt; color: #64748b; padding-top: 5px; border-top: 1.5px solid #cbd5e1; margin-top: 6px; }
  .content-area { flex: 1; display: flex; flex-direction: column; }
  h1 { font-size: 19pt; color: #0f172a; margin: 0 0 6px 0; font-weight: 800; letter-spacing: -0.5px; line-height: 1.2; }
  h2 { font-size: 12.5pt; color: #0369a1; margin: 8px 0 6px 0; font-weight: 700; border-bottom: 1px solid #e2e8f0; padding-bottom: 3px; display: flex; align-items: center; gap: 6px; }
  h3 { font-size: 9.8pt; color: #0f172a; margin: 6px 0 3px 0; font-weight: 700; }
  p { margin: 0 0 6px 0; text-align: justify; }
  .lead { font-size: 9.2pt; color: #334155; font-weight: 500; line-height: 1.45; background: #f8fafc; border-left: 3.5px solid #0284c7; padding: 7px 10px; border-radius: 0 6px 6px 0; margin-bottom: 8px; }
  .box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 7px; padding: 8px 11px; margin-bottom: 8px; }
  .box-tip { background: #f0fdf4; border: 1px solid #bbf7d0; border-left: 3.5px solid #16a34a; }
  .box-warning { background: #fffbeb; border: 1px solid #fef3c7; border-left: 3.5px solid #d97706; }
  .box-info { background: #f0f9ff; border: 1px solid #e0f2fe; border-left: 3.5px solid #0284c7; }
  .box-title { font-weight: 700; font-size: 8.5pt; margin-bottom: 3px; display: flex; align-items: center; gap: 5px; }
  .box-tip .box-title { color: #15803d; }
  .box-warning .box-title { color: #b45309; }
  .box-info .box-title { color: #0369a1; }
  pre { background: #090d16; color: #f8fafc; border-radius: 6px; padding: 7px 10px; font-family: 'Fira Code', monospace; font-size: 7.5pt; line-height: 1.34; margin: 4px 0 6px 0; overflow: hidden; }
  code { font-family: 'Fira Code', monospace; font-size: 8pt; background: #f1f5f9; color: #0f172a; padding: 1px 4px; border-radius: 3px; border: 1px solid #e2e8f0; }
  pre code { background: transparent; color: inherit; padding: 0; border: none; font-size: inherit; }
  .kw { color: #f472b6; font-weight: 600; }
  .fn { color: #38bdf8; font-weight: 600; }
  .str { color: #a3e635; }
  .num { color: #fbbf24; }
  .cm { color: #94a3b8; font-style: italic; }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
  table.custom-table { width: 100%; border-collapse: collapse; margin: 5px 0 8px 0; font-size: 8pt; }
  table.custom-table th, table.custom-table td { border: 1px solid #cbd5e1; padding: 5px 8px; text-align: left; }
  table.custom-table th { background: #f1f5f9; color: #0f172a; font-weight: 700; }
  table.custom-table tr:nth-child(even) td { background: #f8fafc; }
  .badge-step { background: #0284c7; color: #fff; font-weight: 800; padding: 1px 6px; border-radius: 4px; font-size: 7.2pt; display: inline-block; }
  .cover-card { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #fff; padding: 16px 20px; border-radius: 10px; margin-bottom: 12px; box-shadow: 0 8px 20px rgba(0,0,0,0.12); }
  .cover-card h1 { color: #fff; font-size: 20pt; margin-bottom: 4px; }
  .cover-card .author-badge { color: #38bdf8; font-weight: 700; font-size: 9.5pt; display: flex; align-items: center; gap: 6px; }
</style>
</head>
<body>

  <!-- PÁGINA 1: PORTADA SOLUCIÓN 0 -->
  <div class="page">
    <div class="page-header">
      <span>📁 SOLUCIÓN 0 • GUÍA DETALLADA PASO A PASO</span>
      <span class="badge-header">VERSIÓN 0: SOLUCIÓN DE CLASE</span>
    </div>
    <div class="content-area">
      <div class="cover-card">
        <div style="font-size: 8pt; text-transform: uppercase; letter-spacing: 1.5px; color: #94a3b8; font-weight: 800; margin-bottom: 2px;">
          👨‍🏫 LA SOLUCIÓN ORIGINAL DE AULA
        </div>
        <h1>Solución 0: Enfoque de Clase de Ramón Abramo</h1>
        <div class="author-badge">
          ✍️ Por Ramón Abramo • Profesor de Desarrollo Web
        </div>
      </div>

      <div class="lead">
        <strong>¡Muy buenas a todos! Soy Ramón Abramo.</strong> En esta guía detallada os presento la <strong>Solución 0</strong>, exactamente la que construimos y analizamos juntos en la pizarra del aula. Se caracteriza por su tremenda claridad pedagógica: agrupamos los botones en tres listas naturales (<code>numeros</code>, <code>operadores</code> y <code>acciones</code>) y creamos una función pura de cálculo <code>calcular(numero1, numero2, operacion)</code>.
      </div>

      <h2>🎯 1. ¿Por qué este enfoque triunfa en clase?</h2>
      <p>
        Cuando explicamos JavaScript en la pizarra, los alumnos necesitan ver una correspondencia directa entre lo que ven en el HTML y el bloque de código que lo maneja:
      </p>

      <div class="grid-3">
        <div class="box box-info">
          <div class="box-title">🔢 1. Teclas 'numeros'</div>
          <p style="font-size: 7.8pt; margin: 0;">Un bucle para los dígitos: si hay un <code>'0'</code> o venimos de pulsar operador, sustituye; si no, concatena.</p>
        </div>
        <div class="box box-tip">
          <div class="box-title">➕ 2. Teclas 'operadores'</div>
          <p style="font-size: 7.8pt; margin: 0;">Un bucle para +, -, *, /: calcula el subtotal si ya había operación pendiente y memoriza la nueva.</p>
        </div>
        <div class="box box-warning">
          <div class="box-title">🎯 3. Teclas 'acciones'</div>
          <p style="font-size: 7.8pt; margin: 0;">Un bucle para <code>igual</code> y <code>borrar</code> con un <code>switch</code> limpio y conciso.</p>
        </div>
      </div>

      <h2>📂 Archivos de esta Carpeta (`version-0-solucion-clase/`)</h2>
      <div class="box">
        <ul style="margin: 0; padding-left: 18px; font-size: 8pt;">
          <li><code>app.solucion.js</code>: La solución de clase idéntica a la que subí (antiguo <code>app1.js</code>).</li>
          <li><code>app.js</code>: Código maestro paso a paso con comentarios y pruebas del alumno.</li>
          <li><code>app.alumnos.js</code>: Plantilla con bloques <code>TODO</code> vacíos para entregar en clase.</li>
          <li><code>presentacion.html</code>: Diapositivas interactivas para proyectar en el aula.</li>
          <li><code>GUIA_PASO_A_PASO.md</code>: Guía rápida en Markdown.</li>
        </ul>
      </div>
    </div>
    <div class="page-footer">
      <span>Guía Detallada Solución 0 • Ramón Abramo</span>
      <span>Página 1 de 6</span>
    </div>
  </div>

  <!-- PÁGINA 2: LA FUNCIÓN PURA DE CÁLCULO -->
  <div class="page">
    <div class="page-header">
      <span>📁 SOLUCIÓN 0 • FUNCIÓN PURA DE CÁLCULO</span>
      <span class="badge-header">LÓGICA MATEMÁTICA</span>
    </div>
    <div class="content-area">
      <h2>1. La Función Pura: `calcular(numero1, numero2, operacion)`</h2>
      <p class="lead">
        En mi solución de clase, la función de cálculo es <strong>pura</strong>: no depende de variables globales ni modifica el DOM directamente. Recibe los dos números y la operación, y devuelve el resultado numérico:
      </p>

      <pre><code><span class="kw">function</span> <span class="fn">calcular</span>(numero1, numero2, operacion) {
    <span class="kw">let</span> resultado = <span class="num">0</span>;

    <span class="kw">switch</span> (operacion) {
        <span class="kw">case</span> <span class="str">'+'</span>:
            resultado = numero1 + numero2;
            <span class="kw">break</span>;
        <span class="kw">case</span> <span class="str">'-'</span>:
            resultado = numero1 - numero2;
            <span class="kw">break</span>;
        <span class="kw">case</span> <span class="str">'*'</span>:
            resultado = numero1 * numero2;
            <span class="kw">break</span>;
        <span class="kw">case</span> <span class="str">'/'</span>:
            <span class="kw">if</span> (numero2 === <span class="num">0</span>) {
                resultado = <span class="str">'Error'</span>;
            } <span class="kw">else</span> {
                resultado = numero1 / numero2;
            }
            <span class="kw">break</span>;
    }

    <span class="kw">return</span> resultado;
}</code></pre>

      <div class="box box-tip">
        <div class="box-title">💡 La Belleza de una Función Pura</div>
        <p style="font-size: 7.8pt; margin: 0;">
          Al escribir <code>calcular(15, 3, '+')</code>, esta función devuelve <code>18</code> sin tocar la pantalla ni ninguna variable externa. Esto permite reutilizarla tanto al pulsar el botón <code>=</code> como al encadenar operadores (ej. <code>5 + 3 + ...</code>).
        </p>
      </div>

      <div class="box box-warning">
        <div class="box-title">⚠️ Control de División por Cero</div>
        <p style="font-size: 7.8pt; margin: 0;">
          Fijaos en la línea <code>if (numero2 === 0) resultado = 'Error';</code>. Si intentamos dividir entre 0, devolvemos el texto <code>'Error'</code>. Más adelante veréis cómo este texto bloquea que se sigan haciendo operaciones erróneas.
        </p>
      </div>
    </div>
    <div class="page-footer">
      <span>Guía Detallada Solución 0 • Ramón Abramo</span>
      <span>Página 2 de 6</span>
    </div>
  </div>

  <!-- PÁGINA 3: MEMORIA Y SELECTORES -->
  <div class="page">
    <div class="page-header">
      <span>📁 SOLUCIÓN 0 • ESTADO Y SELECCIÓN EN EL DOM</span>
      <span class="badge-header">MEMORIA Y SELECTORES</span>
    </div>
    <div class="content-area">
      <h2>2. Las 4 Variables de Estado de Clase</h2>
      <p class="lead">
        En la clase definimos cuatro variables globales con nombres muy intuitivos que describen el flujo de pensamiento de un usuario:
      </p>

      <table class="custom-table">
        <thead>
          <tr>
            <th style="width: 25%;">Variable</th>
            <th style="width: 20%;">Valor Inicial</th>
            <th style="width: 55%;">Función en la Calculadora</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>empezarNumero</code></td>
            <td><code>false</code> (booleano)</td>
            <td>Pasa a <code>true</code> tras pulsar un operador para que el próximo dígito limpie la pantalla.</td>
          </tr>
          <tr>
            <td><code>operadorPendiente</code></td>
            <td><code>null</code> (string)</td>
            <td>Almacena el operador (<code>'+'</code>, <code>'-'</code>, etc.) que está esperando a resolverse.</td>
          </tr>
          <tr>
            <td><code>numeroAnterior</code></td>
            <td><code>null</code> (número)</td>
            <td>El número que había en pantalla antes de presionar el operador matemático.</td>
          </tr>
          <tr>
            <td><code>numeroActual</code></td>
            <td><code>null</code> (número)</td>
            <td>El número que hay en pantalla en el momento de ejecutar el cálculo.</td>
          </tr>
        </tbody>
      </table>

      <h2>3. Selección en el DOM: Las 3 Listas Semánticas</h2>
      <p>
        Seleccionamos directamente los tres grupos de botones y la pantalla de salida:
      </p>

      <pre><code><span class="kw">const</span> numeros = <span class="obj">document</span>.<span class="fn">querySelectorAll</span>(<span class="str">'[data-numero]'</span>);
<span class="kw">const</span> operadores = <span class="obj">document</span>.<span class="fn">querySelectorAll</span>(<span class="str">'[data-operador]'</span>);
<span class="kw">const</span> acciones = <span class="obj">document</span>.<span class="fn">querySelectorAll</span>(<span class="str">'[data-accion]'</span>);
<span class="kw">const</span> pantalla = <span class="obj">document</span>.<span class="fn">querySelector</span>(<span class="str">'output'</span>);</code></pre>

      <div class="box box-info">
        <div class="box-title">📌 ¿Por qué 'acciones' agrupa a Igual y Borrar?</div>
        <p style="font-size: 7.8pt; margin: 0;">
          En el HTML, tanto la tecla <code>=</code> como la tecla <code>C</code> tienen el atributo <code>data-accion</code> (con valores <code>"igual"</code> y <code>"borrar"</code>). Con un solo selector capturamos ambas teclas de control.
        </p>
      </div>
    </div>
    <div class="page-footer">
      <span>Guía Detallada Solución 0 • Ramón Abramo</span>
      <span>Página 3 de 6</span>
    </div>
  </div>

  <!-- PÁGINA 4: TECLAS NUMÉRICAS -->
  <div class="page">
    <div class="page-header">
      <span>📁 SOLUCIÓN 0 • NÚMEROS EN PANTALLA</span>
      <span class="badge-header">GRUPO NUMEROS</span>
    </div>
    <div class="content-area">
      <h2>[HITO 1] El Bloque de Dígitos: `numeros.forEach`</h2>
      <p class="lead">
        Recorremos la lista <code>numeros</code> y asignamos el escuchador click. Observad la lógica de sustitución y concatenación directa sobre <code>pantalla.textContent</code>:
      </p>

      <pre><code>numeros.<span class="fn">forEach</span>(numero => {
    numero.<span class="fn">addEventListener</span>(<span class="str">'click'</span>, () => {
        <span class="cm">// 1. Leemos el dígito pulsado desde el dataset</span>
        <span class="kw">const</span> valor = numero.dataset.numero;

        <span class="cm">// 2. Si la pantalla tiene '0' o venimos de pulsar un operador:</span>
        <span class="kw">if</span> (pantalla.<span class="prop">textContent</span> === <span class="str">'0'</span> || empezarNumero) {
            pantalla.<span class="prop">textContent</span> = valor; <span class="cm">// Escribe el nuevo número limpio</span>
            empezarNumero = <span class="kw">false</span>;        <span class="cm">// Desactiva la bandera</span>
        } <span class="kw">else</span> {
            <span class="cm">// 3. Si no, pega el dígito detrás de los existentes</span>
            pantalla.<span class="prop">textContent</span> += valor;
        }
    });
});</code></pre>

      <h2>Explicación de la Lógica Paso a Paso</h2>
      <div class="grid-2">
        <div class="box box-info">
          <div class="box-title">Caso A: El 0 Inicial</div>
          <p style="font-size: 7.7pt; margin: 0;">
            Al abrir la calculadora, la pantalla tiene <code>'0'</code>. Si pulsamos <code>7</code>, <code>pantalla.textContent === '0'</code> es <code>true</code>, por lo que se sustituye por <code>"7"</code> (evitamos que aparezca <code>"07"</code>).
          </p>
        </div>
        <div class="box box-tip">
          <div class="box-title">Caso B: El Flag 'empezarNumero'</div>
          <p style="font-size: 7.7pt; margin: 0;">
            Si el usuario teclea <code>15</code> y pulsa <code>+</code>, <code>empezarNumero</code> se activa en <code>true</code>. Al teclear el siguiente número <code>4</code>, la pantalla se limpia automáticamente mostrando solo <code>"4"</code>.
          </p>
        </div>
      </div>

      <div class="box box-tip" style="margin-top: 8px;">
        <div class="box-title">🧪 Prueba de Fuego del Alumno</div>
        Pulsad <code>7</code>, <code>8</code>, <code>9</code>. En pantalla se ve <code>789</code>. La concatenación y la eliminación del cero funcionan perfectamente.
      </div>
    </div>
    <div class="page-footer">
      <span>Guía Detallada Solución 0 • Ramón Abramo</span>
      <span>Página 4 de 6</span>
    </div>
  </div>

  <!-- PÁGINA 5: TECLAS DE OPERADORES -->
  <div class="page">
    <div class="page-header">
      <span>📁 SOLUCIÓN 0 • OPERADORES Y ENCADENAMIENTO</span>
      <span class="badge-header">GRUPO OPERADORES</span>
    </div>
    <div class="content-area">
      <h2>[HITO 2, 4 y 5] Operadores (+, -, *, /)</h2>
      <p class="lead">
        Este es uno de los bloques más inteligentes de la solución de clase: resuelve las operaciones encadenadas automáticamente sin añadir código extra:
      </p>

      <pre><code>operadores.<span class="fn">forEach</span>(operador => {
    operador.<span class="fn">addEventListener</span>(<span class="str">'click'</span>, () => {
        <span class="kw">const</span> valor = operador.dataset.operador;

        <span class="cm">// [HITO 5] Si ya había operador pendiente y ya se escribió un número:</span>
        <span class="kw">if</span> (operadorPendiente !== <span class="kw">null</span> && empezarNumero !== <span class="kw">true</span>) {
            numeroActual = <span class="fn">Number</span>(pantalla.<span class="prop">textContent</span>);
            numeroAnterior = <span class="fn">calcular</span>(numeroAnterior, numeroActual, operadorPendiente);
            pantalla.<span class="prop">textContent</span> = numeroAnterior; <span class="cm">// Pinta el subtotal en pantalla</span>
        } <span class="kw">else</span> {
            <span class="cm">// Si es el primer operador pulsado:</span>
            numeroAnterior = <span class="fn">Number</span>(pantalla.<span class="prop">textContent</span>);
        }

        <span class="cm">// Si hubo error (ej. división por 0), no guardamos el operador</span>
        operadorPendiente = (numeroAnterior === <span class="str">'Error'</span>) ? <span class="kw">null</span> : valor;
        
        <span class="cm">// Marcamos que el próximo dígito debe limpiar la pantalla</span>
        empezarNumero = <span class="kw">true</span>;
    });
});</code></pre>

      <h2>Los Dos Escenarios de Pulsar un Operador</h2>
      <div class="grid-2">
        <div class="box box-info">
          <div class="box-title">Escenario 1: Operación Simple</div>
          <p style="font-size: 7.7pt; margin: 0;">
            El usuario teclea <code>12</code> y pulsa <code>+</code>. Como <code>operadorPendiente</code> era <code>null</code>, entra en el <code>else</code>: guarda <code>numeroAnterior = 12</code>, <code>operadorPendiente = '+'</code> y <code>empezarNumero = true</code>.
          </p>
        </div>
        <div class="box box-tip">
          <div class="box-title">Escenario 2: Operación Encadenada</div>
          <p style="font-size: 7.7pt; margin: 0;">
            El usuario teclea <code>5 + 3</code> y luego pulsa <code>*</code>. Como ya había un <code>+</code> pendiente y escribió el <code>3</code>, se calcula <code>5 + 3 = 8</code>, se pinta <code>8</code> en pantalla y se guarda <code>*</code> como nuevo operador.
          </p>
        </div>
      </div>
    </div>
    <div class="page-footer">
      <span>Guía Detallada Solución 0 • Ramón Abramo</span>
      <span>Página 5 de 6</span>
    </div>
  </div>

  <!-- PÁGINA 6: ACCIONES Y RESUMEN -->
  <div class="page">
    <div class="page-header">
      <span>📁 SOLUCIÓN 0 • ACCIONES Y CONCLUSIONES</span>
      <span class="badge-header">GRUPO ACCIONES</span>
    </div>
    <div class="content-area">
      <h2>[HITO 3 y 6] Las Acciones: Igual (=) y Borrar (C)</h2>
      <p class="lead">
        Recorremos la lista <code>acciones</code> y despachamos con un <code>switch (valor)</code>:
      </p>

      <pre><code>acciones.<span class="fn">forEach</span>(accion => {
    accion.<span class="fn">addEventListener</span>(<span class="str">'click'</span>, () => {
        <span class="kw">const</span> valor = accion.dataset.accion;

        <span class="kw">switch</span> (valor) {
            <span class="kw">case</span> <span class="str">'igual'</span>:
                <span class="cm">// Si hay una operación pendiente, resolvemos el cálculo</span>
                <span class="kw">if</span> (operadorPendiente !== <span class="kw">null</span>) {
                    numeroActual = <span class="fn">Number</span>(pantalla.<span class="prop">textContent</span>);
                    numeroAnterior = <span class="fn">calcular</span>(numeroAnterior, numeroActual, operadorPendiente);
                    pantalla.<span class="prop">textContent</span> = numeroAnterior;
                }
                operadorPendiente = <span class="kw">null</span>;
                empezarNumero = <span class="kw">true</span>;
                <span class="kw">break</span>;

            <span class="kw">case</span> <span class="str">'borrar'</span>:
                pantalla.<span class="prop">textContent</span> = <span class="str">'0'</span>;
                operadorPendiente = <span class="kw">null</span>;
                empezarNumero = <span class="kw">true</span>;
                <span class="kw">break</span>;
        }
    });
});</code></pre>

      <h2>Resumen Didáctico de la Solución 0</h2>
      <div class="box box-tip">
        <div class="box-title">¿Qué hace única a la Solución de Clase?</div>
        <p style="font-size: 7.8pt; margin: 0;">
          1. <strong>Función pura:</strong> <code>calcular(n1, n2, op)</code> es un modelo ejemplar de modularidad.<br>
          2. <strong>Manipulación directa:</strong> Lee y escribe en <code>pantalla.textContent</code> sin capas intermedias.<br>
          3. <strong>Semántica de grupos:</strong> Dividir en <code>numeros</code>, <code>operadores</code> y <code>acciones</code> ayuda al alumno a estructurar mentalmente los tipos de botones.
        </p>
      </div>

      <p style="text-align: center; margin-top: 8px; font-weight: 700; color: #0284c7; font-size: 8.5pt;">
        ¡Enhorabuena! Has completado el análisis de la Solución de Clase de Ramón Abramo. 🖩🎓
      </p>
    </div>
    <div class="page-footer">
      <span>Guía Detallada Solución 0 • Ramón Abramo</span>
      <span>Página 6 de 6</span>
    </div>
  </div>

</body>
</html>
"""

with open("temp_sol0.html", "w", encoding="utf-8") as f:
    f.write(html_sol0)

pdf_sol0 = r"d:\Ramon\www\confeccion2026\practicas\calculadora\version-0-solucion-clase\Guia_Detallada_Solucion_0_Solucion_Clase.pdf"

cmd = [
    EDGE_EXE,
    "--headless",
    "--disable-gpu",
    "--run-all-compositor-stages-before-draw",
    f"--print-to-pdf={pdf_sol0}",
    "--no-pdf-header-footer",
    f"file:///{os.path.abspath('temp_sol0.html').replace(os.sep, '/')}"
]

res = subprocess.run(cmd, capture_output=True, text=True)
if os.path.exists(pdf_sol0):
    doc = fitz.open(pdf_sol0)
    print(f"[OK] Solucion 0 PDF generada: {len(doc)} paginas ({os.path.getsize(pdf_sol0)} bytes)")
else:
    print("[ERROR] No se pudo generar el PDF de Solucion 0")

if os.path.exists("temp_sol0.html"):
    os.remove("temp_sol0.html")
