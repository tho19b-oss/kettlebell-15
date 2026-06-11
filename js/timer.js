/* ============================================================
   Kettlebell 15 — Timer-Engine + Audio
   Wall-clock-basiert (driftfrei, läuft auch bei gedrosseltem Tab
   korrekt weiter). Klassische Scripts, damit die App auch über
   file:// ohne Server funktioniert.
   ============================================================ */

/* ---------- Audio (Web Audio API) ---------- */

const KBAudio = (() => {
  let ctx = null;
  let enabled = true;

  function ensureCtx() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function tone(freq, duration, when, type, volume) {
    const c = ensureCtx();
    if (!c) return;
    const t0 = c.currentTime + (when || 0);
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type || "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(volume || 0.5, t0 + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    osc.connect(gain).connect(c.destination);
    osc.start(t0);
    osc.stop(t0 + duration + 0.05);
  }

  return {
    setEnabled(on) { enabled = !!on; },
    /* muss aus einer User-Geste heraus aufgerufen werden (Autoplay-Policy) */
    unlock() { if (enabled) ensureCtx(); },
    /* kurzer Tick — Countdown 3-2-1 */
    tick() { if (enabled) tone(660, 0.09, 0, "square", 0.25); },
    /* Phasenwechsel — Doppel-Beep */
    phase() {
      if (!enabled) return;
      tone(880, 0.14, 0, "sine", 0.5);
      tone(880, 0.14, 0.18, "sine", 0.5);
    },
    /* Workout fertig — kleine Fanfare */
    finish() {
      if (!enabled) return;
      tone(523.25, 0.18, 0, "sine", 0.5);
      tone(659.25, 0.18, 0.16, "sine", 0.5);
      tone(783.99, 0.34, 0.32, "sine", 0.55);
    },
    test() { if (enabled) tone(880, 0.15, 0, "sine", 0.5); },
  };
})();

/* ---------- Wake Lock (Display anlassen während des Trainings) ----------
   Wird von der App pro Workout-Flow geschaltet (an beim Start, aus beim
   Schließen des Overlays) — nicht pro Timer, sonst ginge das Display im
   Zirkel-Teil von Workout A zwischen den Timern wieder aus. */

const KBWake = (() => {
  let lock = null;
  let wanted = false;

  async function acquire() {
    try {
      if ("wakeLock" in navigator) lock = await navigator.wakeLock.request("screen");
    } catch (_) { /* nicht unterstützt / verweigert — egal */ }
  }

  document.addEventListener("visibilitychange", () => {
    if (wanted && document.visibilityState === "visible") acquire();
  });

  return {
    on() { wanted = true; acquire(); },
    off() {
      wanted = false;
      if (lock) { lock.release().catch(() => {}); lock = null; }
    },
  };
})();

/* ---------- Timer-Engine ----------
   Läuft eine Liste von Phasen ab:
   { seconds, label, type: 'work'|'rest', ... beliebige Extra-Felder }
   Callbacks:
   - onPhase(phase, index)        — bei jedem Phasenstart
   - onTick(phase, index, left)   — ~5×/s, left = Restsekunden (float)
   - onDone()                     — alle Phasen fertig
*/

const KBTimer = (() => {
  let phases = [];
  let cb = {};
  let idx = -1;
  let phaseStart = 0;     // Wall-clock-Start der aktuellen Phase
  let pausedLeft = null;  // Restsekunden beim Pausieren
  let interval = null;
  let running = false;
  let lastWhole = -1;     // letzte volle Sekunde (für 3-2-1-Ticks)

  function clear() {
    if (interval) { clearInterval(interval); interval = null; }
  }

  function startPhase(i, carrySec) {
    idx = i;
    if (idx >= phases.length) { finish(); return; }
    // carrySec: Überhang aus der Vorphase (z. B. nach Tab-Drosselung),
    // damit die Gesamtzeit wall-clock-genau bleibt
    phaseStart = Date.now() - (carrySec || 0) * 1000;
    lastWhole = -1;
    if (cb.onPhase) cb.onPhase(phases[idx], idx);
  }

  function finish() {
    clear();
    running = false;
    // endSound: "phase" für Zwischen-Timer (z. B. 90-s-Pause in Workout A),
    // damit die Fanfare dem echten Workout-Ende vorbehalten bleibt
    if (cb.endSound === "phase") KBAudio.phase();
    else KBAudio.finish();
    if (cb.onDone) cb.onDone();
  }

  function tick() {
    if (!running || pausedLeft !== null) return;
    const p = phases[idx];
    const elapsed = (Date.now() - phaseStart) / 1000;
    const left = p.seconds - elapsed;

    if (left <= 0) {
      // Phase vorbei → nächste. Der Überhang kann mehrere Phasen umfassen
      // (Tab war eingefroren) — alle übersprungenen in einem Schritt aufholen,
      // ein einziger Beep statt einer Beep-Salve pro Phase.
      let carry = -left;
      let next = idx + 1;
      while (next < phases.length && carry >= phases[next].seconds) {
        carry -= phases[next].seconds;
        next++;
      }
      if (next < phases.length) KBAudio.phase();
      startPhase(next, carry);
      if (running && cb.onTick && idx < phases.length) {
        const np = phases[idx];
        cb.onTick(np, idx, Math.max(0, np.seconds - (Date.now() - phaseStart) / 1000));
      }
      return;
    }

    // 3-2-1-Countdown-Ticks (einmal pro voller Sekunde)
    const whole = Math.ceil(left);
    if (whole !== lastWhole) {
      lastWhole = whole;
      if (whole <= 3 && whole >= 1 && p.seconds > 5) KBAudio.tick();
    }

    if (cb.onTick) cb.onTick(p, idx, left);
  }

  return {
    start(phaseList, callbacks) {
      clear();
      phases = phaseList;
      cb = callbacks || {};
      running = true;
      pausedLeft = null;
      KBAudio.unlock();
      startPhase(0);
      if (cb.onTick && phases.length) cb.onTick(phases[0], 0, phases[0].seconds);
      interval = setInterval(tick, 200);
    },
    pause() {
      if (!running || pausedLeft !== null) return;
      const p = phases[idx];
      pausedLeft = Math.max(0, p.seconds - (Date.now() - phaseStart) / 1000);
    },
    resume() {
      if (!running || pausedLeft === null) return;
      phaseStart = Date.now() - (phases[idx].seconds - pausedLeft) * 1000;
      pausedLeft = null;
    },
    stop() {
      clear();
      running = false;
      pausedLeft = null;
    },
    isPaused() { return pausedLeft !== null; },
    isRunning() { return running; },
  };
})();
