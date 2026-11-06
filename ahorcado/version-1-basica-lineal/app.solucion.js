const PALABRAS = ['JAVASCRIPT', 'PROGRAMACION', 'VARIABLE', 'FUNCION', 'ARRAY', 'OBJETO', 'PANTALLA', 'BUCLE'];
const MAX_FALLOS = 6;

let palabraSecreta = '';
let letrasAdivinadas = [];
let letrasUsadas = [];
let fallos = 0;
let juegoTerminado = false;

const palabraDisplay = document.getElementById('palabra-display');
const inputLetra = document.getElementById('input-letra');
const btnProbar = document.getElementById('btn-probar');
const letrasUsadasDisplay = document.getElementById('letras-usadas-display');
const vidasRestantes = document.getElementById('vidas-restantes');
const mensajeEstado = document.getElementById('mensaje-estado');
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

function iniciarJuego() {
  const indice = Math.floor(Math.random() * PALABRAS.length);
  palabraSecreta = PALABRAS[indice];

  letrasAdivinadas = Array(palabraSecreta.length).fill('_');
  letrasUsadas = [];
  fallos = 0;
  juegoTerminado = false;

  partesAhorcado.forEach(p => p.classList.remove('visible'));
  caraDerrota.classList.remove('visible');

  inputLetra.disabled = false;
  btnProbar.disabled = false;
  inputLetra.value = '';
  inputLetra.focus();

  actualizarPantalla();
  mostrarMensaje('¡Nueva partida iniciada! Escribe una letra.', 'normal');
}

function procesarLetra() {
  if (juegoTerminado) return;

  const letra = inputLetra.value.trim().toUpperCase();
  inputLetra.value = '';
  inputLetra.focus();

  if (!letra || !/^[A-ZÑ]$/.test(letra)) {
    mostrarMensaje('Introduce una letra válida (A-Z).', 'aviso');
    return;
  }

  if (letrasUsadas.includes(letra)) {
    mostrarMensaje(`La letra "${letra}" ya fue jugada.`, 'aviso');
    return;
  }

  letrasUsadas.push(letra);

  if (palabraSecreta.includes(letra)) {
    for (let i = 0; i < palabraSecreta.length; i++) {
      if (palabraSecreta[i] === letra) letrasAdivinadas[i] = letra;
    }
    mostrarMensaje(`¡Acierto! La letra "${letra}" está en la palabra.`, 'exito');
  } else {
    fallos++;
    if (partesAhorcado[fallos - 1]) partesAhorcado[fallos - 1].classList.add('visible');
    mostrarMensaje(`¡Fallo! La letra "${letra}" no está.`, 'error');
  }

  actualizarPantalla();
  verificarFinJuego();
}

function actualizarPantalla() {
  palabraDisplay.textContent = letrasAdivinadas.join(' ');
  const vidas = MAX_FALLOS - fallos;
  vidasRestantes.textContent = vidas;
  vidasRestantes.classList.toggle('peligro', vidas <= 2);
  letrasUsadasDisplay.textContent = letrasUsadas.length ? letrasUsadas.join(', ') : 'Ninguna aún';
}

function mostrarMensaje(texto, tipo = 'normal') {
  mensajeEstado.textContent = texto;
  mensajeEstado.className = 'mensaje-alerta' + (tipo !== 'normal' ? ' ' + tipo : '');
}

function verificarFinJuego() {
  if (!letrasAdivinadas.includes('_')) {
    juegoTerminado = true;
    mostrarMensaje(`🎉 ¡Has ganado! La palabra es "${palabraSecreta}".`, 'exito');
    finalizarPartida();
  } else if (fallos >= MAX_FALLOS) {
    juegoTerminado = true;
    caraDerrota.classList.add('visible');
    palabraDisplay.textContent = palabraSecreta.split('').join(' ');
    mostrarMensaje(`💀 ¡Has perdido! La palabra era "${palabraSecreta}".`, 'error');
    finalizarPartida();
  }
}

function finalizarPartida() {
  inputLetra.disabled = true;
  btnProbar.disabled = true;
  btnReiniciar.focus();
}

btnProbar.addEventListener('click', procesarLetra);
inputLetra.addEventListener('keydown', e => { if (e.key === 'Enter') procesarLetra(); });
btnReiniciar.addEventListener('click', iniciarJuego);

iniciarJuego();
