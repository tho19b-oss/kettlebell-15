# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Eine Person: der Entwickler selbst. Er trainiert zuhause (Wohnzimmer oder Keller) mit 1 oder 2 Kettlebells. Das Handy liegt oder lehnt während des Workouts 1 bis 2 Meter entfernt am Boden. Er liest Timer, Übung und Wiederholungen aus dieser Distanz und mit verschwitzten Händen. Keine Veröffentlichung geplant.

## Product Purpose

Kettlebell 15 führt durch den 15-Minuten-Plan von George Thomas ("The Only 15 Minute Kettlebell Plan You Need For 2026"). Ziel ist Muskelaufbau mit 15 Minuten an drei Tagen pro Woche. Die App sagt, welches Workout heute dran ist, führt Satz für Satz durch das Training und speichert Dauer und Gewichte. Erfolg heißt: Mo, Mi und Fr wird trainiert, und die Gewichte steigen über die Wochen.

## Positioning

Die App kennt genau einen Plan und setzt ihn vollständig um: zwei Workouts, eine feste 2-Wochen-Rotation (Woche 1 A·B·A, Woche 2 B·A·B), feste Übungen, Wiederholungsbereiche und Pausen. Es gibt keinen Plan-Editor, keine Übungsbibliothek und keine Community.

## Operating Context

- Workout A (Kraft): Zirkel aus Front Squat, Clean & Press und Row, 3 Runden, 90 s Pause nach jeder Runde. Wiederholungen 8–12, 6–12, 10–15.
- Workout B (Conditioning & Power): Swings und Thrusters, als EMOM über 14 Minuten (15–20 Swings / 5–6 Thrusters) oder als Intervalle über 7 Runden (30/30 Swings, 20/40 Thrusters, leichter Modus 15/45).
- Trainingstage Mo, Mi, Fr. Di, Do, Sa und So sind Ruhetage.
- Bei 1 Kettlebell zeigt die App eigene Varianten (Goblet Squat, Clean & Press einarmig, Rudern einarmig, Goblet Thruster) mit eigenen Tipps und Videos.
- Gewichte in 2-kg-Schritten, 2 bis 48 kg.

## Capabilities and Constraints

- Statische PWA: reines HTML, CSS und JavaScript ohne Build-Schritt. Service Worker für Offline-Betrieb, Cache-Version bei jeder Änderung hochzählen.
- Drei Bereiche: Heute (Tageszuordnung, Wochenstreifen, Stats), Fortschritt (Summen, Gewichtskurve je Übung, löschbarer Verlauf), Guide (Plan, Ausrüstung, Sicherheit, 5 Übungen mit Video und Tipps). Einstellungen als Overlay (Kettlebell-Anzahl, Sound, Rotations-Woche tauschen, Backup-Export und -Import, Zurücksetzen).
- Geführte Workouts als Vollbild-Overlay: Zirkel-Tracker mit Abhaken und Gewichts-Stepper, 90-s-Pausentimer, EMOM- und Intervall-Timer mit Sound-Cues, Abschluss-Screen mit gemessener Dauer.
- Technik-Videos: stumme Hochkant-Loops (9:16, 720×1280) für alle 9 Übungsvarianten unter `videos/`.
- Wake Lock während des Workouts. Alle Daten in localStorage, nichts verlässt das Gerät.
- Sprache Deutsch.

## Brand Commitments

Keine. Name, Icon, Farben und Navigation dürfen neu gedacht werden. Funktionen und Inhalte bleiben.

## Evidence on Hand

- Original-Video: https://www.youtube.com/watch?v=_OGfNfb8Gcg
- Technik-Clips in `videos/`, Entstehung in `videos/PROMPTS.md` (KI-generiert).
- Kalorienwerte sind eine Schätzung (9 kcal pro Minute) und als "≈" gekennzeichnet.

## Product Principles

1. Aus 2 Metern lesbar: Während des Workouts zählen Zeit, Übung und Wiederholungen. Alles andere tritt zurück.
2. Ein Plan, keine Wahl: Die App entscheidet, was heute dran ist. Tauschen ist möglich, aber nicht der Normalfall.
3. Progression sichtbar machen: Gewichte und regelmäßige Trainingstage sind der Fortschritt, den die App zeigt.
4. Lokal und ohne Konto.

## Accessibility & Inclusion

Große Ziele für verschwitzte Hände. Reduzierte Bewegung respektieren (Videos stehen dann still). Ausreichender Kontrast für das Ablesen aus Distanz.
