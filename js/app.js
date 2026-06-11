/* ============================================================
   Kettlebell 15 — App-Logik
   Programm nach George Thomas: „The Only 15 Minute Kettlebell
   Plan You Need For 2026" (https://www.youtube.com/watch?v=_OGfNfb8Gcg)

   - 2-Wochen-Rotation: Wo. 1 = A(Mo) B(Mi) A(Fr), Wo. 2 = B A B
   - Workout A: Kraft — Zirkel ×3 (Front Squat, Clean & Press, Row), 90 s Pause
   - Workout B: Conditioning — Swings + Thrusters als EMOM oder Intervalle
   ============================================================ */

"use strict";

/* ---------------- Daten: Übungen & Workouts ---------------- */

const EXERCISES = {
  fs: {
    name: "Front Squat",
    de: "Frontkniebeuge",
    muscles: "Beine, Gesäß, Core",
    video: "videos/front-squat.mp4",
    oneBell: "Mit 1 Kettlebell: Goblet Squat — die Kettlebell mit beiden Händen vor der Brust halten.",
    tips: [
      "Kettlebells in der Rack-Position an Brust/Unterarm ablegen, Ellbogen eng",
      "Brust aufrecht, Core fest — tief hocken, Fersen bleiben am Boden",
      "Aus den Fersen kraftvoll wieder hochdrücken",
    ],
  },
  cp: {
    name: "Clean & Press",
    de: "Umsetzen & Über-Kopf-Drücken",
    muscles: "Schultern, Trizeps, Rücken, Beine",
    video: "videos/clean-press.mp4",
    oneBell: "Mit 1 Kettlebell: beidhändig ausführen oder die Seite bei jeder Runde wechseln.",
    tips: [
      "Clean: Kettlebell mit Hüftschwung in die Rack-Position bringen — sie soll sanft am Unterarm landen",
      "Handgelenk gerade halten, nicht abknicken",
      "Press: Körperspannung aufbauen und kontrolliert über Kopf drücken, langsam absenken",
    ],
  },
  row: {
    name: "Row",
    de: "Vorgebeugtes Rudern",
    muscles: "Oberer Rücken, Lat, Bizeps",
    oneBell: "Mit 1 Kettlebell: einarmig rudern, Seite bei jeder Runde wechseln.",
    tips: [
      "Hüfte nach hinten schieben, Rücken gerade — stabile Vorbeuge (Hip Hinge)",
      "Kettlebell Richtung Bauchnabel ziehen, Ellbogen nah am Körper",
      "Schulterblatt bewusst zusammenziehen, dann langsam absenken",
    ],
  },
  swing: {
    name: "Swing",
    de: "Kettlebell Swing",
    muscles: "Gesäß, Beinbeuger, unterer Rücken — die gesamte hintere Kette",
    oneBell: "Mit 1 Kettlebell: beidhändig schwingen — der Standard für den Einstieg.",
    tips: [
      "Die Kraft kommt aus der Hüftstreckung — kein Squat, die Arme bleiben locker",
      "Rücken immer gerade, Core fest — die Kettlebell schwingt bis ca. Brusthöhe",
      "Einsteiger: leicht starten (6–8 kg) und langsam steigern — nicht hetzen!",
      "Stärkt unteren Rücken & Gesäß und kann Rückenschmerzen vorbeugen",
    ],
  },
  thruster: {
    name: "Thruster",
    de: "Front Squat + Schulterdrücken in einer Bewegung",
    muscles: "Ganzkörper: Beine, Schultern, Core + Herz-Kreislauf",
    video: "videos/thruster.mp4",
    oneBell: "Mit 1 Kettlebell: beidhändig (Goblet-Position) oder einarmig mit Seitenwechsel.",
    tips: [
      "Aus der tiefen Hocke den Schwung direkt ins Über-Kopf-Drücken mitnehmen",
      "Eine flüssige Bewegung — nicht zwischendurch absetzen",
      "Laut Video „die vielleicht beste Übung der Welt“: Kraft, Power, Balance, Mobilität und Cardio in einem",
      "Sehr fordernd — unbedingt leicht anfangen und langsam steigern",
    ],
  },
};

const WORKOUT_A = {
  key: "A",
  focus: "Kraft",
  rounds: 3,
  restSec: 90,
  exercises: [
    { id: "fs", reps: "8–12" },
    { id: "cp", reps: "6–12" },
    { id: "row", reps: "10–15" },
  ],
};

const WORKOUT_B = {
  key: "B",
  focus: "Conditioning & Power",
  emom: { minutes: 14, swingReps: "15–20", thrusterReps: "5–6" },
  interval: { rounds: 7, swingWork: 30, swingRest: 30, thrusterWork: 20, thrusterRest: 40, easierWork: 15, easierRest: 45 },
};

const TRAINING_DAYS = [1, 3, 5]; // Mo, Mi, Fr
const KCAL_PER_MIN = 9;
const DEFAULT_WEIGHT = 8;
const VIDEO_URL = "https://www.youtube.com/watch?v=_OGfNfb8Gcg";

/* ---------------- Icons ---------------- */

const ICONS = {
  flame: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3 2.5.5 5 2.5 5 6a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5 0 1.5.5 4 1.5 4z"/><path d="M12 2c1 3 4 5.5 4 9.5"/></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 7V5a3 3 0 0 1 6 0v2"/><path d="M7.2 7h9.6c.7 1 2.2 3.4 2.2 7a7 7 0 0 1-14 0c0-3.6 1.5-6 2.2-7z"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5 10 17.5 19 7"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.2"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.03 1.56V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1.11-1.56 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.56-1.03H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.56-1.11 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34h.09a1.7 1.7 0 0 0 1.03-1.56V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v.09a1.7 1.7 0 0 0 1.56 1.03H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.51 1.03z"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5z"/></svg>',
  pause: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1.4"/><rect x="14" y="4" width="4" height="16" rx="1.4"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4 14h6l-1 8 9-12h-6z"/></svg>',
  rest: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>',
  ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6"/><path d="M20 4 10 14"/><path d="M9 5H5v14h14v-4"/></svg>',
};

/* ---------------- State & Storage ---------------- */

const STORE_KEY = "kb15";

let state = {
  settings: { bells: 2, sound: true, cycleStart: null },
  history: [],
};

const ui = {
  tab: "home",
  chartEx: "cp",
  flowA: null,
  flowB: null,
  pendingEntry: null,
  modalActions: [],
  elapsedInterval: null,
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      state.settings = Object.assign(state.settings, parsed.settings || {});
      state.history = Array.isArray(parsed.history) ? parsed.history : [];
    }
  } catch (_) { /* korrupte Daten → frisch starten */ }

  if (!state.settings.cycleStart) {
    state.settings.cycleStart = fmtISO(mondayOf(new Date()));
    saveState();
  }
  KBAudio.setEnabled(state.settings.sound);
}

function saveState() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (_) {}
}

/* ---------------- Backup: Export & Import ---------------- */

function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "kettlebell15-backup-" + fmtISO(new Date()) + ".json";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

function importDataPicker() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "application/json,.json";
  input.onchange = () => {
    const file = input.files && input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      let parsed = null;
      try { parsed = JSON.parse(reader.result); } catch (_) {}
      if (!parsed || !Array.isArray(parsed.history)) {
        showModal({
          title: "Import fehlgeschlagen",
          text: "Die Datei ist kein gültiges Kettlebell-15-Backup.",
          actions: [{ label: "OK", cls: "btn--primary", fn: hideModal }],
        });
        return;
      }
      showModal({
        title: "Backup importieren?",
        text: `${parsed.history.length} Workouts aus dem Backup ersetzen deine aktuellen Daten (${state.history.length} Workouts).`,
        actions: [
          { label: "Abbrechen", cls: "btn--ghost", fn: hideModal },
          { label: "Importieren", cls: "btn--primary", fn: () => { applyImport(parsed); hideModal(); } },
        ],
      });
    };
    reader.readAsText(file);
  };
  input.click();
}

function applyImport(parsed) {
  state = { settings: { bells: 2, sound: true, cycleStart: null }, history: [] };
  state.settings = Object.assign(state.settings, parsed.settings || {});
  state.history = Array.isArray(parsed.history) ? parsed.history : [];
  if (!state.settings.cycleStart) state.settings.cycleStart = fmtISO(mondayOf(new Date()));
  KBAudio.setEnabled(state.settings.sound);
  saveState();
  renderHome();
  renderProgress();
  renderSettingsOverlay();
}

/* ---------------- Datum & Plan-Logik ---------------- */

function fmtISO(d) {
  const p = (n) => String(n).padStart(2, "0");
  return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
}

function parseISO(s) {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function addDays(d, n) {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  x.setDate(x.getDate() + n);
  return x;
}

function mondayOf(d) {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  x.setDate(x.getDate() - ((x.getDay() + 6) % 7));
  return x;
}

/* 0 = Rotations-Woche 1 (A-B-A), 1 = Rotations-Woche 2 (B-A-B) */
function weekIndexFor(date) {
  const start = parseISO(state.settings.cycleStart);
  const diffDays = Math.round((mondayOf(date) - start) / 864e5);
  const w = Math.floor(diffDays / 7) % 2;
  return ((w % 2) + 2) % 2;
}

/* 'A' | 'B' | null für ein Datum */
function workoutFor(date) {
  const dow = date.getDay();
  if (!TRAINING_DAYS.includes(dow)) return null;
  const w = weekIndexFor(date);
  const week1 = { 1: "A", 3: "B", 5: "A" };
  const week2 = { 1: "B", 3: "A", 5: "B" };
  return (w === 0 ? week1 : week2)[dow];
}

function entriesOn(iso) {
  return state.history.filter((h) => h.date === iso);
}

function nextTrainingInfo(from) {
  for (let i = 1; i <= 7; i++) {
    const d = addDays(from, i);
    const w = workoutFor(d);
    if (w) {
      const name = d.toLocaleDateString("de-DE", { weekday: "long" });
      return { day: name, workout: w };
    }
  }
  return null;
}

function calcStreak() {
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 730; i++) {
    const d = addDays(today, -i);
    if (!TRAINING_DAYS.includes(d.getDay())) continue;
    const done = entriesOn(fmtISO(d)).length > 0;
    if (done) streak++;
    else if (i === 0) continue; // heute noch offen → bricht den Streak nicht
    else break;
  }
  return streak;
}

function minutesThisWeek() {
  const mon = mondayOf(new Date());
  const sun = addDays(mon, 6);
  return state.history
    .filter((h) => {
      const d = parseISO(h.date);
      return d >= mon && d <= sun;
    })
    .reduce((s, h) => s + (h.minutes || 0), 0);
}

function lastWeights(workoutKey) {
  for (let i = state.history.length - 1; i >= 0; i--) {
    const h = state.history[i];
    if (h.workout === workoutKey && h.weights) return Object.assign({}, h.weights);
  }
  return null;
}

/* ---------------- DOM-Helfer ---------------- */

const $ = (sel, root) => (root || document).querySelector(sel);

function el(id) { return document.getElementById(id); }

function variantText(exId) {
  return state.settings.bells === 1 ? EXERCISES[exId].oneBell : "Mit 2 Kettlebells ausführen";
}

/* Technik-Video als stummer Loop (verhält sich wie ein GIF, ist aber viel kleiner).
   Im Workout: Autoplay ohne Controls. Im Guide: mit Controls, Start per Tipp. */
function exVideo(exId, opts) {
  const src = EXERCISES[exId].video;
  if (!src) return "";
  return (opts && opts.controls)
    ? `<video class="ex-video" src="${src}" controls muted loop playsinline preload="metadata"></video>`
    : `<video class="ex-video" src="${src}" autoplay muted loop playsinline preload="auto"></video>`;
}

function kcalOf(min) { return Math.round(min * KCAL_PER_MIN); }

function greeting() {
  const h = new Date().getHours();
  if (h < 5) return "Noch wach? 🌙";
  if (h < 11) return "Guten Morgen ☀️";
  if (h < 18) return "Hallo! 👋";
  return "Guten Abend 🌙";
}

/* Nutzer mit „Bewegung reduzieren" bekommen Standbilder statt Auto-Loops */
function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ---------------- Screen: Heute ---------------- */

function renderHome() {
  const today = new Date();
  const iso = fmtISO(today);
  const todays = workoutFor(today);
  const doneToday = entriesOn(iso);
  const streak = calcStreak();
  const wIdx = weekIndexFor(today);

  const dateLabel = today.toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" });

  let hero;
  if (todays && doneToday.length === 0) {
    const isA = todays === "A";
    hero = `
      <div class="hero">
        <div class="eyebrow">Heute · Workout ${todays}</div>
        <h2>${isA ? "Kraft" : "Conditioning & Power"}</h2>
        <div class="meta-row">
          <span>${ICONS.bell}${isA ? "Front Squat · Clean &amp; Press · Row" : "Swings · Thrusters"}</span>
        </div>
        <div class="meta-row" style="margin-top:-10px">
          <span>${ICONS.clock}~15 Min</span>
          <span>${ICONS.bolt}${isA ? "3 Runden Zirkel" : "EMOM oder Intervalle"}</span>
        </div>
        <button class="btn btn--primary" data-action="start-workout" data-w="${todays}">${ICONS.play} Workout starten</button>
        <button class="btn-link" data-action="choose-workout">Lieber tauschen? Workout wählen</button>
      </div>`;
  } else if (todays && doneToday.length > 0) {
    const next = nextTrainingInfo(today);
    // Falls getauscht wurde, das tatsächlich absolvierte Workout nennen
    const doneW = doneToday.some((h) => h.workout === todays) ? todays : doneToday[doneToday.length - 1].workout;
    hero = `
      <div class="hero hero--done">
        <div class="eyebrow">Erledigt</div>
        <h2>Stark! 💪</h2>
        <p>Workout ${doneW} ist im Kasten.${next ? ` Nächstes Training: <strong>${next.day} · Workout ${next.workout}</strong>.` : ""}</p>
        <button class="btn btn--ghost" data-action="choose-workout">Extra-Workout starten</button>
      </div>`;
  } else {
    const next = nextTrainingInfo(today);
    const extraDone = doneToday.length > 0;
    hero = `
      <div class="hero hero--rest">
        <div class="eyebrow">Ruhetag</div>
        <h2>${extraDone ? "Trotzdem trainiert 🔥" : "Erholung"}</h2>
        <p>${extraDone
          ? "Du hast heute freiwillig trainiert — Respekt. Gönn deinen Muskeln jetzt die Pause."
          : "Muskeln wachsen in der Pause — das Video empfiehlt 24–48 h zwischen den Workouts."}${
          next ? ` Nächstes Training: <strong>${next.day} · Workout ${next.workout}</strong>.` : ""}</p>
        <button class="btn btn--ghost" data-action="choose-workout">Trotzdem trainieren</button>
      </div>`;
  }

  /* Wochenstreifen */
  const mon = mondayOf(today);
  const dows = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
  let strip = "";
  for (let i = 0; i < 7; i++) {
    const d = addDays(mon, i);
    const dIso = fmtISO(d);
    const w = workoutFor(d);
    const done = entriesOn(dIso).length > 0;
    const isToday = dIso === iso;
    let slot;
    if (done) slot = `<span class="slot slot--done">${ICONS.check}</span>`;
    else if (w === "A") slot = `<span class="slot slot--a">A</span>`;
    else if (w === "B") slot = `<span class="slot slot--b">B</span>`;
    else slot = `<span class="slot slot--rest">·</span>`;
    strip += `
      <div class="day${isToday ? " day--today" : ""}">
        <span class="dow">${dows[i]}</span>
        <span class="num">${d.getDate()}</span>
        ${slot}
      </div>`;
  }

  el("screen-home").innerHTML = `
    <header class="row">
      <div class="grow">
        <div class="eyebrow">${dateLabel}</div>
        <h1 class="h-greeting">${greeting()}</h1>
      </div>
      <span class="pill pill--a" title="Streak">${ICONS.flame.replace('viewBox', 'width="13" height="13" viewBox')} ${streak}</span>
      <button class="icon-btn" data-action="open-settings" aria-label="Einstellungen">${ICONS.gear}</button>
    </header>

    <div class="mt-18">${hero}</div>

    <div class="section-title">Diese Woche <small>Rotations-Woche ${wIdx + 1} · ${wIdx === 0 ? "A–B–A" : "B–A–B"}</small></div>
    <div class="weekstrip">${strip}</div>

    <div class="section-title">Deine Stats</div>
    <div class="stats-row">
      <div class="stat">
        <span class="chip chip--orange">${ICONS.flame}</span>
        <div><div class="value">${streak}</div><div class="unit">Streak</div></div>
      </div>
      <div class="stat">
        <span class="chip chip--gray">${ICONS.bell}</span>
        <div><div class="value">${state.history.length}</div><div class="unit">Workouts</div></div>
      </div>
      <div class="stat">
        <span class="chip chip--blue">${ICONS.clock}</span>
        <div><div class="value">${minutesThisWeek()}</div><div class="unit">Min/Woche</div></div>
      </div>
    </div>
  `;
}

/* ---------------- Screen: Fortschritt ---------------- */

function renderProgress() {
  const totalMin = state.history.reduce((s, h) => s + (h.minutes || 0), 0);

  /* Chart-Daten */
  const exIds = ["fs", "cp", "row", "swing", "thruster"];
  const chips = exIds
    .map((id) => `<button class="chip-btn${ui.chartEx === id ? " is-active" : ""}" data-action="chart-ex" data-ex="${id}">${EXERCISES[id].name}</button>`)
    .join("");

  const points = state.history
    .filter((h) => h.weights && h.weights[ui.chartEx] != null)
    .map((h) => ({ date: h.date, w: h.weights[ui.chartEx] }))
    .slice(-10);

  const lastW = points.length ? points[points.length - 1].w : null;

  let historyHtml;
  if (!state.history.length) {
    historyHtml = `<div class="empty"><div class="big">🏋️</div>Noch keine Workouts.<br>Starte heute — dein Verlauf erscheint hier.</div>`;
  } else {
    historyHtml = state.history
      .map((h, idx) => ({ h, idx }))
      .reverse()
      .slice(0, 30)
      .map(({ h, idx }) => {
        const d = parseISO(h.date).toLocaleDateString("de-DE", { weekday: "short", day: "2-digit", month: "2-digit" });
        const modeLabel = h.mode === "emom" ? "EMOM" : h.mode === "interval" ? "Intervalle" : "Zirkel · 3 Runden";
        const focus = h.workout === "A" ? "Kraft" : "Conditioning";
        return `
          <button class="history-item" data-action="history-entry" data-idx="${idx}">
            <span class="h-icon ${h.workout === "A" ? "a" : "b"}">${h.workout}</span>
            <span class="grow">
              <span class="h-title">Workout ${h.workout} · ${focus}</span>
              <span class="h-sub">${d} · ${modeLabel}</span>
            </span>
            <span class="h-min">${h.minutes} Min<br><span style="font-weight:600;color:var(--text-3)">≈ ${kcalOf(h.minutes)} kcal</span></span>
          </button>`;
      })
      .join("");
  }

  el("screen-progress").innerHTML = `
    <header>
      <div class="eyebrow">Fortschritt</div>
      <h1 class="h-greeting">Deine Entwicklung</h1>
    </header>

    <div class="stats-row mt-18">
      <div class="stat">
        <span class="chip chip--orange">${ICONS.bell}</span>
        <div><div class="value">${state.history.length}</div><div class="unit">Workouts</div></div>
      </div>
      <div class="stat">
        <span class="chip chip--blue">${ICONS.clock}</span>
        <div><div class="value">${totalMin}</div><div class="unit">Minuten</div></div>
      </div>
      <div class="stat">
        <span class="chip chip--gray">${ICONS.flame}</span>
        <div><div class="value">${kcalOf(totalMin)}</div><div class="unit">≈ kcal</div></div>
      </div>
    </div>

    <div class="section-title">Gewichts-Progression</div>
    <div class="card chart-card">
      <div class="chart-head">
        <div>
          <div class="eyebrow">${EXERCISES[ui.chartEx].name}</div>
          <div class="chart-val">${lastW != null ? lastW + ' <small>kg aktuell</small>' : '<small>keine Daten</small>'}</div>
        </div>
      </div>
      <div class="chip-row">${chips}</div>
      ${renderChart(points)}
    </div>

    <div class="section-title">Verlauf</div>
    ${historyHtml}
  `;
}

function renderChart(points) {
  if (points.length === 0) {
    return `<div class="empty small">Schließe ein Workout mit dieser Übung ab,<br>dann siehst du hier deine Gewichtskurve.</div>`;
  }

  const W = 340, H = 162, padL = 30, padR = 14, padT = 26, padB = 24;
  const ws = points.map((p) => p.w);
  let min = Math.min(...ws), max = Math.max(...ws);
  if (min === max) { min -= 2; max += 2; }
  const span = max - min;
  min -= span * 0.15;
  max += span * 0.15;

  const x = (i) => points.length === 1
    ? (padL + (W - padL - padR) / 2)
    : padL + (i * (W - padL - padR)) / (points.length - 1);
  const y = (w) => padT + (1 - (w - min) / (max - min)) * (H - padT - padB);

  /* Step-Pfad wie im Screenshot-Chart */
  let path = `M ${x(0)} ${y(points[0].w)}`;
  for (let i = 1; i < points.length; i++) {
    const xm = (x(i - 1) + x(i)) / 2;
    path += ` H ${xm} V ${y(points[i].w)} H ${x(i)}`;
  }

  /* Gridlines */
  const gridVals = [min + (max - min) * 0.15, (min + max) / 2, max - (max - min) * 0.15];
  const grid = gridVals
    .map((v) => `<line class="grid-line" x1="${padL}" x2="${W - padR}" y1="${y(v)}" y2="${y(v)}"/>
                 <text class="grid-label" x="2" y="${y(v) + 3}">${Math.round(v)}</text>`)
    .join("");

  /* Punkte + Badges (letzter Wert immer; Maximum nur, wenn es höher liegt —
     sonst stünden zwei identische Badges nebeneinander) */
  const lastI = points.length - 1;
  const maxI = ws.indexOf(Math.max(...ws));
  const badgeIdx = new Set([lastI]);
  if (ws[maxI] > ws[lastI]) badgeIdx.add(maxI);
  let dots = "";
  let badges = "";
  points.forEach((p, i) => {
    dots += `<circle class="pt" cx="${x(i)}" cy="${y(p.w)}" r="4"/>`;
    if (badgeIdx.has(i)) {
      const label = p.w + " kg";
      const bw = label.length * 6 + 12;
      let bx = x(i) - bw / 2;
      bx = Math.max(padL - 16, Math.min(bx, W - padR - bw + 8));
      const by = y(p.w) - 24;
      badges += `<g><rect class="badge-rect" x="${bx}" y="${by}" width="${bw}" height="16" rx="8"/>
        <text class="badge-text" x="${bx + bw / 2}" y="${by + 11.5}" text-anchor="middle">${label}</text></g>`;
    }
  });

  /* Datums-Labels an der X-Achse — max. 4, sonst wird es eng */
  const lblIdx = new Set([0, lastI]);
  if (points.length > 4) {
    lblIdx.add(Math.round(lastI / 3));
    lblIdx.add(Math.round((2 * lastI) / 3));
  }
  let xLabels = "";
  points.forEach((p, i) => {
    if (!lblIdx.has(i)) return;
    const d = parseISO(p.date);
    const lbl = String(d.getDate()).padStart(2, "0") + "." + String(d.getMonth() + 1).padStart(2, "0") + ".";
    const anchor = i === 0 ? "start" : i === lastI ? "end" : "middle";
    const lx = i === 0 ? padL - 8 : i === lastI ? W - padR + 6 : x(i);
    xLabels += `<text class="grid-label" x="${lx}" y="${H - 5}" text-anchor="${anchor}">${lbl}</text>`;
  });

  const area = points.length > 1
    ? `<path class="step-area" d="${path} V ${H - padB} H ${x(0)} Z"/>`
    : "";

  return `
    <svg class="chart-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="rgba(255,122,47,0.22)"/>
          <stop offset="1" stop-color="rgba(255,122,47,0)"/>
        </linearGradient>
      </defs>
      ${grid}
      ${xLabels}
      ${area}
      ${points.length > 1 ? `<path class="step-line" d="${path}"/>` : ""}
      ${dots}
      ${badges}
    </svg>`;
}

/* ---------------- Screen: Guide ---------------- */

function renderGuide() {
  const exCards = ["fs", "cp", "row", "swing", "thruster"]
    .map((id) => {
      const e = EXERCISES[id];
      const inA = WORKOUT_A.exercises.some((x) => x.id === id);
      return `
        <div class="card guide-card">
          <div class="row">
            <div class="grow">
              <h3>${e.name}</h3>
              <div class="g-sub">${e.de} · ${e.muscles}</div>
            </div>
            <span class="pill ${inA ? "pill--a" : "pill--b"}">${inA ? "Workout A" : "Workout B"}</span>
          </div>
          ${exVideo(id, { controls: true })}
          <ul>${e.tips.map((t) => `<li>${t}</li>`).join("")}</ul>
          <div class="g-alt">${e.oneBell}</div>
        </div>`;
    })
    .join("");

  el("screen-guide").innerHTML = `
    <header>
      <div class="eyebrow">Guide</div>
      <h1 class="h-greeting">Das Programm</h1>
    </header>

    <div class="card mt-18 guide-card">
      <h3>So funktioniert der Plan</h3>
      <ul>
        <li><strong>Mo / Mi / Fr</strong> — 15 Minuten, zwei Workouts im Wechsel</li>
        <li><strong>Workout A (Kraft):</strong> Zirkel ×3 — Front Squat, Clean &amp; Press, Row, danach 90 s Pause</li>
        <li><strong>Workout B (Conditioning):</strong> Swings + Thrusters — als EMOM oder Intervalle</li>
        <li><strong>2-Wochen-Rotation:</strong> Woche 1 = A·B·A, Woche 2 = B·A·B — so machst du jedes Workout 3× in 2 Wochen</li>
        <li><strong>Di / Do / Sa / So sind Ruhetage:</strong> mind. 24 h, ideal 48 h Pause — Muskeln wachsen in der Erholung</li>
      </ul>
      <a class="link-video mt-12" style="display:inline-flex" href="${VIDEO_URL}" target="_blank" rel="noopener">${ICONS.ext} Original-Video von George Thomas ansehen</a>
    </div>

    <div class="card guide-card">
      <h3>Was du brauchst</h3>
      <ul>
        <li>1 Kettlebell reicht — ideal sind 2 (für Front Squat, Clean &amp; Press und Rows)</li>
        <li>1 m² Platz — Küche, Wohnzimmer, Schlafzimmer</li>
        <li>Nicht vor Glas oder dem Haustierbett trainieren 😉</li>
      </ul>
    </div>

    <div class="card guide-card">
      <h3>Sicher Muskeln aufbauen</h3>
      <ul>
        <li><strong>Leicht starten</strong> — Einsteiger bei Swings mit 6–8 kg, lieber zu leicht als zu schwer</li>
        <li><strong>Nicht hetzen:</strong> Wer zu schnell zu schwer trainiert, verletzt sich — sagt auch das Video</li>
        <li><strong>Progression:</strong> Erst die Wiederholungen im Bereich ausreizen (z.&nbsp;B. 8 → 12), dann das Gewicht erhöhen und wieder unten im Bereich starten</li>
        <li>Saubere Technik schlägt jedes Extra-Kilo</li>
      </ul>
    </div>

    <div class="section-title">Die 5 Übungen</div>
    ${exCards}

    <p class="text-center text-2 small mt-24">Kettlebell 15 · Programm nach George Thomas<br>Alle Daten bleiben lokal auf deinem Gerät.</p>
  `;
}

/* ---------------- Einstellungen (Overlay) ---------------- */

function renderSettingsOverlay() {
  const wIdx = weekIndexFor(new Date());

  openOverlay(`
    ${ovHead("Einstellungen")}
    <div class="ov-body">
      <div class="card">
        <div class="setting-row">
          <div class="grow">
            <div class="s-title">Kettlebells</div>
            <div class="s-sub">Passt die Übungsvarianten an dein Equipment an</div>
          </div>
          <div class="seg-control" style="width:120px">
            <button class="${state.settings.bells === 1 ? "is-active" : ""}" data-action="set-bells" data-n="1" aria-pressed="${state.settings.bells === 1}">1</button>
            <button class="${state.settings.bells === 2 ? "is-active" : ""}" data-action="set-bells" data-n="2" aria-pressed="${state.settings.bells === 2}">2</button>
          </div>
        </div>
        <div class="setting-row">
          <div class="grow">
            <div class="s-title">Sound</div>
            <div class="s-sub">Beeps bei Phasenwechsel &amp; Countdown</div>
          </div>
          <button class="switch ${state.settings.sound ? "is-on" : ""}" data-action="set-sound" role="switch" aria-checked="${state.settings.sound}" aria-label="Sound umschalten"></button>
        </div>
        <div class="setting-row">
          <div class="grow">
            <div class="s-title">Rotations-Woche</div>
            <div class="s-sub">Aktuell: Woche ${wIdx + 1} (${wIdx === 0 ? "A–B–A" : "B–A–B"})</div>
          </div>
          <button class="btn btn--ghost btn--small" data-action="cycle-swap">Tauschen</button>
        </div>
        <div class="setting-row">
          <div class="grow">
            <div class="s-title">Backup</div>
            <div class="s-sub">Verlauf &amp; Einstellungen als Datei sichern</div>
          </div>
          <button class="btn btn--ghost btn--small" data-action="data-export">Export</button>
        </div>
        <div class="setting-row">
          <div class="grow">
            <div class="s-title">Wiederherstellen</div>
            <div class="s-sub">Backup-Datei importieren — ersetzt aktuelle Daten</div>
          </div>
          <button class="btn btn--ghost btn--small" data-action="data-import">Import</button>
        </div>
        <div class="setting-row">
          <div class="grow">
            <div class="s-title">Daten</div>
            <div class="s-sub">Verlauf &amp; Einstellungen löschen</div>
          </div>
          <button class="btn btn--danger-ghost btn--small" data-action="data-reset">Zurücksetzen</button>
        </div>
      </div>
      <p class="text-center text-2 small mt-24">Alle Daten bleiben lokal auf deinem Gerät.</p>
    </div>
  `, { keepScroll: true });
}

/* ---------------- Tabs ---------------- */

function switchTab(tab) {
  ui.tab = tab;
  document.querySelectorAll(".tab").forEach((t) => t.classList.toggle("is-active", t.dataset.tab === tab));
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("is-active"));
  el("screen-" + tab).classList.add("is-active");
  if (tab === "home") renderHome();
  if (tab === "progress") renderProgress();
  if (tab === "guide") renderGuide();
  el("main").scrollTop = 0;
}

/* ---------------- Overlay-Grundgerüst ---------------- */

/* opts.keepScroll: Scroll-Position übernehmen — nur für Re-Renders desselben
   Screens (z. B. Umschalter in Einstellungen/B-Auswahl). Neue Screens starten oben. */
function openOverlay(html, opts) {
  const ov = el("overlay");
  const prevBody = (opts && opts.keepScroll && !ov.hidden) ? ov.querySelector(".ov-body") : null;
  const scroll = prevBody ? prevBody.scrollTop : 0;
  ov.innerHTML = html;
  ov.hidden = false;
  if (scroll) {
    const body = ov.querySelector(".ov-body");
    if (body) body.scrollTop = scroll;
  }
  // Autoplay-Nudge: das muted-Attribut aus innerHTML reicht mobilen Browsern
  // nicht immer — Property setzen und play() explizit anstoßen
  ov.querySelectorAll("video[autoplay]").forEach((v) => {
    v.muted = true;
    if (reducedMotion()) { v.pause(); return; }
    const p = v.play();
    if (p) p.catch(() => {});
  });
}

function closeOverlay() {
  KBTimer.stop();
  KBWake.off();
  stopElapsedTicker();
  const ov = el("overlay");
  ov.hidden = true;
  ov.innerHTML = "";
  ui.flowA = null;
  ui.flowB = null;
  ui.pendingEntry = null;
}

function ovHead(title, sub) {
  return `
    <div class="ov-head">
      <button class="icon-btn" data-action="ov-close" aria-label="Schließen">${ICONS.x}</button>
      <div class="text-center">
        <div class="title">${title}</div>
        ${sub ? `<div class="sub">${sub}</div>` : ""}
      </div>
      <div style="width:40px"></div>
    </div>`;
}

/* ---------------- Workout A: Zirkel ---------------- */

/* Verstrichene Gesamtzeit — Workout A hat keinen durchlaufenden Timer,
   deshalb eigener 1-s-Ticker, solange der Flow offen ist */
function elapsedA() {
  return fmtTime(Math.floor((Date.now() - ui.flowA.startTs) / 1000));
}

function startElapsedTicker() {
  stopElapsedTicker();
  ui.elapsedInterval = setInterval(() => {
    const span = el("aElapsed");
    if (ui.flowA && span) span.textContent = elapsedA();
  }, 1000);
}

function stopElapsedTicker() {
  if (ui.elapsedInterval) { clearInterval(ui.elapsedInterval); ui.elapsedInterval = null; }
}

function startFlowA() {
  KBWake.on();
  const w = lastWeights("A") || { fs: DEFAULT_WEIGHT, cp: DEFAULT_WEIGHT, row: DEFAULT_WEIGHT };
  ui.flowA = {
    round: 1,
    done: { fs: false, cp: false, row: false },
    weights: w,
    startTs: Date.now(),
  };
  startElapsedTicker();
  renderFlowA();
}

function renderFlowA() {
  const f = ui.flowA;
  const allDone = WORKOUT_A.exercises.every((e) => f.done[e.id]);

  const segs = [1, 2, 3]
    .map((r) => `<div class="seg${r < f.round ? " is-done" : r === f.round ? " is-current" : ""}"></div>`)
    .join("");

  const cards = WORKOUT_A.exercises
    .map((e) => {
      const ex = EXERCISES[e.id];
      return `
        <div class="ex-card${f.done[e.id] ? " is-done" : ""}">
          <div class="ex-top">
            <button class="check" data-action="a-check" data-ex="${e.id}" aria-pressed="${f.done[e.id]}" aria-label="${ex.name} abhaken">${ICONS.check}</button>
            <div class="grow">
              <div class="ex-name">${ex.name}</div>
              <div class="ex-sub">${variantText(e.id)}</div>
            </div>
            <div class="ex-reps"><div class="n">${e.reps}</div><div class="l">Wdh.</div></div>
          </div>
          ${exVideo(e.id)}
          <div class="stepper">
            <button class="s-btn" data-action="w-step" data-flow="a" data-ex="${e.id}" data-d="-2">−</button>
            <div class="s-val">${f.weights[e.id]}<small>kg</small></div>
            <button class="s-btn" data-action="w-step" data-flow="a" data-ex="${e.id}" data-d="2">+</button>
          </div>
        </div>`;
    })
    .join("");

  openOverlay(`
    ${ovHead("Workout A · Kraft", `Runde ${f.round} von ${WORKOUT_A.rounds} · <span id="aElapsed">${elapsedA()}</span>`)}
    <div class="ov-body">
      <div class="rounds">${segs}</div>
      ${cards}
      <p class="text-2 small text-center">Alle 3 Übungen direkt nacheinander, dann 90 s Pause.</p>
    </div>
    <div class="ov-footer">
      <button class="btn btn--primary" data-action="a-round" ${allDone ? "" : "disabled"}>
        ${f.round < WORKOUT_A.rounds ? "Runde abschließen → 90 s Pause" : "Workout abschließen"}
      </button>
    </div>
  `);
}

function completeRoundA() {
  const f = ui.flowA;
  if (f.round < WORKOUT_A.rounds) {
    renderRestA();
  } else {
    finishWorkout({
      workout: "A",
      mode: "circuit",
      startTs: f.startTs,
      weights: Object.assign({}, f.weights),
      title: "Workout A · Kraft",
      emoji: "💪",
      cells: WORKOUT_A.exercises.map((e) => ({ v: f.weights[e.id] + " kg", k: EXERCISES[e.id].name })),
    });
  }
}

function renderRestA() {
  const f = ui.flowA;
  openOverlay(`
    ${ovHead("Pause", `Runde ${f.round} von ${WORKOUT_A.rounds} geschafft · <span id="aElapsed">${elapsedA()}</span>`)}
    <div class="timer-wrap">
      <div class="timer-ring is-rest" id="tRing">
        ${ringSvg()}
        <div class="ring-center">
          <div class="t-phase">Pause</div>
          <div class="t-time" id="tTime">1:30</div>
        </div>
      </div>
      <div class="t-exercise">
        <div class="name">Durchatmen 😮‍💨</div>
        <div class="target">Gleich geht's weiter mit Runde ${f.round + 1}</div>
      </div>
      <div class="t-next">Als Nächstes: <strong>Front Squat · Clean &amp; Press · Row</strong></div>
      <div class="t-controls">
        <button class="btn btn--ghost" data-action="rest-skip">Pause überspringen</button>
      </div>
    </div>
  `);

  KBTimer.start(
    [{ seconds: WORKOUT_A.restSec, label: "Pause", type: "rest" }],
    {
      onTick: (p, i, left) => updateRing(p.seconds, left),
      onDone: () => advanceRoundA(),
      endSound: "phase", // Fanfare nur am Workout-Ende, nicht nach jeder Pause
    }
  );
}

function advanceRoundA() {
  KBTimer.stop();
  const f = ui.flowA;
  f.round++;
  f.done = { fs: false, cp: false, row: false };
  renderFlowA();
}

/* ---------------- Workout B: Auswahl + Timer ---------------- */

function startFlowB() {
  KBWake.on();
  const w = lastWeights("B") || { swing: DEFAULT_WEIGHT, thruster: DEFAULT_WEIGHT };
  ui.flowB = {
    mode: "emom",
    easier: false,
    weights: w,
    startTs: Date.now(),
  };
  renderFlowBSelect();
}

function renderFlowBSelect() {
  const f = ui.flowB;
  const iv = WORKOUT_B.interval;

  openOverlay(`
    ${ovHead("Workout B · Conditioning", "Swings + Thrusters")}
    <div class="ov-body">
      <button class="mode-card${f.mode === "emom" ? " is-selected" : ""}" data-action="b-mode" data-mode="emom" aria-pressed="${f.mode === "emom"}">
        <span class="radio"></span>
        <span class="mc-title">EMOM · ${WORKOUT_B.emom.minutes} Min</span>
        <span class="mc-text">„Every Minute On the Minute": Ungerade Minute → <strong>${WORKOUT_B.emom.swingReps} Swings</strong>, gerade Minute → <strong>${WORKOUT_B.emom.thrusterReps} Thrusters</strong>. Der Rest jeder Minute ist Pause.</span>
      </button>
      <button class="mode-card${f.mode === "interval" ? " is-selected" : ""}" data-action="b-mode" data-mode="interval" aria-pressed="${f.mode === "interval"}">
        <span class="radio"></span>
        <span class="mc-title">Intervalle · ${iv.rounds} Runden</span>
        <span class="mc-text">${iv.swingWork} s Swings → ${iv.swingRest} s Pause → ${f.easier ? iv.easierWork : iv.thrusterWork} s Thrusters → ${f.easier ? iv.easierRest : iv.thrusterRest} s Pause.</span>
      </button>
      ${f.mode === "interval" ? `
        <div class="card">
          <div class="setting-row" style="padding:2px 0">
            <div class="grow">
              <div class="s-title">Leichter Modus</div>
              <div class="s-sub">Thrusters ${iv.easierWork} s Arbeit / ${iv.easierRest} s Pause — wenn ${iv.thrusterWork} s zu hart sind</div>
            </div>
            <button class="switch ${f.easier ? "is-on" : ""}" data-action="b-easier" role="switch" aria-checked="${f.easier}" aria-label="Leichter Modus"></button>
          </div>
        </div>` : ""}
      <hr class="divider">
      <div class="ex-card">
        <div class="ex-top">
          <div class="grow">
            <div class="ex-name">Swing</div>
            <div class="ex-sub">${variantText("swing")}</div>
          </div>
        </div>
        ${exVideo("swing")}
        <div class="stepper">
          <button class="s-btn" data-action="w-step" data-flow="b" data-ex="swing" data-d="-2">−</button>
          <div class="s-val">${f.weights.swing}<small>kg</small></div>
          <button class="s-btn" data-action="w-step" data-flow="b" data-ex="swing" data-d="2">+</button>
        </div>
      </div>
      <div class="ex-card">
        <div class="ex-top">
          <div class="grow">
            <div class="ex-name">Thruster</div>
            <div class="ex-sub">${variantText("thruster")}</div>
          </div>
        </div>
        ${exVideo("thruster")}
        <div class="stepper">
          <button class="s-btn" data-action="w-step" data-flow="b" data-ex="thruster" data-d="-2">−</button>
          <div class="s-val">${f.weights.thruster}<small>kg</small></div>
          <button class="s-btn" data-action="w-step" data-flow="b" data-ex="thruster" data-d="2">+</button>
        </div>
      </div>
    </div>
    <div class="ov-footer">
      <button class="btn btn--primary" data-action="b-start">${ICONS.play} Workout starten</button>
    </div>
  `, { keepScroll: true });
}

function buildPhasesB() {
  const f = ui.flowB;
  const phases = [];

  if (f.mode === "emom") {
    const m = WORKOUT_B.emom;
    for (let i = 1; i <= m.minutes; i++) {
      const isSwing = i % 2 === 1;
      phases.push({
        seconds: 60,
        type: "work",
        ex: isSwing ? "swing" : "thruster",
        label: `Minute ${i}/${m.minutes}`,
        exName: isSwing ? "Swings" : "Thrusters",
        target: `${isSwing ? m.swingReps : m.thrusterReps} Wiederholungen · ${f.weights[isSwing ? "swing" : "thruster"]} kg`,
        hint: "…dann Pause bis zur nächsten Minute",
        next: i < m.minutes ? (isSwing ? `Thrusters ${m.thrusterReps}` : `Swings ${m.swingReps}`) : "Fertig 🎉",
      });
    }
  } else {
    const iv = WORKOUT_B.interval;
    const tWork = f.easier ? iv.easierWork : iv.thrusterWork;
    const tRest = f.easier ? iv.easierRest : iv.thrusterRest;
    for (let r = 1; r <= iv.rounds; r++) {
      phases.push({
        seconds: iv.swingWork, type: "work", ex: "swing",
        label: `Runde ${r}/${iv.rounds}`, exName: "Swings",
        target: `${iv.swingWork} s Vollgas · ${f.weights.swing} kg`,
        next: `${iv.swingRest} s Pause`,
      });
      phases.push({
        seconds: iv.swingRest, type: "rest", ex: null,
        label: `Runde ${r}/${iv.rounds}`, exName: "Pause",
        target: "Locker bleiben, Atmung kontrollieren",
        next: `Thrusters ${tWork} s`,
      });
      phases.push({
        seconds: tWork, type: "work", ex: "thruster",
        label: `Runde ${r}/${iv.rounds}`, exName: "Thrusters",
        target: `${tWork} s Vollgas · ${f.weights.thruster} kg`,
        next: `${tRest} s Pause`,
      });
      phases.push({
        seconds: tRest, type: "rest", ex: null,
        label: `Runde ${r}/${iv.rounds}`, exName: "Pause",
        target: "Locker bleiben, Atmung kontrollieren",
        next: r < iv.rounds ? `Swings ${iv.swingWork} s` : "Fertig 🎉",
      });
    }
  }
  return phases;
}

function startTimerB() {
  const f = ui.flowB;
  // Dauer ab Timer-Start messen — Zeit auf dem Auswahl-Screen zählt nicht
  f.startTs = Date.now();
  const phases = buildPhasesB();
  const modeLabel = f.mode === "emom" ? "EMOM" : "Intervalle";

  openOverlay(`
    ${ovHead("Workout B · " + modeLabel, "Swings + Thrusters")}
    <div class="timer-wrap">
      <div class="eyebrow" id="tLabel"></div>
      <div class="timer-ring" id="tRing">
        ${ringSvg()}
        <div class="ring-center">
          <div class="t-phase" id="tPhase"></div>
          <div class="t-time" id="tTime"></div>
        </div>
      </div>
      <div class="t-exercise">
        <div class="name" id="tEx"></div>
        <div class="target" id="tTarget"></div>
      </div>
      <div class="t-next" id="tNext"></div>
      <video class="ex-video t-video" id="tVideo" muted loop playsinline preload="auto" hidden></video>
      <div class="t-controls">
        <button class="btn btn--ghost" data-action="t-pause" id="tPauseBtn">${ICONS.pause} Pause</button>
      </div>
    </div>
  `);

  KBTimer.start(phases, {
    onPhase: (p) => {
      el("tLabel").textContent = p.label;
      el("tPhase").textContent = p.exName.toUpperCase();
      el("tEx").textContent = p.exName;
      el("tTarget").textContent = p.target + (p.hint ? " " + p.hint : "");
      el("tNext").innerHTML = p.next ? `Danach: <strong>${p.next}</strong>` : "";
      const ring = el("tRing");
      ring.classList.toggle("is-rest", p.type === "rest");
      ring.classList.toggle("is-thruster", p.ex === "thruster");
      // Technik-Loop zur aktuellen Übung (falls ein Clip hinterlegt ist)
      const tv = el("tVideo");
      if (tv) {
        const src = p.ex && EXERCISES[p.ex].video;
        if (src) {
          if (!tv.src.endsWith(src)) tv.src = src;
          tv.hidden = false;
          tv.muted = true;
          if (!reducedMotion()) {
            const pr = tv.play();
            if (pr) pr.catch(() => {});
          }
        } else {
          tv.pause();
          tv.hidden = true;
        }
      }
    },
    onTick: (p, i, left) => updateRing(p.seconds, left),
    onDone: () => {
      finishWorkout({
        workout: "B",
        mode: f.mode,
        startTs: f.startTs,
        weights: Object.assign({}, f.weights),
        title: "Workout B · " + (f.mode === "emom" ? "EMOM" : "Intervalle"),
        emoji: "🔥",
        cells: [
          { v: f.weights.swing + " kg", k: "Swing" },
          { v: f.weights.thruster + " kg", k: "Thruster" },
        ],
      });
    },
  });
}

/* ---------------- Timer-Ring (SVG) ---------------- */

const RING_R = 130;
const RING_C = 2 * Math.PI * RING_R;

function ringSvg() {
  return `
    <svg viewBox="0 0 280 280">
      <circle class="ring-bg" cx="140" cy="140" r="${RING_R}" fill="none" stroke-width="10"/>
      <circle class="ring-fg" id="ringFg" cx="140" cy="140" r="${RING_R}" fill="none" stroke-width="10"
        stroke-linecap="round" stroke-dasharray="${RING_C}" stroke-dashoffset="0"/>
    </svg>`;
}

function updateRing(total, left) {
  const t = el("tTime");
  if (t) t.textContent = fmtTime(left);
  const fg = el("ringFg");
  if (fg) {
    const frac = Math.max(0, Math.min(1, left / total));
    fg.style.strokeDashoffset = String(RING_C * (1 - frac));
  }
}

function fmtTime(sec) {
  const s = Math.max(0, Math.ceil(sec));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return m + ":" + String(r).padStart(2, "0");
}

/* ---------------- Abschluss & Speichern ---------------- */

function finishWorkout(opts) {
  KBTimer.stop();
  // Echte Dauer messen statt Planwert — gedeckelt, falls das Overlay
  // versehentlich lange offen/pausiert blieb
  const minutes = Math.max(1, Math.min(60, Math.round((Date.now() - opts.startTs) / 60000)));
  ui.pendingEntry = {
    date: fmtISO(new Date()),
    workout: opts.workout,
    mode: opts.mode,
    minutes,
    weights: opts.weights,
    ts: Date.now(),
  };

  const cells = [
    { v: minutes + " Min", k: "Dauer" },
    { v: "≈ " + kcalOf(minutes), k: "kcal" },
    ...opts.cells,
  ];

  openOverlay(`
    ${ovHead("Geschafft!", opts.title)}
    <div class="ov-body">
      <div class="done-hero">
        <div class="emoji">${opts.emoji}</div>
        <h2>Workout ${opts.workout} fertig!</h2>
        <p>${opts.workout === "A"
          ? "Kraft-Reiz gesetzt — gönn dir jetzt Erholung und Protein."
          : "Conditioning &amp; Power — dein Herz hat heute gearbeitet."}</p>
      </div>
      <div class="summary-grid">
        ${cells.map((c) => `<div class="cell"><div class="v">${c.v}</div><div class="k">${c.k}</div></div>`).join("")}
      </div>
    </div>
    <div class="ov-footer">
      <button class="btn btn--primary" data-action="save-finish">${ICONS.check} Speichern &amp; fertig</button>
    </div>
  `);
}

function saveFinish() {
  if (ui.pendingEntry) {
    state.history.push(ui.pendingEntry);
    saveState();
  }
  closeOverlay();
  switchTab("home");
}

/* ---------------- Modal ---------------- */

function showModal(opts) {
  ui.modalActions = opts.actions.map((a) => a.fn);
  const m = el("modal");
  m.innerHTML = `
    <div class="modal">
      <h3>${opts.title}</h3>
      <p>${opts.text || ""}</p>
      <div class="m-actions">
        ${opts.actions
          .map((a, i) => `<button class="btn ${a.cls || "btn--ghost"}" data-action="modal-act" data-i="${i}">${a.label}</button>`)
          .join("")}
      </div>
    </div>`;
  m.hidden = false;
}

function hideModal() {
  const m = el("modal");
  m.hidden = true;
  m.innerHTML = "";
  ui.modalActions = [];
}

function confirmAbort() {
  const timerRunning = KBTimer.isRunning();
  if (timerRunning) KBTimer.pause();
  showModal({
    title: "Workout abbrechen?",
    text: "Dein Fortschritt in diesem Workout geht verloren.",
    actions: [
      { label: "Weiter trainieren", cls: "btn--primary", fn: () => { hideModal(); if (timerRunning) KBTimer.resume(); } },
      { label: "Workout beenden", cls: "btn--danger-ghost", fn: () => { hideModal(); closeOverlay(); } },
    ],
  });
}

/* X auf dem „Geschafft!"-Screen: Das Workout ist fertig, aber ungespeichert —
   nicht den Abbruch-Dialog zeigen, sondern Speichern anbieten */
function confirmDiscardFinished() {
  showModal({
    title: "Workout speichern?",
    text: "Dein Workout ist abgeschlossen, aber noch nicht gespeichert.",
    actions: [
      { label: "Speichern & fertig", cls: "btn--primary", fn: () => { hideModal(); saveFinish(); } },
      { label: "Verwerfen", cls: "btn--danger-ghost", fn: () => { hideModal(); closeOverlay(); switchTab("home"); } },
    ],
  });
}

/* Zentrale Schließen-Logik für das Overlay (X-Button und Escape) */
function requestCloseOverlay() {
  if (ui.pendingEntry) confirmDiscardFinished();
  else if (ui.flowA || ui.flowB) confirmAbort();
  else closeOverlay();
}

function chooseWorkoutModal() {
  showModal({
    title: "Workout wählen",
    text: "Welches Workout willst du machen?",
    actions: [
      { label: "Workout A · Kraft", cls: "btn--primary", fn: () => { hideModal(); startFlowA(); } },
      { label: "Workout B · Conditioning", cls: "btn--blue", fn: () => { hideModal(); startFlowB(); } },
      { label: "Abbrechen", cls: "btn--ghost", fn: hideModal },
    ],
  });
}

/* ---------------- Events ---------------- */

document.addEventListener("click", (ev) => {
  const t = ev.target.closest("[data-action]");
  if (!t) return;
  const a = t.dataset.action;

  switch (a) {
    case "tab":
      switchTab(t.dataset.tab);
      break;

    case "start-workout":
      KBAudio.unlock();
      t.dataset.w === "A" ? startFlowA() : startFlowB();
      break;

    case "choose-workout":
      chooseWorkoutModal();
      break;

    case "ov-close":
      requestCloseOverlay();
      break;

    /* --- Workout A --- */
    case "a-check": {
      const f = ui.flowA;
      if (!f) break;
      const ex = t.dataset.ex;
      f.done[ex] = !f.done[ex];
      // Gezielt im DOM togglen statt neu rendern — sonst springt der Scroll
      // und die Technik-Videos starten von vorn
      t.setAttribute("aria-pressed", String(f.done[ex]));
      t.closest(".ex-card").classList.toggle("is-done", f.done[ex]);
      const allDone = WORKOUT_A.exercises.every((e) => f.done[e.id]);
      const btn = $('#overlay [data-action="a-round"]');
      if (btn) btn.disabled = !allDone;
      break;
    }
    case "a-round":
      completeRoundA();
      break;
    case "rest-skip":
      advanceRoundA();
      break;

    /* --- Gewichts-Stepper --- */
    case "w-step": {
      const f = t.dataset.flow === "a" ? ui.flowA : ui.flowB;
      if (!f) break;
      const ex = t.dataset.ex;
      const d = Number(t.dataset.d);
      // Kettlebells gibt es in 2-kg-Schritten → aufs 2er-Raster snappen
      const next = Math.round(((f.weights[ex] || DEFAULT_WEIGHT) + d) / 2) * 2;
      f.weights[ex] = Math.max(2, Math.min(48, next));
      // Nur die Anzeige aktualisieren — kein Re-Render, sonst springt der Scroll
      t.closest(".stepper").querySelector(".s-val").innerHTML = `${f.weights[ex]}<small>kg</small>`;
      break;
    }

    /* --- Workout B --- */
    case "b-mode":
      ui.flowB.mode = t.dataset.mode;
      renderFlowBSelect();
      break;
    case "b-easier":
      ui.flowB.easier = !ui.flowB.easier;
      renderFlowBSelect();
      break;
    case "b-start":
      startTimerB();
      break;

    /* --- Timer --- */
    case "t-pause": {
      const btn = el("tPauseBtn");
      if (KBTimer.isPaused()) {
        KBTimer.resume();
        btn.innerHTML = ICONS.pause + " Pause";
      } else {
        KBTimer.pause();
        btn.innerHTML = ICONS.play + " Weiter";
      }
      break;
    }

    case "save-finish":
      saveFinish();
      break;

    /* --- Fortschritt --- */
    case "chart-ex":
      ui.chartEx = t.dataset.ex;
      renderProgress();
      break;
    case "history-entry": {
      const idx = Number(t.dataset.idx);
      const h = state.history[idx];
      if (!h) break;
      const d = parseISO(h.date).toLocaleDateString("de-DE", { weekday: "short", day: "2-digit", month: "2-digit" });
      showModal({
        title: `Workout ${h.workout} · ${d}`,
        text: `${h.minutes} Min · ≈ ${kcalOf(h.minutes)} kcal — Eintrag löschen?`,
        actions: [
          { label: "Behalten", cls: "btn--primary", fn: hideModal },
          {
            label: "Eintrag löschen",
            cls: "btn--danger-ghost",
            fn: () => {
              state.history.splice(idx, 1);
              saveState();
              hideModal();
              renderProgress();
              renderHome(); // Streak & Stats aktualisieren
            },
          },
        ],
      });
      break;
    }

    /* --- Einstellungen --- */
    case "open-settings":
      renderSettingsOverlay();
      break;
    case "set-bells":
      state.settings.bells = Number(t.dataset.n);
      saveState();
      renderSettingsOverlay();
      break;
    case "set-sound":
      state.settings.sound = !state.settings.sound;
      KBAudio.setEnabled(state.settings.sound);
      if (state.settings.sound) KBAudio.test();
      saveState();
      renderSettingsOverlay();
      break;
    case "cycle-swap": {
      const d = parseISO(state.settings.cycleStart);
      state.settings.cycleStart = fmtISO(addDays(d, -7));
      saveState();
      renderSettingsOverlay();
      break;
    }
    case "data-export":
      exportData();
      break;
    case "data-import":
      importDataPicker();
      break;
    case "data-reset":
      showModal({
        title: "Alles zurücksetzen?",
        text: "Dein gesamter Verlauf und alle Einstellungen werden gelöscht. Das kann nicht rückgängig gemacht werden.",
        actions: [
          { label: "Behalten", cls: "btn--primary", fn: hideModal },
          {
            label: "Ja, alles löschen",
            cls: "btn--danger-ghost",
            fn: () => {
              localStorage.removeItem(STORE_KEY);
              state = { settings: { bells: 2, sound: true, cycleStart: null }, history: [] };
              loadState();
              hideModal();
              closeOverlay();
              switchTab("home");
            },
          },
        ],
      });
      break;

    case "modal-act": {
      const fn = ui.modalActions[Number(t.dataset.i)];
      if (fn) fn();
      break;
    }
  }
});

/* Nach Rückkehr in die App (Screen-Lock, App-Wechsel) pausierte Technik-Loops wieder anstoßen */
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState !== "visible" || reducedMotion()) return;
  document.querySelectorAll("#overlay video[autoplay], #overlay .t-video:not([hidden])").forEach((v) => {
    v.muted = true;
    const p = v.play();
    if (p) p.catch(() => {});
  });
});

/* Modal: Klick auf Backdrop schließt (außer es ist ein Abbruch-Dialog mit laufendem Timer — dann lieber explizit) */
el("modal").addEventListener("click", (ev) => {
  if (ev.target === el("modal") && !KBTimer.isRunning()) hideModal();
});

/* Escape schließt Modal bzw. Overlay (Desktop-Komfort) */
document.addEventListener("keydown", (ev) => {
  if (ev.key !== "Escape") return;
  if (!el("modal").hidden) {
    if (!KBTimer.isRunning()) hideModal();
    return;
  }
  if (!el("overlay").hidden) requestCloseOverlay();
});

/* ---------------- Init ---------------- */

loadState();
renderHome();
renderProgress();
renderGuide();
switchTab("home");

if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}
