# 🎮 Guía de Práctica: El Ahorcado en JS (Versión 3 - Arquitectura POO, Audio y Persistencia)

> **Autor:** Ramón Abramo  
> **Nivel:** Avanzado y Profesional de JavaScript  
> **Enfoque:** Programación Orientada a Objetos (POO), Web Audio API sintético, Canvas animado, almacenamiento persistente en `localStorage` y selector de niveles de dificultad.

---

## 🗺️ Arquitectura de la Versión 3

Esta versión traslada el desarrollo al paradigma de software modular utilizado en proyectos de producción:

```
┌────────────────────────────────────────────────────────┐
│                      AhorcadoUI                        │
│           (Controlador Central de la Vista)            │
└──────┬──────────────┬──────────────┬─────────────┬─────┘
       │              │              │             │
       ▼              ▼              ▼             ▼
┌──────────────┐┌──────────────┐┌───────────┐┌───────────┐
│AhorcadoEngine││SoundSynthes. ││ StatsRepo ││ Confetti  │
│(Lógica & Dif)││(Web Audio API││(LocalStor)││  (Canvas) │
└──────────────┘└──────────────┘└───────────┘└───────────┘
```

---

## 👣 Desglose de Clases y Módulos

### 1. `SoundSynthesizer`: Audio 100% Nativo en el Navegador
En lugar de cargar ficheros pesados `.mp3` que requieren rutas complejas o fallan en local, usamos la **Web Audio API** estándar de W3C para sintetizar ondas sonoras en tiempo real:

```javascript
class SoundSynthesizer {
  playTone(frequency, type, duration) {
    if (this.muted) return;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = type; // 'sine', 'triangle', 'sawtooth'
    osc.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start();
    osc.stop(this.audioCtx.currentTime + duration);
  }
}
```

---

### 2. `StatsRepository`: Persistencia con `localStorage`
Permite conservar las estadísticas del jugador aunque cierre el navegador o refresque la página:

```javascript
class StatsRepository {
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
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.stats));
  }
}
```

---

### 3. `AhorcadoEngine`: Máquina de Estados y Dificultad
Encapsula las reglas puras del juego, sin conocer nada del HTML o del DOM:
- **Fácil:** 8 fallos tolerados, pistas ilimitadas y 2 letras descubiertas al azar.
- **Normal:** 6 fallos tolerados, pista disponible.
- **Difícil:** 5 fallos tolerados, sin pistas y temporizador regresivo de 45 segundos.

---

### 4. `ConfettiAnimation`: Partículas en `<canvas>`
Calcula la cinemática de 120 confetis físicos (gravedad, rotación, deriva oscilante con `Math.sin()`) mediante `requestAnimationFrame()` garantizando 60 FPS fluidos.

---

### 5. `AhorcadoUI`: Desacoplamiento y Orquestación
Coordina los eventos del usuario (`click`, `keydown`), actualiza las barras de vida y temporizador, reproduce los sonidos pertinentes y presenta el modal de fin de juego con las métricas de la partida.

---

## 💡 Consejos Didácticos para el Aula
- **Principio de Responsabilidad Única (SRP):** Observa cómo `AhorcadoEngine` no contiene una sola llamada a `document.getElementById()`. Esto permite testear la lógica del juego de forma aislada.
- **Manejo de Políticas del Navegador:** Explica por qué el `AudioContext` debe crearse o reanudarse tras una interacción del usuario (política de *Autoplay* del navegador).
- **Serialización JSON:** Repasa el ciclo `JSON.stringify()` al escribir y `JSON.parse()` al recuperar información estructurada de `localStorage`.
