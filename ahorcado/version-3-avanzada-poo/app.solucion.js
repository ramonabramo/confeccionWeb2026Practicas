const BANCO_DATOS = [
  { palabra: 'JAVASCRIPT', categoria: 'Tecnología Web', pista: 'Lenguaje dinámico de la web para interactividad.' },
  { palabra: 'TYPESCRIPT', categoria: 'Tecnología Web', pista: 'Superset de JavaScript con tipado estático.' },
  { palabra: 'PROGRAMACION', categoria: 'Informática', pista: 'Proceso de diseño y codificación de software.' },
  { palabra: 'ARQUITECTURA', categoria: 'Ingeniería', pista: 'Estructura organizativa de un sistema de software.' },
  { palabra: 'POLIMORFISMO', categoria: 'POO Avanzada', pista: 'Distintos objetos respondiendo a un método común.' }
];

const ALFABETO = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');

class SoundSynthesizer {
  constructor() {
    this.audioCtx = null;
    this.muted = localStorage.getItem('ahorcado_muted') === 'true';
  }
  initContext() {
    if (!this.audioCtx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) this.audioCtx = new AC();
    }
  }
  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem('ahorcado_muted', String(this.muted));
    return this.muted;
  }
  playTone(freq, type, dur, delay = 0) {
    if (this.muted) return;
    try {
      this.initContext();
      if (!this.audioCtx) return;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + delay);
      gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + delay + dur);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(this.audioCtx.currentTime + delay);
      osc.stop(this.audioCtx.currentTime + delay + dur);
    } catch (e) {}
  }
  playSuccess() { this.playTone(587.33, 'sine', 0.15); }
  playError() { this.playTone(180, 'sawtooth', 0.2); }
  playVictory() { [523, 659, 783, 1046].forEach((n, i) => this.playTone(n, 'triangle', 0.2, i * 0.08)); }
  playDefeat() { [392, 349, 311, 261].forEach((n, i) => this.playTone(n, 'sawtooth', 0.25, i * 0.1)); }
}

class StatsRepository {
  constructor() {
    this.KEY = 'ahorcado_stats_pro_2026';
    this.stats = this.load();
  }
  load() {
    try {
      const d = localStorage.getItem(this.KEY);
      if (d) return JSON.parse(d);
    } catch (e) {}
    return { partidas: 0, victorias: 0, derrotas: 0, rachaActual: 0, mejorRacha: 0 };
  }
  save() { localStorage.setItem(this.KEY, JSON.stringify(this.stats)); }
  recordGame(victory) {
    this.stats.partidas++;
    if (victory) {
      this.stats.victorias++;
      this.stats.rachaActual++;
      if (this.stats.rachaActual > this.stats.mejorRacha) this.stats.mejorRacha = this.stats.rachaActual;
    } else {
      this.stats.derrotas++;
      this.stats.rachaActual = 0;
    }
    this.save();
  }
  reset() {
    this.stats = { partidas: 0, victorias: 0, derrotas: 0, rachaActual: 0, mejorRacha: 0 };
    this.save();
  }
  get winPercentage() {
    return this.stats.partidas ? Math.round((this.stats.victorias / this.stats.partidas) * 100) : 0;
  }
}

class AhorcadoEngine {
  constructor() {
    this.dificultad = 'medio';
    this.configs = {
      facil: { maxFallos: 8, tiempoMax: null, iniciales: 2 },
      medio: { maxFallos: 6, tiempoMax: null, iniciales: 0 },
      dificil: { maxFallos: 5, tiempoMax: 45, iniciales: 0 }
    };
    this.item = null;
    this.adivinadas = [];
    this.usadas = new Set();
    this.fallos = 0;
    this.terminado = false;
  }
  setDificultad(d) { if (this.configs[d]) this.dificultad = d; }
  getConfig() { return this.configs[this.dificultad]; }
  nuevaPartida() {
    this.item = BANCO_DATOS[Math.floor(Math.random() * BANCO_DATOS.length)];
    this.adivinadas = Array(this.item.palabra.length).fill('');
    this.usadas.clear();
    this.fallos = 0;
    this.terminado = false;

    const conf = this.getConfig();
    if (conf.iniciales > 0) {
      const unicas = [...new Set(this.item.palabra.split(''))];
      for (let i = 0; i < conf.iniciales && i < unicas.length; i++) {
        const l = unicas[i];
        this.usadas.add(l);
        for (let j = 0; j < this.item.palabra.length; j++) {
          if (this.item.palabra[j] === l) this.adivinadas[j] = l;
        }
      }
    }
    return { ...this.item, maxFallos: conf.maxFallos, tiempoMax: conf.tiempoMax };
  }
  probarLetra(letra) {
    if (this.terminado || this.usadas.has(letra)) return null;
    this.usadas.add(letra);
    const acierto = this.item.palabra.includes(letra);
    if (acierto) {
      for (let i = 0; i < this.item.palabra.length; i++) {
        if (this.item.palabra[i] === letra) this.adivinadas[i] = letra;
      }
    } else {
      this.fallos++;
    }
    const victoria = !this.adivinadas.includes('');
    const derrota = this.fallos >= this.getConfig().maxFallos;
    if (victoria || derrota) this.terminado = true;
    return { letra, acierto, fallos: this.fallos, maxFallos: this.getConfig().maxFallos, victoria, derrota, palabra: this.item.palabra };
  }
}

class AhorcadoUI {
  constructor() {
    this.engine = new AhorcadoEngine();
    this.audio = new SoundSynthesizer();
    this.stats = new StatsRepository();
    this.timer = null;

    this.dom = {
      teclado: document.getElementById('teclado-virtual'),
      palabra: document.getElementById('palabra-display'),
      vidas: document.getElementById('vidas-numero'),
      saludFill: document.getElementById('barra-salud-fill'),
      categoria: document.getElementById('categoria-display'),
      mensaje: document.getElementById('mensaje-estado'),
      btnPista: document.getElementById('btn-pista'),
      cajaPista: document.getElementById('caja-pista'),
      textoPista: document.getElementById('texto-pista'),
      selectDif: document.getElementById('select-dificultad'),
      btnAudio: document.getElementById('btn-audio'),
      iconoAudio: document.getElementById('icono-audio'),
      btnNueva: document.getElementById('btn-nueva-partida'),
      modalFin: document.getElementById('modal-fin'),
      modalTitulo: document.getElementById('modal-titulo'),
      modalDesc: document.getElementById('modal-descripcion'),
      modalBtn: document.getElementById('modal-btn-jugar'),
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

    this.bindEvents();
    this.iniciar();
  }

  bindEvents() {
    this.dom.teclado.addEventListener('click', e => {
      const b = e.target.closest('.tecla');
      if (b && !b.disabled) this.jugar(b.dataset.letra);
    });
    window.addEventListener('keydown', e => {
      if (this.engine.terminado || e.ctrlKey || e.altKey) return;
      const l = e.key.toUpperCase();
      if (ALFABETO.includes(l)) this.jugar(l);
    });
    this.dom.selectDif.addEventListener('change', e => {
      this.engine.setDificultad(e.target.value);
      this.iniciar();
    });
    this.dom.btnAudio.addEventListener('click', () => {
      this.dom.iconoAudio.textContent = this.audio.toggleMute() ? '🔇' : '🔊';
    });
    this.dom.btnPista.addEventListener('click', () => {
      this.dom.cajaPista.classList.remove('oculta');
      this.dom.btnPista.disabled = true;
    });
    this.dom.btnNueva.addEventListener('click', () => this.iniciar());
    this.dom.modalBtn.addEventListener('click', () => {
      this.dom.modalFin.classList.add('oculta');
      this.iniciar();
    });
  }

  iniciar() {
    this.dom.modalFin.classList.add('oculta');
    const info = this.engine.nuevaPartida();
    this.dom.partesSvg.forEach(p => { if (p) p.classList.remove('visible'); });
    this.dom.caraDerrota.classList.remove('visible');
    this.dom.categoria.textContent = info.categoria;
    this.dom.textoPista.textContent = info.pista;
    this.dom.cajaPista.classList.add('oculta');
    this.dom.btnPista.disabled = false;
    this.renderTeclado();
    this.renderPalabra();
    this.actualizarSalud();
  }

  renderTeclado() {
    this.dom.teclado.innerHTML = '';
    ALFABETO.forEach(l => {
      const b = document.createElement('button');
      b.className = 'tecla';
      b.textContent = l;
      b.dataset.letra = l;
      if (this.engine.usadas.has(l)) { b.disabled = true; b.classList.add('acierto'); }
      this.dom.teclado.appendChild(b);
    });
  }

  renderPalabra() {
    this.dom.palabra.innerHTML = '';
    for (let i = 0; i < this.engine.item.palabra.length; i++) {
      const s = document.createElement('span');
      s.className = 'casilla-letra';
      if (this.engine.adivinadas[i]) { s.textContent = this.engine.adivinadas[i]; s.classList.add('revelada'); }
      this.dom.palabra.appendChild(s);
    }
  }

  actualizarSalud() {
    const max = this.engine.getConfig().maxFallos;
    const vidas = max - this.engine.fallos;
    this.dom.vidas.textContent = `${vidas} / ${max}`;
    this.dom.saludFill.style.width = `${(vidas / max) * 100}%`;
  }

  jugar(letra) {
    const res = this.engine.probarLetra(letra);
    if (!res) return;
    const b = this.dom.teclado.querySelector(`[data-letra="${letra}"]`);
    if (b) { b.disabled = true; b.classList.add(res.acierto ? 'acierto' : 'fallo'); }

    if (res.acierto) {
      this.audio.playSuccess();
      this.renderPalabra();
    } else {
      this.audio.playError();
      if (this.dom.partesSvg[res.fallos - 1]) this.dom.partesSvg[res.fallos - 1].classList.add('visible');
      this.actualizarSalud();
    }

    if (res.victoria || res.derrota) this.finPartida(res);
  }

  finPartida(res) {
    this.dom.teclado.querySelectorAll('.tecla').forEach(t => t.disabled = true);
    this.stats.recordGame(res.victoria);

    if (res.victoria) {
      this.audio.playVictory();
      this.dom.modalTitulo.textContent = '¡Victoria!';
      this.dom.modalDesc.textContent = `Adivinaste "${res.palabra}".`;
    } else {
      this.audio.playDefeat();
      this.dom.caraDerrota.classList.add('visible');
      this.dom.modalTitulo.textContent = 'Derrota';
      this.dom.modalDesc.textContent = `La palabra era "${res.palabra}".`;
    }
    setTimeout(() => this.dom.modalFin.classList.remove('oculta'), 300);
  }
}

document.addEventListener('DOMContentLoaded', () => new AhorcadoUI());
