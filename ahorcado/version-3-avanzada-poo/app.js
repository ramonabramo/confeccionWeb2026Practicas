/**
 * ====================================================================
 * JUEGO DEL AHORCADO - VERSIÓN 3: ARQUITECTURA POO, AUDIO Y PERSISTENCIA
 * ====================================================================
 * 
 * Enfoque Pedagógico:
 * - Nivel Avanzado y Profesional de JavaScript.
 * - Programación Orientada a Objetos (Clases ES6: Engine, UI, Audio, Stats).
 * - Sintetizador de efectos sonoros mediante Web Audio API nativo (100% offline).
 * - Partículas de confeti en <canvas> para celebración de victorias.
 * - Almacenamiento persistente en localStorage para estadísticas del usuario.
 * - Selector de dificultades adaptativo (Fácil: 8 vidas + 2 letras, Normal: 6 vidas, Difícil: 5 vidas + 45s).
 * 
 * Autor: Ramón Abramo
 * Curso: Confección y Publicación de Páginas Web 2026
 * ====================================================================
 */

/* ====================================================================
 * 1. BANCO DE DATOS PROFESIONAL
 * ==================================================================== */

const BANCO_DATOS = [
  { palabra: 'JAVASCRIPT', categoria: 'Tecnología Web', pista: 'Lenguaje dinámico de la web para lógica e interactividad.' },
  { palabra: 'TYPESCRIPT', categoria: 'Tecnología Web', pista: 'Superset de JavaScript con tipado estático opcional.' },
  { palabra: 'PROGRAMACION', categoria: 'Informática', pista: 'Proceso de diseñar, codificar y depurar software.' },
  { palabra: 'ARQUITECTURA', categoria: 'Ingeniería', pista: 'Estructura organizativa de los componentes de un sistema.' },
  { palabra: 'ALGORITMO', categoria: 'Ciencia Computacional', pista: 'Secuencia finita y no ambigua de instrucciones para resolver un problema.' },
  { palabra: 'POLIMORFISMO', categoria: 'POO Avanzada', pista: 'Capacidad de objetos de distintas clases de responder a un mismo método.' },
  { palabra: 'ENCAPSULAMIENTO', categoria: 'POO Avanzada', pista: 'Ocultar los detalles de implementación interna de un objeto.' },
  { palabra: 'ASINCRONIA', categoria: 'Patrones JS', pista: 'Ejecución no bloqueante mediante promesas o async/await.' },
  { palabra: 'PERSISTENCIA', categoria: 'Bases de Datos', pista: 'Conservar información entre sesiones mediante almacenamiento local.' },
  { palabra: 'RESPONSIVE', categoria: 'Diseño Web', pista: 'Diseño elástico que se adapta a cualquier tamaño de pantalla.' }
];

const ALFABETO = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');

/* ====================================================================
 * 2. MÓDULO DE AUDIO: SINTETIZADOR WEB AUDIO API
 * ==================================================================== */

class SoundSynthesizer {
  constructor() {
    this.audioCtx = null;
    this.muted = localStorage.getItem('ahorcado_muted') === 'true';
  }

  initContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem('ahorcado_muted', String(this.muted));
    return this.muted;
  }

  isMuted() {
    return this.muted;
  }

  playTone(frequency, type, duration, startTime = 0, gainLevel = 0.15) {
    if (this.muted) return;
    try {
      this.initContext();
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, this.audioCtx.currentTime + startTime);

      gain.gain.setValueAtTime(gainLevel, this.audioCtx.currentTime + startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + startTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(this.audioCtx.currentTime + startTime);
      osc.stop(this.audioCtx.currentTime + startTime + duration);
    } catch (e) {
      // Ignorar fallos de política de audio del navegador
    }
  }

  playSuccess() {
    // Sonido armónico ascendente
    this.playTone(523.25, 'sine', 0.1, 0, 0.12);     // Do5
    this.playTone(659.25, 'sine', 0.15, 0.08, 0.12); // Mi5
  }

  playError() {
    // Tono grave descendente
    this.playTone(220, 'sawtooth', 0.18, 0, 0.1);
    this.playTone(180, 'sawtooth', 0.22, 0.08, 0.1);
  }

  playVictory() {
    // Fanfarria triunfal
    const notas = [523.25, 659.25, 783.99, 1046.50];
    notas.forEach((nota, idx) => {
      this.playTone(nota, 'triangle', 0.25, idx * 0.1, 0.15);
    });
  }

  playDefeat() {
    // Escala descendente dramática
    const notas = [392.00, 349.23, 311.13, 261.63];
    notas.forEach((nota, idx) => {
      this.playTone(nota, 'sawtooth', 0.35, idx * 0.12, 0.12);
    });
  }
}

/* ====================================================================
 * 3. MÓDULO DE PERSISTENCIA: ESTADÍSTICAS LOCALSTORAGE
 * ==================================================================== */

class StatsRepository {
  constructor() {
    this.STORAGE_KEY = 'ahorcado_stats_pro_2026';
    this.stats = this.load();
  }

  load() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {
      // Si falla JSON, retornar valores por defecto
    }
    return {
      partidas: 0,
      victorias: 0,
      derrotas: 0,
      rachaActual: 0,
      mejorRacha: 0
    };
  }

  save() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.stats));
    } catch (e) {
      // Silenciar errores de almacenamiento
    }
  }

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

  reset() {
    this.stats = {
      partidas: 0,
      victorias: 0,
      derrotas: 0,
      rachaActual: 0,
      mejorRacha: 0
    };
    this.save();
  }

  get winPercentage() {
    if (this.stats.partidas === 0) return 0;
    return Math.round((this.stats.victorias / this.stats.partidas) * 100);
  }
}

/* ====================================================================
 * 4. MÓDULO DE ANIMACIÓN: CONFETI CANVAS
 * ==================================================================== */

class ConfettiAnimation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.particles = [];
    this.animating = false;
    this.colors = ['#38bdf8', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

    window.addEventListener('resize', () => this.resizeCanvas());
    this.resizeCanvas();
  }

  resizeCanvas() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  start(count = 120) {
    if (!this.canvas || !this.ctx) return;
    this.resizeCanvas();
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * -this.canvas.height,
        size: Math.random() * 8 + 4,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        speedX: Math.random() * 4 - 2,
        speedY: Math.random() * 3 + 2,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 6 - 3
      });
    }

    this.animating = true;
    this.animate();
  }

  stop() {
    this.animating = false;
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  animate() {
    if (!this.animating || !this.ctx || !this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let activeParticles = 0;
    this.particles.forEach(p => {
      p.y += p.speedY;
      p.x += Math.sin(p.y * 0.05) + p.speedX;
      p.rotation += p.rotationSpeed;

      if (p.y < this.canvas.height + 20) {
        activeParticles++;
        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.fillStyle = p.color;
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        this.ctx.restore();
      }
    });

    if (activeParticles > 0) {
      requestAnimationFrame(() => this.animate());
    } else {
      this.stop();
    }
  }
}

/* ====================================================================
 * 5. MOTOR LÓGICO DEL JUEGO (GAME ENGINE)
 * ==================================================================== */

class AhorcadoEngine {
  constructor() {
    this.dificultad = 'medio';
    this.configDificultades = {
      facil: { maxFallos: 8, tiempoMax: null, pistasGratis: true, revelarIniciales: 2 },
      medio: { maxFallos: 6, tiempoMax: null, pistasGratis: true, revelarIniciales: 0 },
      dificil: { maxFallos: 5, tiempoMax: 45, pistasGratis: false, revelarIniciales: 0 }
    };

    this.itemActual = null;
    this.letrasAdivinadas = [];
    this.letrasUsadas = new Set();
    this.fallos = 0;
    this.tiempoRestante = 0;
    this.juegoTerminado = false;
  }

  setDificultad(nivel) {
    if (this.configDificultades[nivel]) {
      this.dificultad = nivel;
    }
  }

  getConfig() {
    return this.configDificultades[this.dificultad];
  }

  iniciarNuevaPartida() {
    const config = this.getConfig();
    const indice = Math.floor(Math.random() * BANCO_DATOS.length);
    this.itemActual = BANCO_DATOS[indice];

    this.letrasAdivinadas = Array(this.itemActual.palabra.length).fill('');
    this.letrasUsadas.clear();
    this.fallos = 0;
    this.juegoTerminado = false;
    this.tiempoRestante = config.tiempoMax || 0;

    // En nivel fácil, desvelar automáticamente algunas letras
    if (config.revelarIniciales > 0) {
      this.revelarLetrasIniciales(config.revelarIniciales);
    }

    return {
      palabra: this.itemActual.palabra,
      categoria: this.itemActual.categoria,
      pista: this.itemActual.pista,
      maxFallos: config.maxFallos,
      tiempoMax: config.tiempoMax
    };
  }

  revelarLetrasIniciales(cantidad) {
    const palabra = this.itemActual.palabra;
    const letrasUnicas = [...new Set(palabra.split(''))];
    for (let i = 0; i < cantidad && i < letrasUnicas.length; i++) {
      const letra = letrasUnicas[i];
      this.letrasUsadas.add(letra);
      for (let j = 0; j < palabra.length; j++) {
        if (palabra[j] === letra) {
          this.letrasAdivinadas[j] = letra;
        }
      }
    }
  }

  probarLetra(letra) {
    if (this.juegoTerminado || this.letrasUsadas.has(letra)) return null;

    this.letrasUsadas.add(letra);
    const acierto = this.itemActual.palabra.includes(letra);

    if (acierto) {
      for (let i = 0; i < this.itemActual.palabra.length; i++) {
        if (this.itemActual.palabra[i] === letra) {
          this.letrasAdivinadas[i] = letra;
        }
      }
    } else {
      this.fallos++;
    }

    const victoria = !this.letrasAdivinadas.includes('');
    const derrota = this.fallos >= this.getConfig().maxFallos;

    if (victoria || derrota) {
      this.juegoTerminado = true;
    }

    return {
      letra,
      acierto,
      fallos: this.fallos,
      maxFallos: this.getConfig().maxFallos,
      victoria,
      derrota,
      palabraSecreta: this.itemActual.palabra
    };
  }

  tiempoAgotado() {
    this.juegoTerminado = true;
    return {
      victoria: false,
      derrota: true,
      palabraSecreta: this.itemActual.palabra
    };
  }
}

/* ====================================================================
 * 6. CONTROLADOR DE INTERFAZ DE USUARIO (UI CONTROLLER)
 * ==================================================================== */

class AhorcadoUI {
  constructor() {
    this.engine = new AhorcadoEngine();
    this.audio = new SoundSynthesizer();
    this.statsRepo = new StatsRepository();
    this.confetti = new ConfettiAnimation('canvas-confeti');
    this.timerInterval = null;
    this.tiempoTranscurridoPartida = 0;

    this.cacheDOMElements();
    this.bindEvents();
    this.iniciar();
  }

  cacheDOMElements() {
    this.dom = {
      selectDificultad: document.getElementById('select-dificultad'),
      btnAudio: document.getElementById('btn-audio'),
      iconoAudio: document.getElementById('icono-audio'),
      btnStats: document.getElementById('btn-stats'),
      categoriaDisplay: document.getElementById('categoria-display'),
      btnPista: document.getElementById('btn-pista'),
      cajaPista: document.getElementById('caja-pista'),
      textoPista: document.getElementById('texto-pista'),
      cajaTemporizador: document.getElementById('caja-temporizador'),
      tiempoTexto: document.getElementById('tiempo-texto'),
      barraTiempoFill: document.getElementById('barra-tiempo-fill'),
      palabraDisplay: document.getElementById('palabra-display'),
      tecladoVirtual: document.getElementById('teclado-virtual'),
      vidasNumero: document.getElementById('vidas-numero'),
      barraSaludFill: document.getElementById('barra-salud-fill'),
      mensajeEstado: document.getElementById('mensaje-estado'),
      btnNuevaPartida: document.getElementById('btn-nueva-partida'),
      // Modales
      modalFin: document.getElementById('modal-fin'),
      modalIcono: document.getElementById('modal-icono'),
      modalTitulo: document.getElementById('modal-titulo'),
      modalDescripcion: document.getElementById('modal-descripcion'),
      modalStatRacha: document.getElementById('modal-stat-racha'),
      modalStatTiempo: document.getElementById('modal-stat-tiempo'),
      modalStatVidas: document.getElementById('modal-stat-vidas'),
      modalBtnJugar: document.getElementById('modal-btn-jugar'),
      modalEstadisticas: document.getElementById('modal-estadisticas'),
      btnCerrarStats: document.getElementById('btn-cerrar-stats'),
      btnResetearStats: document.getElementById('btn-resetear-stats'),
      statPartidas: document.getElementById('stat-partidas'),
      statPorcentaje: document.getElementById('stat-porcentaje'),
      statRachaActual: document.getElementById('stat-racha-actual'),
      statMejorRacha: document.getElementById('stat-mejor-racha'),
      // Partes SVG
      partesSvg: [
        document.getElementById('parte-cabeza'),
        document.getElementById('parte-cuerpo'),
        document.getElementById('parte-brazo-izq'),
        document.getElementById('parte-brazo-der'),
        document.getElementById('parte-pierna-izq'),
        document.getElementById('parte-pierna-der'),
        document.getElementById('parte-mano-izq'),
        document.getElementById('parte-mano-der')
      ],
      caraDerrota: document.getElementById('parte-cara-derrota')
    };
  }

  bindEvents() {
    // Teclado virtual (delegación de eventos)
    this.dom.tecladoVirtual.addEventListener('click', e => {
      const btn = e.target.closest('.tecla');
      if (btn && !btn.disabled) this.manejarJugada(btn.dataset.letra);
    });

    // Teclado físico
    window.addEventListener('keydown', e => {
      if (this.engine.juegoTerminado || e.ctrlKey || e.altKey || e.metaKey) return;
      const letra = e.key.toUpperCase();
      if (ALFABETO.includes(letra)) this.manejarJugada(letra);
    });

    // Selector dificultad
    this.dom.selectDificultad.addEventListener('change', e => {
      this.engine.setDificultad(e.target.value);
      this.iniciar();
    });

    // Control de audio
    this.dom.btnAudio.addEventListener('click', () => {
      const mute = this.audio.toggleMute();
      this.dom.iconoAudio.textContent = mute ? '🔇' : '🔊';
    });

    // Pistas
    this.dom.btnPista.addEventListener('click', () => this.mostrarPista());

    // Botones de juego
    this.dom.btnNuevaPartida.addEventListener('click', () => this.iniciar());
    this.dom.modalBtnJugar.addEventListener('click', () => {
      this.dom.modalFin.classList.add('oculta');
      this.confetti.stop();
      this.iniciar();
    });

    // Estadísticas
    this.dom.btnStats.addEventListener('click', () => this.abrirStats());
    this.dom.btnCerrarStats.addEventListener('click', () => this.dom.modalEstadisticas.classList.add('oculta'));
    this.dom.btnResetearStats.addEventListener('click', () => {
      this.statsRepo.reset();
      this.actualizarDOMStats();
    });

    // Sincronizar icono de audio inicial
    this.dom.iconoAudio.textContent = this.audio.isMuted() ? '🔇' : '🔊';
  }

  iniciar() {
    clearInterval(this.timerInterval);
    this.confetti.stop();
    this.dom.modalFin.classList.add('oculta');

    const info = this.engine.iniciarNuevaPartida();
    this.tiempoTranscurridoPartida = 0;

    // Reset partes SVG
    this.dom.partesSvg.forEach(p => { if (p) p.classList.remove('visible'); });
    this.dom.caraDerrota.classList.remove('visible');

    // Metadatos y Pista
    this.dom.categoriaDisplay.textContent = info.categoria;
    this.dom.cajaPista.classList.add('oculta');
    this.dom.textoPista.textContent = info.pista;
    this.dom.btnPista.disabled = false;
    this.dom.btnPista.textContent = '💡 Pedir Pista';

    // Renderizar componentes
    this.renderizarTeclado();
    this.renderizarCasillas();
    this.actualizarSalud();

    // Temporizador si aplica
    if (info.tiempoMax) {
      this.dom.cajaTemporizador.classList.remove('oculta');
      this.dom.tiempoTexto.textContent = `${info.tiempoMax}s`;
      this.dom.barraTiempoFill.style.width = '100%';
      this.iniciarTemporizador(info.tiempoMax);
    } else {
      this.dom.cajaTemporizador.classList.add('oculta');
    }

    this.mostrarMensaje('¡Nueva partida iniciada! Elige una letra.', 'normal');
  }

  iniciarTemporizador(segundosMax) {
    let restantes = segundosMax;
    this.timerInterval = setInterval(() => {
      restantes--;
      this.tiempoTranscurridoPartida++;
      this.dom.tiempoTexto.textContent = `${restantes}s`;

      const porcentaje = (restantes / segundosMax) * 100;
      this.dom.barraTiempoFill.style.width = `${porcentaje}%`;

      if (restantes <= 0) {
        clearInterval(this.timerInterval);
        const resultado = this.engine.tiempoAgotado();
        this.finalizarPartida(resultado, '¡Tiempo agotado!');
      }
    }, 1000);
  }

  renderizarTeclado() {
    this.dom.tecladoVirtual.innerHTML = '';
    ALFABETO.forEach(letra => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'tecla';
      btn.textContent = letra;
      btn.dataset.letra = letra;

      // Si ya fue revelada al inicio (modo fácil)
      if (this.engine.letrasUsadas.has(letra)) {
        btn.disabled = true;
        btn.classList.add('acierto');
      }

      this.dom.tecladoVirtual.appendChild(btn);
    });
  }

  renderizarCasillas() {
    this.dom.palabraDisplay.innerHTML = '';
    for (let i = 0; i < this.engine.itemActual.palabra.length; i++) {
      const casilla = document.createElement('span');
      casilla.className = 'casilla-letra';
      const letra = this.engine.letrasAdivinadas[i];
      if (letra) {
        casilla.textContent = letra;
        casilla.classList.add('revelada');
      }
      this.dom.palabraDisplay.appendChild(casilla);
    }
  }

  manejarJugada(letra) {
    const resultado = this.engine.probarLetra(letra);
    if (!resultado) return;

    const btn = this.dom.tecladoVirtual.querySelector(`[data-letra="${letra}"]`);
    if (btn) {
      btn.disabled = true;
      btn.classList.add(resultado.acierto ? 'acierto' : 'fallo');
    }

    if (resultado.acierto) {
      this.audio.playSuccess();
      this.renderizarCasillas();
      this.mostrarMensaje(`¡Bien jugado! La letra "${letra}" está en la palabra.`, 'exito');
    } else {
      this.audio.playError();
      const indiceSvg = resultado.fallos - 1;
      if (this.dom.partesSvg[indiceSvg]) {
        this.dom.partesSvg[indiceSvg].classList.add('visible');
      }
      this.actualizarSalud();
      this.mostrarMensaje(`¡Error! La letra "${letra}" no coincide.`, 'error');
    }

    if (resultado.victoria || resultado.derrota) {
      this.finalizarPartida(resultado);
    }
  }

  actualizarSalud() {
    const config = this.engine.getConfig();
    const vidas = config.maxFallos - this.engine.fallos;
    this.dom.vidasNumero.textContent = `${vidas} / ${config.maxFallos}`;

    const porcentaje = Math.max(0, (vidas / config.maxFallos) * 100);
    this.dom.barraSaludFill.style.width = `${porcentaje}%`;

    if (porcentaje <= 25) {
      this.dom.barraSaludFill.style.backgroundColor = '#ef4444';
    } else if (porcentaje <= 50) {
      this.dom.barraSaludFill.style.backgroundColor = '#f59e0b';
    } else {
      this.dom.barraSaludFill.style.backgroundColor = '#10b981';
    }
  }

  mostrarPista() {
    this.dom.cajaPista.classList.remove('oculta');
    this.dom.btnPista.disabled = true;
    this.dom.btnPista.textContent = '💡 Pista Revelada';
    this.mostrarMensaje('Pista activa. ¡Aprovecha la información!', 'aviso');
  }

  mostrarMensaje(texto, tipo = 'normal') {
    this.dom.mensajeEstado.textContent = texto;
    this.dom.mensajeEstado.className = 'mensaje-alerta' + (tipo !== 'normal' ? ' ' + tipo : '');
  }

  finalizarPartida(resultado, motivoExtra = '') {
    clearInterval(this.timerInterval);

    // Deshabilitar todas las teclas
    this.dom.tecladoVirtual.querySelectorAll('.tecla').forEach(t => t.disabled = true);
    this.dom.btnPista.disabled = true;

    // Registrar en estadísticas
    this.statsRepo.recordGame(resultado.victoria);

    if (resultado.victoria) {
      this.audio.playVictory();
      this.confetti.start();

      this.dom.modalIcono.textContent = '🏆';
      this.dom.modalTitulo.textContent = '¡Victoria Absoluta!';
      this.dom.modalTitulo.style.color = '#38bdf8';
      this.dom.modalDescripcion.textContent = `Has descubierto "${resultado.palabraSecreta}" con gran maestría.`;
    } else {
      this.audio.playDefeat();
      this.dom.caraDerrota.classList.add('visible');

      // Revelar casillas faltantes en rojo
      const casillas = this.dom.palabraDisplay.querySelectorAll('.casilla-letra');
      for (let i = 0; i < resultado.palabraSecreta.length; i++) {
        casillas[i].textContent = resultado.palabraSecreta[i];
        if (!this.engine.letrasAdivinadas[i]) {
          casillas[i].style.color = '#f87171';
        }
      }

      this.dom.modalIcono.textContent = '💀';
      this.dom.modalTitulo.textContent = 'Fin de la Partida';
      this.dom.modalTitulo.style.color = '#ef4444';
      this.dom.modalDescripcion.textContent = `${motivoExtra} La palabra secreta era: "${resultado.palabraSecreta}".`;
    }

    // Actualizar métricas del modal
    this.dom.modalStatRacha.textContent = this.statsRepo.stats.rachaActual;
    this.dom.modalStatTiempo.textContent = `${this.tiempoTranscurridoPartida}s`;
    this.dom.modalStatVidas.textContent = Math.max(0, this.engine.getConfig().maxFallos - this.engine.fallos);

    setTimeout(() => {
      this.dom.modalFin.classList.remove('oculta');
    }, 400);
  }

  abrirStats() {
    this.actualizarDOMStats();
    this.dom.modalEstadisticas.classList.remove('oculta');
  }

  actualizarDOMStats() {
    this.dom.statPartidas.textContent = this.statsRepo.stats.partidas;
    this.dom.statPorcentaje.textContent = `${this.statsRepo.winPercentage}%`;
    this.dom.statRachaActual.textContent = this.statsRepo.stats.rachaActual;
    this.dom.statMejorRacha.textContent = this.statsRepo.stats.mejorRacha;
  }
}

// Inicialización de la aplicación al cargar el script
document.addEventListener('DOMContentLoaded', () => {
  new AhorcadoUI();
});
