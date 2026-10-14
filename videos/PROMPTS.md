# Technik-Videos – so sind sie entstanden

Alle 9 Clips sind komplett KI-erzeugt (Google Flow, Oktober 2026) und mit ffmpeg zu nahtlosen
Loops zusammengesetzt. Diese Datei hält den Ablauf fest, damit sich Clips später gezielt neu
machen lassen.

| Zieldatei | Übung | Kettlebells | Kamera |
|---|---|---|---|
| `front-squat.mp4` | Front Squat | 2 | schräg vorne |
| `goblet-squat.mp4` | Goblet Squat | 1 | schräg vorne |
| `clean-press.mp4` | Clean & Press | 2 | schräg vorne |
| `clean-press-1kb.mp4` | Clean & Press einarmig | 1 | schräg vorne |
| `row.mp4` | Bent-over Row | 2 | Profil |
| `row-1kb.mp4` | Rudern einarmig | 1 | Profil |
| `swing.mp4` | Swing (beide Versionen) | 1 | Profil |
| `thruster.mp4` | Thruster | 2 | schräg vorne |
| `goblet-thruster.mp4` | Goblet Thruster | 1 | schräg vorne |

---

## Was funktioniert – und was nicht

- **Nur Text-Prompts scheitern.** Veo 3.1 machte aus einem Front Squat ein Kreuzheben, Veo und
  Omni hockten nur halb tief, Swings wurden zum Frontheben, Cleans zum Curl.
- **Schlüsselpositionen als Bilder vorgeben.** Jede wichtige Position (z. B. Stand, tiefster
  Punkt, über Kopf) wird als eigenes Bild erzeugt – Bilder kosten in Flow keine Credits.
  Das Video bekommt dann **Startbild + Endbild** und muss die Position wirklich erreichen.
- **Endbilder immer als Edit des Startbilds** mit „IDENTICAL camera position, zoom and framing,
  feet at the same position and size, same person scale“. Sonst zoomt das Video am Ende.
- **Modell: Omni 1.1 Flash, 4 s, 720p, 9:16** (7 Credits). Zuverlässiger als Veo 3.1 Fast.
  Omni steht oft ~1–2 s still, bevor die Bewegung startet → wird beim Schnitt entfernt.
- **Loops entstehen beim Schnitt:** Abschnitt vorwärts + derselbe Abschnitt rückwärts
  (Kniebeuge, Rudern, Swing), oder mehrere Abschnitte hintereinander (Thruster, Clean & Press).
  Weil jeder Abschnitt exakt auf dem Schlüsselbild endet/beginnt, passen die Übergänge.
- **Jeden Abschnitt prüfen:** Kontaktbogen ziehen (`ffmpeg … fps=6,tile=12x2`) und gegen die
  Checkliste der Übung ansehen. Etwa jeder dritte Abschnitt musste neu erzeugt werden.
- **Schwachstelle Clean:** Selbst mit Zwischenbild („Reißverschluss“-Position) zeigen die
  Modelle den Clean eher als schnellen Curl. Die beiden Clean-&-Press-Clips nutzen die besten
  Versuche, schneller abgespielt.

## Figur & Szene

Flow-Charakter „KB Trainer“: Porträt + Körper erzeugt, danach in jedem Bild als Referenz.

```text
Athletic man in his early thirties, fit natural build, short dark hair, plain dark charcoal
fitted crew-neck t-shirt, plain black training shorts, flat black minimalist training shoes.
Seamless light grey studio backdrop and floor, soft even lighting. No logos, no text.
```

Kameras: **schräg vorne** (Hüfthöhe, ca. 30° von rechts vorne) und **Profil** (Hüfthöhe, genau
von rechts). Einarmige Übungen immer mit dem **rechten** Arm (zur Kamera).

## Schlüsselbilder (Nano Banana 2.1, Edits mit identischem Bildausschnitt)

| Name | Position |
|---|---|
| FR-stand | Stand, 2 KB im Front Rack (Fäuste unterm Kinn, KB außen am Unterarm, Ellbogen unten) |
| FR-bottom90 | Tiefster Punkt Front Squat: Oberschenkel waagerecht, Knie 90°, Fersen am Boden |
| FR-overhead | Beide KB über Kopf, Arme gestreckt |
| Hang-2KB | Stand, 2 KB hängen an gestreckten Armen |
| Goblet-stand / Goblet-bottom90 / Goblet-overhead | wie oben mit 1 KB an den Griffhörnern |
| Hang-1KB / Rack-1KB / Overhead-1KB | rechter Arm: hängend / im Rack / über Kopf |
| Clean2-pull / Clean1-pull | aufrecht nach dem Hüftstoß, Ellbogen eng nach hinten, KB dicht vor der Hüfte |
| Profile-stand | Grundbild im Profil |
| Row2-down / Row2-up | Hip Hinge ~45°, flacher Rücken; Arme hängend / KB am Bauchnabel |
| Row1-down / Row1-up | versetzter Stand, linke Hand auf dem Oberschenkel; rechter Arm hängend / oben |
| Swing-top / Swing-hike | KB auf Brusthöhe, Körper gerade / Rückschwung, Arme zwischen den Beinen |

## Video-Abschnitte (Omni 1.1 Flash, Start → Ende) und Zusammenbau

Gemeinsamer Zusatz für jeden Abschnitt:

```text
Static tripod camera, no zoom, no camera movement, no cuts. The kettlebells keep exactly the same
shape, size and number; the hands never let go of the handles; feet stay planted.
No music, no voice, no text.
```

| Clip | Abschnitte | Zusammenbau |
|---|---|---|
| front-squat | Stand → FR-bottom90 („slowly lowers into a deep front squat … arms do not move“) | vorwärts + rückwärts |
| goblet-squat | Goblet-stand → Goblet-bottom90 | vorwärts + rückwärts, Tempo 1,6 |
| row / row-1kb | Row*-down → Row*-up | eine Wiederholung vorwärts + rückwärts |
| swing | Swing-hike → Swing-top („the hip snap launches the bell … never stops at the hips“) | vorwärts (Aufschwung) + rückwärts (Abschwung), Tempo 2,2 |
| thruster | Front-Squat-Abschnitt + FR-bottom90 → FR-overhead („one continuous movement“) + Drücken FR-stand → FR-overhead rückwärts | Überblendung an den Übergängen |
| goblet-thruster | Goblet-Abschnitte analog | wie Thruster |
| clean-press | Hang-2KB → FR-stand (Clean) + FR-stand → FR-overhead (Drücken) | Clean → Drücken → Drücken rückwärts → Clean rückwärts |
| clean-press-1kb | Hang-1KB → Rack-1KB + Rack-1KB → Overhead-1KB | wie oben |

Werkzeuge in [`tools/`](tools/) (ffmpeg muss installiert sein, ggf. `FFMPEG_BIN` setzen):

```bash
# Bewegung pro Frame anzeigen – findet Start/Ende der Bewegung für den Schnitt
bash tools/motion.sh S1-goblet-down.mp4 0.8

# Loop bauen: datei:start:ende[:r[:tempo[:x]]]  (Frames bei 24 fps, Ende exklusiv)
bash tools/build.sh goblet-squat.mp4 S1-goblet-down.mp4:6:88:-:1.6 S1-goblet-down.mp4:7:87:r:1.6
```

Ausgabe: 720×1280, 24 fps, H.264 (CRF 24), ohne Tonspur, `+faststart` – je Clip 150–700 KB.

## Checkliste pro Übung

- **Front/Goblet Squat:** Oberschenkel waagerecht (Knie ~90°), Fersen am Boden, Brust aufrecht, KB bleiben an der Brust.
- **Clean & Press:** KB dicht am Körper, weich im Rack, Handgelenk gerade, oben Arm(e) voll gestreckt, kein Hohlkreuz.
- **Row:** Rücken flach, Winkel bleibt gleich, Zug zum Bauchnabel, Ellbogen nah am Körper; einarmig: Oberkörper dreht nicht.
- **Swing:** Hüftbewegung statt Kniebeuge, KB zwischen den Oberschenkeln, bis Brusthöhe, Arme locker, oben gerade Linie.
- **Thruster:** Hocke und Drücken in einer fließenden Bewegung, ohne Absetzen.
- **Typische KI-Fehler:** KB verformt sich oder wechselt die Anzahl, Hand lässt los, Griff durch die Hand, Füße rutschen, Kamera zoomt.
