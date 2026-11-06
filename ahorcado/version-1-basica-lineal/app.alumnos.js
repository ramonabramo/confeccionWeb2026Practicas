/**
 * ====================================================================
 * JUEGO DEL AHORCADO - PLANTILLA PARA EL ALUMNADO (VERSIÓN 1)
 * ====================================================================
 * 
 * Instrucciones:
 * Completa los bloques marcados con TODO siguiendo las explicaciones
 * de clase y la guía paso a paso proporcionada.
 * 
 * Alumno/a: ___________________________________________________________
 * Fecha:    ___________________________________________________________
 * ====================================================================
 */

/* ====================================================================
 * HITO 1: BANCO DE PALABRAS Y VARIABLES DE ESTADO
 * ==================================================================== */

// TODO 1.1: Declara un array constante llamado PALABRAS con al menos 8 palabras en mayúsculas
const PALABRAS = [
  'JAVASCRIPT',
  'PROGRAMACION',
  'VARIABLE',
  'FUNCION',
  'ARRAY',
  'OBJETO',
  'PANTALLA',
  'BUCLE'
];

// TODO 1.2: Define el límite máximo de fallos permitidos (6)
const MAX_FALLOS = 6;

// Variables de estado (se modificarán a lo largo del juego)
let palabraSecreta = '';        // Almacenará la palabra elegida
let letrasAdivinadas = [];      // Array con guiones y letras acertadas
let letrasUsadas = [];          // Array con las letras ya probadas
let fallos = 0;                 // Contador de errores
let juegoTerminado = false;     // ¿Ha concluido la partida?

/* ====================================================================
 * HITO 2: SELECCIÓN DE ELEMENTOS DEL DOM
 * ==================================================================== */

// TODO 2.1: Selecciona los elementos HTML usando document.getElementById
const palabraDisplay = document.getElementById('palabra-display');
const inputLetra = document.getElementById('input-letra');
const btnProbar = document.getElementById('btn-probar');
const letrasUsadasDisplay = document.getElementById('letras-usadas-display');
const vidasRestantes = document.getElementById('vidas-restantes');
const mensajeEstado = document.getElementById('mensaje-estado');
const btnReiniciar = document.getElementById('btn-reiniciar');

// TODO 2.2: Agrupa en un array las 6 partes del ahorcado en orden de aparición
const partesAhorcado = [
  document.getElementById('parte-cabeza'),     // 1
  document.getElementById('parte-cuerpo'),     // 2
  document.getElementById('parte-brazo-izq'),  // 3
  document.getElementById('parte-brazo-der'),  // 4
  document.getElementById('parte-pierna-izq'), // 5
  document.getElementById('parte-pierna-der')  // 6
];

const caraDerrota = document.getElementById('parte-cara-derrota');

/* ====================================================================
 * HITO 3: INICIAR Y RESETEAR LA PARTIDA
 * ==================================================================== */

function iniciarJuego() {
  // TODO 3.1: Selecciona un índice aleatorio usando Math.floor y Math.random
  // const indice = ...
  // palabraSecreta = PALABRAS[indice];

  // TODO 3.2: Inicializa el array 'letrasAdivinadas' con tantos guiones '_' como letras tenga palabraSecreta
  // letrasAdivinadas = [];
  // (Pista: usa un bucle for que vaya de 0 a palabraSecreta.length)

  // TODO 3.3: Reinicia las variables: letrasUsadas vacío, fallos a 0, juegoTerminado a false

  // TODO 3.4: Oculta todas las partes del ahorcado quitándoles la clase 'visible'

  // TODO 3.5: Habilita los inputs, limpia el valor de inputLetra y pon el foco en él

  // TODO 3.6: Llama a actualizarPantalla() y muestra un mensaje de bienvenida con mostrarMensaje()
}

/* ====================================================================
 * HITO 4: PROCESAR Y COMPROBAR LA LETRA
 * ==================================================================== */

function procesarLetra() {
  if (juegoTerminado) return;

  // TODO 4.1: Lee la letra del input, quita espacios (.trim()) y conviértela a mayúsculas (.toUpperCase())
  const letra = inputLetra.value.trim().toUpperCase();
  inputLetra.value = '';
  inputLetra.focus();

  // TODO 4.2: Valida que la letra no esté vacía ni repetida en letrasUsadas

  // TODO 4.3: Añade la letra al array letrasUsadas

  // TODO 4.4: Comprueba si palabraSecreta incluye la letra (.includes)
  // SI acierta: recorre palabraSecreta con un bucle for; cuando coincida, asigna letrasAdivinadas[i] = letra
  // SI falla: incrementa la variable fallos y llama a dibujarSiguienteParte(fallos)

  // TODO 4.5: Llama a actualizarPantalla() y verificarFinJuego()
}

/* ====================================================================
 * HITO 5: ACTUALIZACIÓN VISUAL Y DIBUJO DEL AHORCADO
 * ==================================================================== */

function actualizarPantalla() {
  // TODO 5.1: Muestra las letras adivinadas separadas por espacios usando .join(' ')
  // palabraDisplay.textContent = ...

  // TODO 5.2: Calcula las vidas restantes (MAX_FALLOS - fallos) y actualízalas en vidasRestantes

  // TODO 5.3: Muestra la lista de letrasUsadas separadas por comas
}

function dibujarSiguienteParte(numeroFallo) {
  // TODO 5.4: Obtén la parte correspondiente en partesAhorcado (índice: numeroFallo - 1)
  // y agrégale la clase 'visible'
}

function mostrarMensaje(texto, tipo = 'normal') {
  mensajeEstado.textContent = texto;
  mensajeEstado.className = 'mensaje-alerta';
  if (tipo !== 'normal') {
    mensajeEstado.classList.add(tipo);
  }
}

/* ====================================================================
 * HITO 6: VERIFICAR CONDICIONES DE FIN DE PARTIDA
 * ==================================================================== */

function verificarFinJuego() {
  // TODO 6.1: Si letrasAdivinadas ya NO contiene ningún guion '_', ¡el jugador ha ganado!
  // Marca juegoTerminado = true, muestra mensaje de victoria y llama a finalizarPartida()

  // TODO 6.2: Si fallos >= MAX_FALLOS, ¡el jugador ha perdido!
  // Muestra la cara de derrota, revela la palabra entera y llama a finalizarPartida()
}

function finalizarPartida() {
  inputLetra.disabled = true;
  btnProbar.disabled = true;
}

/* ====================================================================
 * ESCUCHADORES DE EVENTOS
 * ==================================================================== */

// TODO 7.1: Añade el evento 'click' al botón btnProbar para llamar a procesarLetra
// btnProbar.addEventListener('click', ...);

// TODO 7.2: Añade el evento 'keydown' a inputLetra para que al pulsar 'Enter' llame a procesarLetra

// TODO 7.3: Añade el evento 'click' al botón btnReiniciar para llamar a iniciarJuego

// Iniciar la primera partida
iniciarJuego();
