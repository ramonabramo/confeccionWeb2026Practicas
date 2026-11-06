/**
 * ====================================================================
 * JUEGO DEL AHORCADO - PLANTILLA PARA EL ALUMNADO (VERSIÓN 2)
 * ====================================================================
 * 
 * Enfoque: Teclado Virtual con Delegación de Eventos y Categorías
 * 
 * Alumno/a: ___________________________________________________________
 * Fecha:    ___________________________________________________________
 * ====================================================================
 */

/* ====================================================================
 * HITO 1: BANCO DE PALABRAS Y VARIABLES
 * ==================================================================== */

// TODO 1.1: Declara un array de objetos con 'palabra', 'categoria' y 'pista'
const BANCO_PALABRAS = [
  { palabra: 'JAVASCRIPT', categoria: 'Programación Web', pista: 'Lenguaje que añade dinamismo al navegador.' },
  { palabra: 'CSS', categoria: 'Diseño Web', pista: 'Hojas de estilo en cascada para colores y maquetación.' },
  { palabra: 'HTML', categoria: 'Estructura Web', pista: 'Lenguaje de marcado con etiquetas para la web.' },
  { palabra: 'VARIABLE', categoria: 'Concepto JS', pista: 'Espacio de memoria con nombre que almacena un valor.' },
  { palabra: 'RESPONSIVE', categoria: 'Diseño Web', pista: 'Diseño adaptable a diferentes dispositivos.' }
];

const LETRAS_ALFABETO = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
const MAX_FALLOS = 6;

let partidaActual = null;       // Objeto de la palabra seleccionada
let letrasAdivinadas = [];      // Array con aciertos
let letrasUsadas = new Set();   // Colección Set para no repetir letras
let fallos = 0;
let juegoTerminado = false;

/* ====================================================================
 * HITO 2: SELECTORES DEL DOM
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
 * HITO 3: GENERACIÓN DEL TECLADO VIRTUAL
 * ==================================================================== */

function renderizarTecladoVirtual() {
  tecladoVirtual.innerHTML = '';

  // TODO 3.1: Recorre LETRAS_ALFABETO con forEach
  // Para cada letra:
  // 1. Crea un elemento 'button' con document.createElement('button')
  // 2. Asígnale la clase 'tecla'
  // 3. Define su textContent con la letra
  // 4. Guarda la letra en dataset.letra = letra
  // 5. Agrégalo a tecladoVirtual con appendChild(btn)
}

/* ====================================================================
 * HITO 4: INICIAR PARTIDA
 * ==================================================================== */

function iniciarJuego() {
  // TODO 4.1: Selecciona un objeto al azar de BANCO_PALABRAS
  // partidaActual = ...

  // TODO 4.2: Llena letrasAdivinadas con cadenas vacías del tamaño de la palabra
  // letrasAdivinadas = Array(partidaActual.palabra.length).fill('');

  // TODO 4.3: Limpia letrasUsadas (.clear()), resetea fallos a 0 y juegoTerminado a false

  // TODO 4.4: Oculta la caja de pista y las partes del muñeco

  // TODO 4.5: Muestra la categoría en categoriaBadge y renderiza el teclado virtual

  // TODO 4.6: Llama a actualizarPalabraVisual() y actualizarMarcadorVidas()
}

/* ====================================================================
 * HITO 5: GESTIÓN DE JUGADA
 * ==================================================================== */

function jugarLetra(letra) {
  if (juegoTerminado) return;
  if (!letra || letrasUsadas.has(letra)) return;

  // TODO 5.1: Añade la letra a letrasUsadas

  // TODO 5.2: Localiza la tecla en el teclado virtual usando querySelector('[data-letra="..."]')
  // y desactívala (boton.disabled = true)

  // TODO 5.3: Si partidaActual.palabra incluye la letra:
  //   - Añade clase 'acierto' a la tecla
  //   - Recorre la palabra y rellena letrasAdivinadas[i] = letra
  // SI NO:
  //   - Añade clase 'fallo' a la tecla
  //   - Incrementa fallos y muestra la siguiente pieza en el SVG

  // TODO 5.4: Llama a actualizarPalabraVisual(), actualizarMarcadorVidas() y verificarFinJuego()
}

/* ====================================================================
 * HITO 6: ACTUALIZACIONES VISUALES
 * ==================================================================== */

function actualizarPalabraVisual() {
  palabraDisplay.innerHTML = '';
  // TODO 6.1: Crea un <span class="casilla-letra"> por cada letra de la palabra
  // Si la letra ha sido descubierta, muestra la letra y añade clase 'revelada'
}

function actualizarMarcadorVidas() {
  const vidas = MAX_FALLOS - fallos;
  vidasTexto.textContent = `(${vidas} restantes)`;

  // TODO 6.2: Recorre los corazones y agrega la clase 'perdido' a los que excedan las vidas
}

function alternarPista() {
  // TODO 6.3: Muestra cajaPista con textoPista.textContent = partidaActual.pista
}

function mostrarMensaje(texto, tipo = 'normal') {
  mensajeEstado.textContent = texto;
  mensajeEstado.className = 'mensaje-alerta' + (tipo !== 'normal' ? ' ' + tipo : '');
}

/* ====================================================================
 * HITO 7: VERIFICAR FIN DE PARTIDA
 * ==================================================================== */

function verificarFinJuego() {
  // TODO 7.1: Si !letrasAdivinadas.includes(''), ¡el jugador gana!
  // TODO 7.2: Si fallos >= MAX_FALLOS, ¡el jugador pierde! Muestra la palabra y cara de derrota
}

/* ====================================================================
 * ESCUCHADORES DE EVENTOS
 * ==================================================================== */

// TODO 8.1: Delegación de eventos en tecladoVirtual (evento 'click' + e.target.closest('.tecla'))
// tecladoVirtual.addEventListener('click', e => { ... });

// TODO 8.2: Escuchador global de teclado físico (evento 'keydown' en window)
// window.addEventListener('keydown', e => { ... });

btnPista.addEventListener('click', alternarPista);
btnReiniciar.addEventListener('click', iniciarJuego);

iniciarJuego();
