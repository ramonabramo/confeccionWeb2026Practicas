/**
 * ====================================================================
 * JUEGO DEL AHORCADO - VERSIÓN 1: BÁSICA E IMPERATIVA
 * ====================================================================
 * 
 * Enfoque Pedagógico:
 * - Adecuada para alumnos que inician en JavaScript.
 * - Uso de variables globales simples, bucles tradicionales 'for' y 'forEach'.
 * - Manipulación directa del DOM (getElementById, textContent, classList).
 * - Entrada de datos mediante <input> de texto tradicional.
 * 
 * Autor: Ramón Abramo
 * Curso: Confección y Publicación de Páginas Web 2026
 * ====================================================================
 */

/* ====================================================================
 * HITO 1: BANCO DE PALABRAS Y VARIABLES DE ESTADO
 * ==================================================================== */

// Lista fija de palabras para el juego (en mayúsculas)
const PALABRAS = [
  'JAVASCRIPT',
  'PROGRAMACION',
  'VARIABLE',
  'FUNCION',
  'ARRAY',
  'OBJETO',
  'PANTALLA',
  'CONDICIONAL',
  'BUCLE',
  'EVENTO'
];

// Número máximo de fallos permitidos antes de perder
const MAX_FALLOS = 6;

// Variables globales que definen el estado de la partida
let palabraSecreta = '';        // La palabra que el jugador debe adivinar (ej: "JAVASCRIPT")
let letrasAdivinadas = [];      // Array con las letras acertadas y guiones (ej: ['J', '_', 'V', '_', ...])
let letrasUsadas = [];          // Registro de letras ya intentadas por el jugador
let fallos = 0;                 // Contador de fallos cometidos
let juegoTerminado = false;     // Bandera de control para saber si la partida terminó

/* ====================================================================
 * HITO 2: SELECCIÓN DE ELEMENTOS DEL DOM
 * ==================================================================== */

const palabraDisplay = document.getElementById('palabra-display');
const inputLetra = document.getElementById('input-letra');
const btnProbar = document.getElementById('btn-probar');
const letrasUsadasDisplay = document.getElementById('letras-usadas-display');
const vidasRestantes = document.getElementById('vidas-restantes');
const mensajeEstado = document.getElementById('mensaje-estado');
const btnReiniciar = document.getElementById('btn-reiniciar');

// Partes del cuerpo del ahorcado en orden estricto de fallo (1 a 6)
const partesAhorcado = [
  document.getElementById('parte-cabeza'),     // Fallo 1
  document.getElementById('parte-cuerpo'),     // Fallo 2
  document.getElementById('parte-brazo-izq'),  // Fallo 3
  document.getElementById('parte-brazo-der'),  // Fallo 4
  document.getElementById('parte-pierna-izq'), // Fallo 5
  document.getElementById('parte-pierna-der')  // Fallo 6
];

// Elemento visual extra: ojos en cruz al perder
const caraDerrota = document.getElementById('parte-cara-derrota');

/* ====================================================================
 * HITO 3: INICIALIZACIÓN Y REINICIO DEL JUEGO
 * ==================================================================== */

/**
 * Prepara una nueva partida:
 * 1. Elige una palabra al azar.
 * 2. Rellena el array de adivinadas con guiones '_'.
 * 3. Restablece contadores, mensajes y el dibujo del ahorcado.
 */
function iniciarJuego() {
  // 1. Seleccionar palabra aleatoria
  const indiceAleatorio = Math.floor(Math.random() * PALABRAS.length);
  palabraSecreta = PALABRAS[indiceAleatorio];

  // 2. Crear array de guiones con la misma longitud que la palabra
  letrasAdivinadas = [];
  for (let i = 0; i < palabraSecreta.length; i++) {
    letrasAdivinadas.push('_');
  }

  // 3. Resetear variables de control
  letrasUsadas = [];
  fallos = 0;
  juegoTerminado = false;

  // 4. Ocultar todas las partes del ahorcado
  partesAhorcado.forEach(parte => {
    parte.classList.remove('visible');
  });
  caraDerrota.classList.remove('visible');

  // 5. Habilitar controles y limpiar campo de texto
  inputLetra.disabled = false;
  btnProbar.disabled = false;
  inputLetra.value = '';
  inputLetra.focus();

  // 6. Actualizar la interfaz
  actualizarPantalla();
  mostrarMensaje('¡Nueva partida iniciada! Escribe una letra y pulsa Probar.', 'normal');
}

/* ====================================================================
 * HITO 4: COMPROBACIÓN Y VALIDACIÓN DE LA LETRA
 * ==================================================================== */

/**
 * Lee la letra introducida, la valida y actualiza la partida.
 */
function procesarLetra() {
  // Si la partida ya terminó, no permitimos más jugadas
  if (juegoTerminado) return;

  // 1. Obtener la letra escrita y convertirla a mayúsculas
  const letra = inputLetra.value.trim().toUpperCase();

  // Limpiar el campo y mantener el foco
  inputLetra.value = '';
  inputLetra.focus();

  // 2. Validaciones básicas
  if (letra === '') {
    mostrarMensaje('Por favor, escribe una letra antes de comprobar.', 'aviso');
    return;
  }

  // Comprobar que sea una letra de la A a la Z (o Ñ)
  const esLetraValida = /^[A-ZÑ]$/.test(letra);
  if (!esLetraValida) {
    mostrarMensaje('Solo se permiten letras válidas (A-Z).', 'aviso');
    return;
  }

  // Comprobar si ya fue usada anteriormente
  if (letrasUsadas.includes(letra)) {
    mostrarMensaje(`La letra "${letra}" ya fue probada anteriormente. Elige otra.`, 'aviso');
    return;
  }

  // 3. Registrar la letra como usada
  letrasUsadas.push(letra);

  // 4. Comprobar si la letra forma parte de la palabra secreta
  if (palabraSecreta.includes(letra)) {
    // ACIERTO: Recorrer la palabra y destapar todas las apariciones de la letra
    for (let i = 0; i < palabraSecreta.length; i++) {
      if (palabraSecreta[i] === letra) {
        letrasAdivinadas[i] = letra;
      }
    }
    mostrarMensaje(`¡Bien hecho! La letra "${letra}" está en la palabra.`, 'exito');
  } else {
    // FALLO: Incrementar fallos y dibujar la siguiente pieza
    fallos++;
    dibujarSiguienteParte(fallos);
    mostrarMensaje(`¡Fallaste! La letra "${letra}" no está en la palabra.`, 'error');
  }

  // 5. Actualizar interfaz y verificar condiciones de fin de partida
  actualizarPantalla();
  verificarFinJuego();
}

/* ====================================================================
 * HITO 5: ACTUALIZACIÓN VISUAL Y DIBUJO DEL AHORCADO
 * ==================================================================== */

/**
 * Refresca los textos del DOM (palabra con guiones, vidas y letras usadas)
 */
function actualizarPantalla() {
  // Mostrar la palabra con espacios entre guiones para mayor legibilidad
  palabraDisplay.textContent = letrasAdivinadas.join(' ');

  // Mostrar vidas restantes
  const vidas = MAX_FALLOS - fallos;
  vidasRestantes.textContent = vidas;

  if (vidas <= 2) {
    vidasRestantes.classList.add('peligro');
  } else {
    vidasRestantes.classList.remove('peligro');
  }

  // Mostrar lista de letras usadas
  if (letrasUsadas.length === 0) {
    letrasUsadasDisplay.textContent = 'Ninguna aún';
  } else {
    letrasUsadasDisplay.textContent = letrasUsadas.join(', ');
  }
}

/**
 * Muestra visualmente la parte correspondiente del muñeco ahorcado
 * @param {number} numeroFallo Número de fallo actual (1 a 6)
 */
function dibujarSiguienteParte(numeroFallo) {
  const indice = numeroFallo - 1;
  if (indice >= 0 && indice < partesAhorcado.length) {
    partesAhorcado[indice].classList.add('visible');
  }
}

/**
 * Muestra un mensaje en la caja de estado con estilo tipográfico acorde
 * @param {string} texto Mensaje a mostrar
 * @param {'normal'|'exito'|'error'|'aviso'} tipo Tipo de alerta
 */
function mostrarMensaje(texto, tipo = 'normal') {
  mensajeEstado.textContent = texto;
  mensajeEstado.className = 'mensaje-alerta'; // Resetear clases anteriores
  if (tipo !== 'normal') {
    mensajeEstado.classList.add(tipo);
  }
}

/* ====================================================================
 * HITO 6: VERIFICACIÓN DE FIN DE PARTIDA (VICTORIA O DERROTA)
 * ==================================================================== */

function verificarFinJuego() {
  // Condición 1: VICTORIA (ya no queda ningún guion bajo en letrasAdivinadas)
  if (!letrasAdivinadas.includes('_')) {
    juegoTerminado = true;
    mostrarMensaje(`🎉 ¡FELICIDADES! ¡Has adivinado la palabra "${palabraSecreta}" con éxito!`, 'exito');
    finalizarPartida();
    return;
  }

  // Condición 2: DERROTA (se han alcanzado los fallos máximos)
  if (fallos >= MAX_FALLOS) {
    juegoTerminado = true;
    // Mostrar cara de derrota en el muñeco
    caraDerrota.classList.add('visible');
    // Revelar la palabra secreta completa
    palabraDisplay.textContent = palabraSecreta.split('').join(' ');
    mostrarMensaje(`💀 ¡GAME OVER! Has agotado todas tus vidas. La palabra era: "${palabraSecreta}".`, 'error');
    finalizarPartida();
  }
}

/**
 * Deshabilita los inputs para evitar que el usuario siga jugando tras terminar
 */
function finalizarPartida() {
  inputLetra.disabled = true;
  btnProbar.disabled = true;
  btnReiniciar.focus();
}

/* ====================================================================
 * ESCUCHADORES DE EVENTOS
 * ==================================================================== */

// Clic en el botón "Probar Letra"
btnProbar.addEventListener('click', procesarLetra);

// Presionar tecla 'Enter' en el campo de texto
inputLetra.addEventListener('keydown', function (evento) {
  if (evento.key === 'Enter') {
    procesarLetra();
  }
});

// Clic en el botón "Nueva Palabra"
btnReiniciar.addEventListener('click', iniciarJuego);

// Iniciar la primera partida automáticamente al cargar el script
iniciarJuego();
