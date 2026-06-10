# Kettlebell 15 🏋️

Eine installierbare Trainings-App (PWA) für den 15-Minuten-Kettlebell-Plan nach
[George Thomas: „The Only 15 Minute Kettlebell Plan You Need For 2026"](https://www.youtube.com/watch?v=_OGfNfb8Gcg).

Ziel: **Muskelaufbau mit 15 Minuten pro Trainingstag** — ohne Studio, mit 1–2 Kettlebells und 1 m² Platz.

## Das Programm

| | Workout A — Kraft | Workout B — Conditioning & Power |
|---|---|---|
| **Übungen** | Front Squat · Clean & Press · Row | Swings · Thrusters |
| **Format** | Zirkel × 3 Runden, 90 s Pause nach jeder Runde | EMOM (14 Min) **oder** Intervalle (7 Runden) |
| **Wdh.** | 8–12 · 6–12 · 10–15 | EMOM: 15–20 Swings / 5–6 Thrusters |

- **Trainingstage: Mo / Mi / Fr** — dazwischen mind. 24 h (ideal 48 h) Erholung
- **2-Wochen-Zyklus:** Woche 1 = A·B·A, Woche 2 = B·A·B → jedes Workout 3× pro 2 Wochen
- Nur 1 Kettlebell? Die App zeigt automatisch die 1-KB-Varianten (Goblet Squat, einarmiges Rudern, …)

## Features

- 📅 Dashboard mit Tageszuordnung (A / B / Ruhetag), Wochenübersicht und Zyklus-Anzeige
- ⏱️ Geführte Workouts: Zirkel-Tracker mit 90-s-Pausentimer, EMOM- und Intervall-Timer mit Sound-Cues
- 🏋️ Gewichts-Tracking pro Übung mit Progressions-Chart
- 🔥 Streak, Minuten- und Kalorien-Statistiken
- 📖 Übungs-Guide mit Technik-Tipps aus dem Video
- 📴 Offline-fähig, alle Daten bleiben lokal im Browser (localStorage)

## Lokal starten

Die App ist reines HTML/CSS/JS — kein Build nötig. Du kannst `index.html` direkt im Browser öffnen.
Für die volle PWA-Funktionalität (Service Worker) brauchst du einen lokalen Server:

```powershell
# Variante 1: mitgelieferter PowerShell-Server (keine Installation nötig)
powershell -NoProfile -ExecutionPolicy Bypass -File serve.ps1
# → http://127.0.0.1:8173

# Variante 2: Python (falls installiert)
python -m http.server 8080

# Variante 3: Node (falls installiert)
npx serve .
```

## Am Handy installieren

Service Worker + Installation benötigen **HTTPS**. Der einfachste Weg:

1. Projekt in ein GitHub-Repository pushen
2. In den Repo-Einstellungen **GitHub Pages** aktivieren (Branch `main`, Ordner `/`)
3. Die Pages-URL am Handy öffnen → Browser-Menü → **„Zum Startbildschirm hinzufügen"**

Die App läuft danach wie eine native App im Vollbild — auch offline.

## Hinweise

- Einsteiger: **leicht starten** (Swings mit 6–8 kg) und langsam steigern — nicht hetzen
- Progression für Muskelaufbau: erst Wiederholungen im Bereich ausreizen, dann Gewicht erhöhen
- Die App ersetzt keine ärztliche Beratung — bei Beschwerden vorher checken lassen
