/**
 * ====================================================================
 * JUEGO DEL AHORCADO - PLANTILLA PARA EL ALUMNADO (VERSIÓN 3)
 * ====================================================================
 * 
 * Enfoque: Arquitectura Orientada a Objetos (POO), Web Audio API y LocalStorage
 * 
 * Alumno/a: ___________________________________________________________
 * Fecha:    ___________________________________________________________
 * ====================================================================
 */

/* ====================================================================
 * BANCO DE DATOS
 * ==================================================================== */

const BANCO_DATOS = [
  { palabra: 'JAVASCRIPT', categoria: 'Tecnología Web', pista: 'Lenguaje dinámico de la web para interactividad.' },
  { palabra: 'TYPESCRIPT', categoria: 'Tecnología Web', pista: 'Superset de JavaScript con tipado estático opcional.' },
  { palabra: 'POLIMORFISMO', categoria: 'POO Avanzada', pista: 'Objetos distintos respondiendo al mismo método.' },
  { palabra: 'ENCAPSULAMIENTO', categoria: 'POO Avanzada', pista: 'Ocultar los detalles internos de un objeto.' }
];

const ALFABETO = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');

/* ====================================================================
 * CLASE 1: SINTETIZADOR WEB AUDIO API
 * ==================================================================== */

class SoundSynthesizer {
  constructor() {
    this.audioCtx = null;
    this.muted = localStorage.getItem('ahorcado_muted') === 'true';
  }

  // TODO 1.1: Inicializa AudioContext al primer clic del usuario
  initContext() {
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.audioCtx = new AudioCtx();
    }
  }

  // TODO 1.2: Alterna el estado de mute y guárdalo en localStorage
  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem('ahorcado_muted', String(this.muted));
    return this.muted;
  }

  // Emite un tono sintético con OscillatorNode y GainNode
  playTone(freq, type, duration) {
    if (this.muted) return;
    this.initContext();
    if (!this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
    gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start();
    osc.stop(this.audioCtx.currentTime + duration);
  }

  playSuccess() { this.playTone(587.33, 'sine', 0.15); }
  playError() { this.playTone(180, 'sawtooth', 0.2); }
}

/* ====================================================================
 * CLASE 2: GESTIÓN DE PERSISTENCIA (LOCALSTORAGE)
 * ==================================================================== */

class StatsRepository {
  constructor() {
    this.STORAGE_KEY = 'ahorcado_stats_pro_2026';
    this.stats = this.load();
  }

  // TODO 2.1: Carga las estadísticas desde localStorage o devuelve el objeto por defecto
  load() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {}
    return { partidas: 0, victorias: 0, derrotas: 0, rachaActual: 0, mejorRacha: 0 };
  }

  // TODO 2.2: Guarda el objeto this.stats en localStorage con JSON.stringify
  save() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.stats));
  }

  // TODO 2.3: Actualiza las estadísticas al terminar una partida
  recordGame(victory) {
    this.stats.partidas++;
    if (victory) {
      this.stats.victorias++;
      this.stats.rachaActual++;
      if (this.stats.rachaActual > this.stats.mejorRacha) {
        this.stats.mejorRacha = this.stats.rachaActual;
      }
    } else {
      this.stats.derrotas++;
      this.stats.rachaActual = 0;
    }
    this.save();
  }
}

/* ====================================================================
 * CLASE 3: MOTOR LÓGICO DEL JUEGO (ENGINE)
 * ==================================================================== */

class AhorcadoEngine {
  constructor() {
    this.dificultad = 'medio';
    this.configDificultades = {
      facil: { maxFallos: 8, pistasGratis: true },
      medio: { maxFallos: 6, pistasGratis: true },
      dificil: { maxFallos: 5, pistasGratis: false }
    };
    this.itemActual = null;
    this.letrasAdivinadas = [];
    this.letrasUsadas = new Set();
    this.fallos = 0;
    this.juegoTerminado = false;
  }

  // TODO 3.1: Inicia una nueva partida eligiendo una palabra al azar y reseteando estado
  iniciarNuevaPartida() {
    const indice = Math.floor(Math.random() * BANCO_DATOS.length);
    this.itemActual = BANCO_DATOS[indice];
    this.letrasAdivinadas = Array(this.itemActual.palabra.length).fill('');
    this.letrasUsadas.clear();
    this.fallos = 0;
    this.juegoTerminado = false;

    return this.itemActual;
  }

  // TODO 3.2: Comprueba la letra, suma fallos o actualiza letrasAdivinadas, y verifica victoria/derrota
  probarLetra(letra) {
    if (this.juegoTerminado || this.letrasUsadas.has(letra)) return null;

    this.letrasUsadas.add(letra);
    const acierto = this.itemActual.palabra.includes(letra);

    if (acierto) {
      for (let i = 0; i < this.itemActual.palabra.length; i++) {
        if (this.itemActual.palabra[i] === letra) this.letrasAdivinadas[i] = letra;
      }
    } else {
      this.fallos++;
    }

    const max = this.configDificultades[this.dificultad].maxFallos;
    const victoria = !this.letrasAdivinadas.includes('');
    const derrota = this.fallos >= max;

    if (victoria || derrota) this.juegoTerminado = true;

    return { letra, acierto, fallos: this.fallos, maxFallos: max, victoria, derrota, palabraSecreta: this.itemActual.palabra };
  }
}

/* ====================================================================
 * CLASE 4: CONTROLADOR DE INTERFAZ DE USUARIO (UI)
 * ==================================================================== */

class AhorcadoUI {
  constructor() {
    this.engine = new AhorcadoEngine();
    this.audio = new SoundSynthesizer();
    this.statsRepo = new StatsRepository();
    // Cache de elementos y enlaces de eventos...
  }

  // TODO 4.1: Conecta los eventos de clic y keydown con this.engine.probarLetra()
  // TODO 4.2: Actualiza la salud visual, casillas de letras y modales al finalizar
}

// Iniciar aplicación
document.addEventListener('DOMContentLoaded', () => new AhorcadoUI());
