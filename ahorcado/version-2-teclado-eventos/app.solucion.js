const BANCO_PALABRAS = [
  { palabra: 'JAVASCRIPT', categoria: 'Programación Web', pista: 'Lenguaje interpretado interactivo para navegadores.' },
  { palabra: 'CSS', categoria: 'Diseño Web', pista: 'Hojas de estilo para colores y maquetación.' },
  { palabra: 'HTML', categoria: 'Estructura Web', pista: 'Lenguaje de marcado estándar con etiquetas.' },
  { palabra: 'VARIABLE', categoria: 'Concepto JS', pista: 'Contenedor en memoria para almacenar un dato.' },
  { palabra: 'FUNCION', categoria: 'Concepto JS', pista: 'Bloque de código modular reutilizable.' },
  { palabra: 'RESPONSIVE', categoria: 'Diseño Web', pista: 'Adaptabilidad a móviles y pantallas variadas.' }
];

const LETRAS_ALFABETO = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
const MAX_FALLOS = 6;

let partidaActual = null;
let letrasAdivinadas = [];
let letrasUsadas = new Set();
let fallos = 0;
let juegoTerminado = false;
let pistaRevelada = false;

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

function renderizarTecladoVirtual() {
  tecladoVirtual.innerHTML = '';
  LETRAS_ALFABETO.forEach(letra => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'tecla';
    btn.textContent = letra;
    btn.dataset.letra = letra;
    tecladoVirtual.appendChild(btn);
  });
}

function iniciarJuego() {
  const indice = Math.floor(Math.random() * BANCO_PALABRAS.length);
  partidaActual = BANCO_PALABRAS[indice];

  letrasAdivinadas = Array(partidaActual.palabra.length).fill('');
  letrasUsadas.clear();
  fallos = 0;
  juegoTerminado = false;
  pistaRevelada = false;

  cajaPista.classList.add('oculta');
  textoPista.textContent = '';
  btnPista.disabled = false;
  btnPista.textContent = '💡 Pedir Pista';

  partesAhorcado.forEach(p => p.classList.remove('visible'));
  caraDerrota.classList.remove('visible');

  categoriaBadge.textContent = partidaActual.categoria;
  renderizarTecladoVirtual();

  actualizarPalabraVisual();
  actualizarMarcadorVidas();
  mostrarMensaje('¡Partida lista! Elige una letra.', 'normal');
}

function jugarLetra(letra) {
  if (juegoTerminado || !LETRAS_ALFABETO.includes(letra) || letrasUsadas.has(letra)) return;

  letrasUsadas.add(letra);
  const boton = tecladoVirtual.querySelector(`[data-letra="${letra}"]`);
  if (boton) boton.disabled = true;

  if (partidaActual.palabra.includes(letra)) {
    if (boton) boton.classList.add('acierto');
    for (let i = 0; i < partidaActual.palabra.length; i++) {
      if (partidaActual.palabra[i] === letra) letrasAdivinadas[i] = letra;
    }
    mostrarMensaje(`¡Acierto con "${letra}"!`, 'exito');
  } else {
    if (boton) boton.classList.add('fallo');
    fallos++;
    if (partesAhorcado[fallos - 1]) partesAhorcado[fallos - 1].classList.add('visible');
    mostrarMensaje(`¡Fallo con "${letra}"!`, 'error');
  }

  actualizarPalabraVisual();
  actualizarMarcadorVidas();
  verificarFinJuego();
}

function actualizarPalabraVisual() {
  palabraDisplay.innerHTML = '';
  for (let i = 0; i < partidaActual.palabra.length; i++) {
    const casilla = document.createElement('span');
    casilla.className = 'casilla-letra';
    if (letrasAdivinadas[i]) {
      casilla.textContent = letrasAdivinadas[i];
      casilla.classList.add('revelada');
    }
    palabraDisplay.appendChild(casilla);
  }
}

function actualizarMarcadorVidas() {
  const vidas = MAX_FALLOS - fallos;
  vidasTexto.textContent = `(${vidas} restantes)`;
  const corazones = vidasIconos.querySelectorAll('.corazon');
  corazones.forEach((c, i) => c.classList.toggle('perdido', i >= vidas));
}

function alternarPista() {
  if (juegoTerminado || pistaRevelada) return;
  pistaRevelada = true;
  textoPista.textContent = partidaActual.pista;
  cajaPista.classList.remove('oculta');
  btnPista.disabled = true;
  btnPista.textContent = '💡 Pista Activada';
}

function mostrarMensaje(texto, tipo = 'normal') {
  mensajeEstado.textContent = texto;
  mensajeEstado.className = 'mensaje-alerta' + (tipo !== 'normal' ? ' ' + tipo : '');
}

function verificarFinJuego() {
  if (!letrasAdivinadas.includes('')) {
    juegoTerminado = true;
    deshabilitarTeclado();
    mostrarMensaje(`🏆 ¡Victoria! Has descubierto "${partidaActual.palabra}".`, 'exito');
  } else if (fallos >= MAX_FALLOS) {
    juegoTerminado = true;
    caraDerrota.classList.add('visible');
    deshabilitarTeclado();
    const casillas = palabraDisplay.querySelectorAll('.casilla-letra');
    for (let i = 0; i < partidaActual.palabra.length; i++) {
      casillas[i].textContent = partidaActual.palabra[i];
      if (!letrasAdivinadas[i]) casillas[i].style.color = '#f87171';
    }
    mostrarMensaje(`💀 ¡Derrota! La palabra era "${partidaActual.palabra}".`, 'error');
  }
}

function deshabilitarTeclado() {
  tecladoVirtual.querySelectorAll('.tecla').forEach(t => t.disabled = true);
  btnPista.disabled = true;
  btnReiniciar.focus();
}

tecladoVirtual.addEventListener('click', e => {
  const btn = e.target.closest('.tecla');
  if (btn && !btn.disabled) jugarLetra(btn.dataset.letra);
});

window.addEventListener('keydown', e => {
  if (e.ctrlKey || e.altKey || e.metaKey) return;
  const letra = e.key.toUpperCase();
  if (LETRAS_ALFABETO.includes(letra)) jugarLetra(letra);
});

btnPista.addEventListener('click', alternarPista);
btnReiniciar.addEventListener('click', iniciarJuego);

iniciarJuego();
