/**
 * ====================================================================
 * JUEGO DEL AHORCADO - VERSIÓN 2: TECLADO VIRTUAL Y CATEGORÍAS
 * ====================================================================
 * 
 * Enfoque Pedagógico:
 * - Nivel Intermedio de JavaScript.
 * - Generación dinámica de elementos del DOM con document.createElement().
 * - Teclado virtual interactivo con estados visuales (acierto / fallo).
 * - Banco de datos con objetos (palabra, categoría y pista).
 * - Delegación de eventos y sincronización con teclado físico (keydown).
 * 
 * Autor: Ramón Abramo
 * Curso: Confección y Publicación de Páginas Web 2026
 * ====================================================================
 */

/* ====================================================================
 * HITO 1: BANCO DE PALABRAS CON METADATOS Y ESTADO
 * ==================================================================== */

// Vocabulario temático con categorías y pistas didácticas
const BANCO_PALABRAS = [
  {
    palabra: 'JAVASCRIPT',
    categoria: 'Programación Web',
    pista: 'Lenguaje interpretado que añade interactividad a las páginas.'
  },
  {
    palabra: 'CSS',
    categoria: 'Diseño Web',
    pista: 'Hojas de estilo en cascada para dar color, tipografía y maquetación.'
  },
  {
    palabra: 'HTML',
    categoria: 'Estructura Web',
    pista: 'Lenguaje de marcado con etiquetas para estructurar contenido en la red.'
  },
  {
    palabra: 'VARIABLE',
    categoria: 'Concepto JS',
    pista: 'Contenedor en memoria que guarda un dato que puede cambiar.'
  },
  {
    palabra: 'FUNCION',
    categoria: 'Concepto JS',
    pista: 'Bloque de código reutilizable que realiza una tarea específica.'
  },
  {
    palabra: 'RESPONSIVE',
    categoria: 'Diseño Web',
    pista: 'Técnica para que un diseño se adapte a móviles, tablets y monitores.'
  },
  {
    palabra: 'ALGORITMO',
    categoria: 'Lógica',
    pista: 'Conjunto ordenado y finito de instrucciones para resolver un problema.'
  },
  {
    palabra: 'FRONTEND',
    categoria: 'Desarrollo Web',
    pista: 'Parte de una aplicación web que se ejecuta en el navegador del usuario.'
  }
];

const LETRAS_ALFABETO = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
const MAX_FALLOS = 6;

// Variables de estado de la partida
let partidaActual = null;       // Objeto de la palabra seleccionada { palabra, categoria, pista }
let letrasAdivinadas = [];      // Array con las letras descubiertas
let letrasUsadas = new Set();   // Usamos Set para evitar duplicados de forma nativa
let fallos = 0;
let juegoTerminado = false;
let pistaRevelada = false;

/* ====================================================================
 * HITO 2: SELECCIÓN DE ELEMENTOS DEL DOM
 * ==================================================================== */

const categoriaBadge = document.getElementById('categoria-badge');
const palabraDisplay = document.getElementById('palabra-display');
const tecladoVirtual = document.getElementById('teclado-virtual');
const mensajeEstado = document.getElementById('mensaje-estado');
const vidasTexto = document.getElementById('vidas-texto');
const vidasIconos = document.getElementById('vidas-iconos');
const btnPista = document.getElementById('btn-pista');
const cajaPista = document.getElementById('caja-pista');
const textoPista = document.getElementById('texto-pista');
const btnReiniciar = document.getElementById('btn-reiniciar');

// Partes del ahorcado en el SVG
const partesAhorcado = [
  document.getElementById('parte-cabeza'),
  document.getElementById('parte-cuerpo'),
  document.getElementById('parte-brazo-izq'),
  document.getElementById('parte-brazo-der'),
  document.getElementById('parte-pierna-izq'),
  document.getElementById('parte-pierna-der')
];
const caraDerrota = document.getElementById('parte-cara-derrota');

/* ====================================================================
 * HITO 3: GENERACIÓN DINÁMICA DEL TECLADO VIRTUAL
 * ==================================================================== */

/**
 * Inyecta dinámicamente un botón para cada letra del abecedario
 */
function renderizarTecladoVirtual() {
  tecladoVirtual.innerHTML = '';

  LETRAS_ALFABETO.forEach(letra => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'tecla';
    btn.textContent = letra;
    btn.dataset.letra = letra;
    btn.setAttribute('aria-label', `Letra ${letra}`);
    tecladoVirtual.appendChild(btn);
  });
}

/* ====================================================================
 * HITO 4: INICIAR Y REINICIAR PARTIDA
 * ==================================================================== */

function iniciarJuego() {
  // 1. Elegir un objeto al azar del banco
  const indice = Math.floor(Math.random() * BANCO_PALABRAS.length);
  partidaActual = BANCO_PALABRAS[indice];

  // 2. Preparar el estado
  letrasAdivinadas = Array(partidaActual.palabra.length).fill('');
  letrasUsadas.clear();
  fallos = 0;
  juegoTerminado = false;
  pistaRevelada = false;

  // 3. Resetear pista
  cajaPista.classList.add('oculta');
  textoPista.textContent = '';
  btnPista.disabled = false;
  btnPista.textContent = '💡 Pedir Pista';

  // 4. Resetear partes del muñeco
  partesAhorcado.forEach(p => p.classList.remove('visible'));
  caraDerrota.classList.remove('visible');

  // 5. Categoría y teclado
  categoriaBadge.textContent = partidaActual.categoria;
  renderizarTecladoVirtual();

  // 6. Actualizar pantalla
  actualizarPalabraVisual();
  actualizarMarcadorVidas();
  mostrarMensaje('¡Partida lista! Haz clic en una letra o usa tu teclado físico.', 'normal');
}

/* ====================================================================
 * HITO 5: LÓGICA DE JUGADA Y GESTIÓN DE EVENTOS
 * ==================================================================== */

/**
 * Procesa la jugada de una letra, sea del teclado virtual o físico
 * @param {string} letra Letra en mayúsculas a comprobar
 */
function jugarLetra(letra) {
  if (juegoTerminado) return;
  if (!letra || !LETRAS_ALFABETO.includes(letra)) return;
  if (letrasUsadas.has(letra)) return;

  // 1. Registrar letra
  letrasUsadas.add(letra);

  // 2. Buscar el botón en el teclado virtual
  const botonTecla = tecladoVirtual.querySelector(`[data-letra="${letra}"]`);
  if (botonTecla) {
    botonTecla.disabled = true;
  }

  // 3. Comprobar si acierta o falla
  if (partidaActual.palabra.includes(letra)) {
    // ACIERTO
    if (botonTecla) botonTecla.classList.add('acierto');

    for (let i = 0; i < partidaActual.palabra.length; i++) {
      if (partidaActual.palabra[i] === letra) {
        letrasAdivinadas[i] = letra;
      }
    }
    mostrarMensaje(`¡Excelente! La letra "${letra}" está en la palabra.`, 'exito');
  } else {
    // FALLO
    if (botonTecla) botonTecla.classList.add('fallo');
    fallos++;
    if (partesAhorcado[fallos - 1]) {
      partesAhorcado[fallos - 1].classList.add('visible');
    }
    mostrarMensaje(`¡Oh no! La letra "${letra}" no coincide.`, 'error');
  }

  // 4. Actualizar visuales y verificar fin de partida
  actualizarPalabraVisual();
  actualizarMarcadorVidas();
  verificarFinJuego();
}

/* ====================================================================
 * HITO 6: ACTUALIZACIONES VISUALES (CASILLAS, CORAZONES Y PISTAS)
 * ==================================================================== */

/**
 * Renderiza casillas independientes para cada letra de la palabra
 */
function actualizarPalabraVisual() {
  palabraDisplay.innerHTML = '';

  for (let i = 0; i < partidaActual.palabra.length; i++) {
    const casilla = document.createElement('span');
    casilla.className = 'casilla-letra';

    const letraDescubierta = letrasAdivinadas[i];
    if (letraDescubierta) {
      casilla.textContent = letraDescubierta;
      casilla.classList.add('revelada');
    } else {
      casilla.textContent = '';
    }

    palabraDisplay.appendChild(casilla);
  }
}

/**
 * Actualiza los iconos de corazón y el contador de vidas
 */
function actualizarMarcadorVidas() {
  const vidas = MAX_FALLOS - fallos;
  vidasTexto.textContent = `(${vidas} restantes)`;

  const corazones = vidasIconos.querySelectorAll('.corazon');
  corazones.forEach((corazon, index) => {
    if (index >= vidas) {
      corazon.classList.add('perdido');
    } else {
      corazon.classList.remove('perdido');
    }
  });
}

/**
 * Muestra u oculta la pista temática
 */
function alternarPista() {
  if (juegoTerminado || pistaRevelada) return;

  pistaRevelada = true;
  textoPista.textContent = partidaActual.pista;
  cajaPista.classList.remove('oculta');
  btnPista.disabled = true;
  btnPista.textContent = '💡 Pista Activada';
  mostrarMensaje('¡Pista revelada! Léela con atención.', 'aviso');
}

function mostrarMensaje(texto, tipo = 'normal') {
  mensajeEstado.textContent = texto;
  mensajeEstado.className = 'mensaje-alerta' + (tipo !== 'normal' ? ' ' + tipo : '');
}

/* ====================================================================
 * HITO 7: CONTROL DE FIN DE PARTIDA
 * ==================================================================== */

function verificarFinJuego() {
  // Comprobar si todas las casillas tienen letra
  const haGanado = !letrasAdivinadas.includes('');

  if (haGanado) {
    juegoTerminado = true;
    deshabilitarTecladoCompleto();
    mostrarMensaje(`🏆 ¡VICTORIA BRILLANTE! Has descubierto la palabra "${partidaActual.palabra}".`, 'exito');
    return;
  }

  // Comprobar si ha agotado vidas
  if (fallos >= MAX_FALLOS) {
    juegoTerminado = true;
    caraDerrota.classList.add('visible');
    deshabilitarTecladoCompleto();

    // Revelar la palabra en las casillas con estilo especial
    const casillas = palabraDisplay.querySelectorAll('.casilla-letra');
    for (let i = 0; i < partidaActual.palabra.length; i++) {
      casillas[i].textContent = partidaActual.palabra[i];
      if (!letrasAdivinadas[i]) {
        casillas[i].style.color = '#f87171';
      }
    }

    mostrarMensaje(`💀 ¡FIN DEL JUEGO! La palabra oculta era "${partidaActual.palabra}".`, 'error');
  }
}

function deshabilitarTecladoCompleto() {
  const teclas = tecladoVirtual.querySelectorAll('.tecla');
  teclas.forEach(t => t.disabled = true);
  btnPista.disabled = true;
  btnReiniciar.focus();
}

/* ====================================================================
 * ESCUCHADORES DE EVENTOS
 * ==================================================================== */

// 1. Delegación de eventos en el teclado virtual
tecladoVirtual.addEventListener('click', evento => {
  const boton = evento.target.closest('.tecla');
  if (!boton || boton.disabled) return;
  jugarLetra(boton.dataset.letra);
});

// 2. Escuchador global de teclado físico
window.addEventListener('keydown', evento => {
  if (juegoTerminado) return;

  // Ignorar atajos con Ctrl, Alt o Meta
  if (evento.ctrlKey || evento.altKey || evento.metaKey) return;

  const letraPulsada = evento.key.toUpperCase();
  if (LETRAS_ALFABETO.includes(letraPulsada)) {
    jugarLetra(letraPulsada);
  }
});

// 3. Botón de pedir pista
btnPista.addEventListener('click', alternarPista);

// 4. Botón de nueva partida
btnReiniciar.addEventListener('click', iniciarJuego);

// Arranque inicial
iniciarJuego();
