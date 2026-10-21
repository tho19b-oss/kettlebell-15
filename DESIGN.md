---
name: Kettlebell 15
description: Geführter 15-Minuten-Kettlebell-Plan als Offline-PWA, gebaut aus mattem Gusseisen und dem Wettkampf-Farbcode der Gewichte.
colors:
  iron: "#2A2B2D"
  plate: "#343538"
  plate-2: "#3D3E42"
  sunk: "#1E1F21"
  line: "rgba(244, 244, 242, 0.1)"
  line-strong: "rgba(244, 244, 242, 0.32)"
  paint: "#F4F4F2"
  text-2: "#B4B5B1"
  text-3: "#9E9F9B"
  idle: "#4A4B4F"
  rest-ring: "#7A7B77"
  danger: "#FF8A7A"
  ink: "#161616"
  kg-under-8: "#A7A8A4"
  kg-8: "#F06EAA"
  kg-10: "#8EC2F2"
  kg-12: "#2F7DE1"
  kg-14: "#F7E36A"
  kg-16: "#F5D000"
  kg-18: "#B794E8"
  kg-20: "#8E5BD0"
  kg-22: "#6BC78A"
  kg-24: "#2DAA5C"
  kg-26: "#F5AE5E"
  kg-28: "#F28C28"
  kg-30: "#EE7A6A"
  kg-32: "#E2412E"
  kg-34-38: "#C9CAC6"
typography:
  display:
    fontFamily: "Barlow Condensed, Arial Narrow, Segoe UI, sans-serif"
    fontSize: "clamp(64px, 21vw, 88px)"
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: "-0.01em"
  display-timer:
    fontFamily: "Barlow Condensed, Arial Narrow, Segoe UI, sans-serif"
    fontSize: "clamp(84px, 27vw, 112px)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.01em"
    fontFeature: "tnum"
  headline:
    fontFamily: "Barlow Condensed, Arial Narrow, Segoe UI, sans-serif"
    fontSize: "48px"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.005em"
  title:
    fontFamily: "Barlow Condensed, Arial Narrow, Segoe UI, sans-serif"
    fontSize: "24px"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "0.01em"
  section:
    fontFamily: "Barlow Condensed, Arial Narrow, Segoe UI, sans-serif"
    fontSize: "22px"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.02em"
  button:
    fontFamily: "Barlow Condensed, Arial Narrow, Segoe UI, sans-serif"
    fontSize: "21px"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.05em"
  body:
    fontFamily: "Barlow, Segoe UI, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: 1.45
  body-small:
    fontFamily: "Barlow, Segoe UI, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.3
  label:
    fontFamily: "Barlow Condensed, Arial Narrow, Segoe UI, sans-serif"
    fontSize: "13px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.08em"
rounded:
  inner: "4px"
  plate: "6px"
  modal: "8px"
  frame: "28px"
  pill: "999px"
  dot: "50%"
spacing:
  hair: "4px"
  tight: "8px"
  row: "12px"
  card: "16px"
  screen: "20px"
  section: "36px"
components:
  button-primary:
    backgroundColor: "{colors.paint}"
    textColor: "{colors.iron}"
    typography: "{typography.button}"
    rounded: "{rounded.plate}"
    padding: "0 22px"
    height: "60px"
    width: "100%"
  button-primary-hover:
    backgroundColor: "#FFFFFF"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.paint}"
    typography: "{typography.button}"
    rounded: "{rounded.plate}"
    height: "60px"
  button-danger-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.danger}"
    rounded: "{rounded.plate}"
    height: "48px"
  button-small:
    rounded: "{rounded.plate}"
    padding: "0 16px"
    height: "44px"
  icon-button:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.text-2}"
    rounded: "{rounded.plate}"
    size: "44px"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.text-2}"
    rounded: "{rounded.inner}"
    padding: "0 12px"
    height: "40px"
  chip-active:
    backgroundColor: "{colors.paint}"
    textColor: "{colors.iron}"
  tag:
    textColor: "{colors.text-2}"
    typography: "{typography.label}"
    rounded: "{rounded.inner}"
    padding: "5px 8px 4px"
  kg-dot:
    rounded: "{rounded.dot}"
    size: "46px"
  exercise-card:
    backgroundColor: "{colors.plate}"
    rounded: "{rounded.plate}"
    padding: "16px"
  stepper-button:
    backgroundColor: "{colors.plate-2}"
    textColor: "{colors.paint}"
    rounded: "{rounded.inner}"
    size: "56px"
  tabbar:
    backgroundColor: "{colors.sunk}"
    textColor: "{colors.text-3}"
    typography: "{typography.label}"
    height: "72px"
  tab-active:
    textColor: "{colors.paint}"
  modal:
    backgroundColor: "{colors.plate}"
    rounded: "{rounded.modal}"
    padding: "22px 18px 18px"
---

# Design System: Kettlebell 15

## Overview

**Creative North Star: "Wettkampf-Kettlebell"**

Die App ist mattes Gusseisen. Grund, Platten und Senken sind drei Graphitstufen ohne Farbstich, Text und Primäraktion sind Lackweiß. Farbe tritt nur dort auf, wo ein Gewicht steht. Dort trägt sie den Wettkampf-Farbcode der Kettlebells, 8 kg pink bis 32 kg rot. Ein Blick auf den Bildschirm zeigt deshalb sofort, mit welchem Gewicht trainiert wird, und über die Wochen wandern die Farben zur nächsten Stufe.

Die Schrift ist Sportbeschriftung. Barlow Condensed in Versalien trägt Titel, Zahlen und Bedienelemente, Barlow trägt den Fließtext. Die großen Zahlen sind auf 2 m Abstand ausgelegt, weil das Handy während des Workouts am Boden liegt. Die Dichte ist niedrig, jede Zeile hat ein Ziel von mindestens 44 px.

Die Formen sind flach. Platten heben sich nur über ihre Graphitstufe vom Grund ab, Gliederung entsteht über Haarlinien. Schatten gibt es nur unter schwebenden Ebenen (Dialog und Gerätrahmen auf dem Desktop).

**Key Characteristics:**
- Drei Graphitstufen plus Lackweiß, keine Markenfarbe.
- Farbe nur aus dem Wettkampf-Farbcode der Gewichte.
- Barlow Condensed 800 in Versalien für alles, was aus Distanz lesbar sein muss.
- Flache Platten mit 4 bis 6 px Radius, Haarlinien statt Rahmenkästen.
- Tabellarische Ziffern bei jeder Zahl.

## Colors

Ein farbloser Gusseisen-Grund, auf dem nur die Gewichte Farbe tragen.

### Primary
- **Lackweiß** (paint): Text in voller Stärke, Primär-Button, aktiver Chip, aktiver Tab, erledigte Runde, abgehakte Übung, Linie im Gewichtschart. Lackweiß ist die einzige Aktionsfarbe.

### Secondary
- **Wettkampf-Farbcode** (kg-8 bis kg-32): die Farben der Wettkampf-Kettlebells. Die geraden Hauptstufen sind 8 pink, 12 blau, 16 gelb, 20 lila, 24 grün, 28 orange und 32 rot. Zwischengewichte (10, 14, 18, 22, 26, 30) tragen eine hellere Stufe der nächsten Hauptfarbe. Unter 8 kg gilt kg-under-8, von 34 bis 38 kg kg-34-38, ab 40 kg Lackweiß. `kgColor()` in `js/app.js` rundet auf 2 kg und liefert die Farbe, `kgInk()` wählt je nach Kontrast Tinte (ink) oder Lackweiß für die Ziffer auf dem Punkt.

### Neutral
- **Gusseisen** (iron): Grund jedes Screens und jedes Overlays.
- **Platte** (plate): Karten, Listen, Einstellungsblock, Dialog, Icon-Button.
- **Helle Platte** (plate-2): Stepper-Tasten und Hover einer Listenzeile.
- **Senke** (sunk): Seitenhintergrund, Tab-Leiste, Stepper-Mulde, Segment-Schalter, Videofläche, Hinweisbox im Guide, Hintergrundring des Timers.
- **Haarlinie** (line): Trennlinie zwischen Zeilen und über Fußleisten.
- **Starke Haarlinie** (line-strong): Kontur von Ghost-Button, Chip, Tag, Abhak-Kreis und die obere Linie einer Kennzahlenzeile.
- **Zweittext** (text-2) und **Dritttext** (text-3): Untertitel, Metazeilen und Einheiten in zwei Stufen.
- **Leerlauf** (idle): Gewichtspunkt ohne Gewicht, offene Runde, ausgeschalteter Schalter, Ruhetag im Wochenstreifen.
- **Pausenstahl** (rest-ring): Timer-Ring während der Pause.
- **Warnrot** (danger): Text destruktiver Aktionen, nie als Fläche.
- **Tinte** (ink): dunkle Ziffer auf hellen Gewichtspunkten.

### Named Rules
**The Farbe-nur-am-Gewicht Rule.** Eine Farbe aus dem Wettkampf-Farbcode erscheint nur an einem Gewicht. Das sind der Gewichtspunkt, der Balken im Wochenstreifen (Farbe des schwersten Gewichts des Tages), der Timer-Ring der laufenden Übung und die Punkte im Chart. Eine Fläche ohne Gewicht bleibt graphit oder lackweiß.

**The Gedämpfter-Plan Rule.** Geplante Tage zeigen die Gewichtsfarbe mit 40 % Deckung über Gusseisen (`color-mix(in srgb, var(--bar) 40%, var(--iron))`), erledigte Tage und heute zeigen sie in voller Stärke.

## Typography

**Display Font:** Barlow Condensed 600, 700, 800 (mit Arial Narrow, Segoe UI)
**Body Font:** Barlow 500, 600, 700 (mit Segoe UI, system-ui)

**Character:** Eine schmale, kräftige Grotesk wie auf Wettkampfgewichten und Startnummern, dazu ihre normalbreite Schwester für ruhigen Lesetext. Beide liegen selbst gehostet als WOFF2 unter `fonts/`.

### Hierarchy
- **Display** (800, clamp(64px, 21vw, 88px), 0.86, Versalien): Name des heutigen Workouts. Lange Namen fallen auf clamp(46px, 14.6vw, 62px) mit 0.9.
- **Display Timer** (800, clamp(84px, 27vw, 112px), 0.9, tabellarische Ziffern): Restzeit im Timer-Ring.
- **Headline** (800, 48px, 0.92, Versalien): Screen-Titel. Der Abschluss-Screen nutzt 56px mit 0.9, die Übung im Timer 40px.
- **Title** (800, 24px, 1.05, Versalien): Übungskarte, Guide-Karte, Modus-Karte. Der Dialogtitel nutzt 26px.
- **Section** (800, 22px, 1, 0.02em, Versalien): Abschnittstitel mit optionalem Zusatz rechts in Barlow 600 15px.
- **Button** (800, 21px, 0.05em, Versalien): Beschriftung der großen Buttons.
- **Body** (Barlow 500, 16px, 1.45): Fließtext, Metazeilen, Tipps im Guide.
- **Body Small** (Barlow 500, 14px bis 15px): Untertitel und Einheiten in Zweit- oder Dritttext.
- **Label** (700, 13px, 0.08em bis 0.12em, Versalien): Wochentage, Tags, Tab-Beschriftung, Einheit unter Wiederholungen, Phase im Timer.

### Named Rules
**The Zwei-Meter Rule.** Zeit, Übung und Wiederholungen stehen im Workout in Barlow Condensed 800 ab 40px. Kleinere Schrift im Workout ist Begleitinformation.

**The Tabellarische-Ziffern Rule.** Jede Zahl, die sich ändert oder in einer Spalte steht, nutzt Barlow Condensed mit `font-variant-numeric: tabular-nums`.

## Layout

Eine einzelne Spalte, maximal 430px breit. Auf Mobilgeräten füllt sie den Bildschirm (100dvh). Ab 520px Breite und 700px Höhe steht sie als Gerätrahmen zentriert auf der Senke, höchstens 900px hoch. Screens haben 20px Seitenrand und lassen unten Platz für die 72px hohe Tab-Leiste plus 32px. Safe-Area-Ränder fließen in Kopf, Fußleiste und Tab-Leiste ein.

Der Rhythmus nutzt 4px zwischen Streifen und Segmenten, 10px bis 12px zwischen Karten und in Zeilen, 16px als Kartenpolster und 36px vor einem Abschnittstitel. Kennzahlen stehen als liniierte Dreierzeile, nie als Kacheln. Der Wochenstreifen ist ein Raster aus sieben Spalten. Workouts und Timer laufen als Vollbild-Overlay mit Kopfzeile (44px Knopf, Titel, 44px Knopf), scrollendem Körper und einer Fußleiste mit Haarlinie.

## Elevation & Depth

Das System ist flach. Tiefe entsteht über Graphitstufen: Senke unter Gusseisen unter Platte unter heller Platte. Konturen sind innere Schatten (`inset`), damit sie keine Fläche belegen. Echte Schatten gibt es nur bei Ebenen, die über dem Inhalt schweben.

### Shadow Vocabulary
- **Dialog** (`box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5)`): Bestätigungsdialog über abgedunkelter Ebene (`rgba(16, 16, 17, 0.72)`).
- **Gerätrahmen** (`box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5)`): Rahmen der App auf dem Desktop.
- **Kontur** (`box-shadow: inset 0 0 0 1.5px var(--line-strong)`): Ghost-Button und Verlaufssymbol, mit 1px bei Chip und Tag, mit 2px beim Abhak-Kreis.

### Named Rules
**The Platte-statt-Schatten Rule.** Karten und Listen liegen ohne Schatten auf dem Grund. Wer eine Fläche abheben will, nimmt die nächste Graphitstufe.

## Shapes

Platten haben 6px Radius, Elemente innerhalb einer Platte (Stepper-Taste, Chip, Tag, Hinweisbox, Video) 4px. Der Dialog hat 8px, der Gerätrahmen 28px. Rund sind nur Dinge, die es auch in der Hand sind: Gewichtspunkt, Abhak-Kreis, Radio und Schalter. Fortschritt zeigen gerade Formen. Das sind 6px hohe Rundensegmente mit 2px Radius und 4px starke Balken über den Wochentagen. Die laufende Runde ist hart zur Hälfte gefüllt (Farbstopp bei 50 %), ohne Übergang.

## Components

### Buttons
Groß, flach und in Versalien, für verschwitzte Finger.
- **Shape:** Plattenradius (6px), volle Breite, 60px hoch.
- **Primary:** Lackweiße Fläche mit Gusseisen-Schrift, Hover auf reines Weiß. Ein Primär-Button pro Ansicht.
- **Hover / Focus:** Druck skaliert auf 0.985 (0.08s). Fokus ist eine 2px Lackweiß-Kontur mit 2px Abstand. Deaktiviert hat 35 % Deckung.
- **Ghost:** Transparent mit 1.5px starker Haarlinien-Kontur, Hover mit 6 % Lackweiß.
- **Danger Ghost:** Transparenter Warnrot-Text, 48px hoch, 18px Schrift.
- **Small:** Automatische Breite, 44px hoch, 16px Schrift.
- **Text-Link:** Barlow 600 15px in Dritttext, unterstrichen mit starker Haarlinie und 3px Abstand.
- **Icon-Button:** 44px Quadrat auf Platte, Icon 20px in Zweittext, Hover in Lackweiß.

### Chips
- **Style:** 40px hoch, 4px Radius, 1px Kontur, Barlow Condensed 700 16px in Zweittext.
- **State:** Aktiv wird lackweiße Fläche mit Gusseisen-Schrift ohne Kontur. Der Segment-Schalter folgt demselben Muster in einer Senke mit 4px Polster.

### Cards / Containers
- **Corner Style:** 6px.
- **Background:** Platte auf Gusseisen.
- **Shadow Strategy:** Keine, siehe Elevation & Depth.
- **Border:** Keine Außenkontur. Zeilen innerhalb trennt eine Haarlinie.
- **Internal Padding:** 16px, Guide-Karte 18px, Listenzeilen 12px auf 14px.

### Inputs / Fields
- **Gewichts-Stepper:** Senke mit 6px Polster, links und rechts 56px Tasten auf heller Platte, in der Mitte Gewichtspunkt und Wert in Barlow Condensed 700 17px. Gedrückt wechselt die Taste auf Leerlauf.
- **Schalter:** 52px auf 32px, Spur in Leerlauf, Knopf lackweiß. Eingeschaltet tauschen sich die Farben (Spur Lackweiß, Knopf Gusseisen).
- **Modus-Karte:** Platte mit Radio rechts oben. Ausgewählt bekommt die Karte eine 2px Lackweiß-Kontur, das Radio einen gefüllten Kern.

### Navigation
- **Tab-Leiste:** Drei Tabs auf Senke, 72px hoch plus Safe Area, Haarlinie oben. Icon 22px über Label in Barlow Condensed 700 13px mit 0.1em. Ruhend Dritttext, Hover Zweittext, aktiv Lackweiß mit 3px Lackweiß-Leiste an der Oberkante.
- **Markenzeile:** KETTLEBELL 15 in Barlow Condensed 800 15px mit 0.14em, rechts der Icon-Button für die Einstellungen.
- **Icons:** Inline-SVG mit 24er-Raster, Strich 2px, runde Enden, `currentColor`.

### Gewichtspunkt
Die Signatur des Systems. Ein Kreis in der Gewichtsfarbe mit der Zahl in Barlow Condensed 800 bei 44 % der Kreisgröße. Größen sind 26px (sm, Schrift 700), 36px (md), 46px (Standard) und 56px (lg). Ohne Gewicht steht er in Leerlauf. Ein neu gesetztes Gewicht stempelt ein (Skalierung von 1.22 auf 1 in 0.32s). Jede Stelle, an der ein Gewicht genannt wird, zeigt diesen Punkt.

### Timer-Ring
Ein Kreis bis 300px (76vw) mit Hintergrundring in Senke und Fortschrittsring in der Gewichtsfarbe der laufenden Übung. In der Pause wechselt der Ring auf Pausenstahl. In der Mitte stehen Phase (Label), Restzeit (Display Timer) und darunter Übung, Wiederholungen und nächste Übung.

### Wochenstreifen
Sieben Spalten mit 4px Balken oben. Erledigte Tage tragen die Farbe des schwersten Gewichts, geplante Tage dieselbe Farbe gedämpft, Ruhetage Leerlauf. Heute liegt auf einer Platte.

## Do's and Don'ts

### Do:
- Setze bei jeder Gewichtsangabe den Gewichtspunkt über `kgDot()` und hole Farben nur über `kgColor()`.
- Nimm Lackweiß für die eine Hauptaktion einer Ansicht.
- Schreibe Titel, Zahlen und Bedienelemente in Barlow Condensed in Versalien, Fließtext in Barlow 500.
- Trenne Zeilen mit Haarlinien (1px, 10 % Lackweiß) und hebe Flächen über die nächste Graphitstufe ab.
- Halte Tippziele bei mindestens 44px, im Workout bei 48px bis 60px.
- Lass Animationen über `--ease` und `--dur` (0.32s) laufen und respektiere reduzierte Bewegung.

### Don't:
- Setze keine Farbe aus dem Wettkampf-Farbcode auf eine Fläche, einen Text oder einen Akzent ohne Gewicht.
- Führe keine eigene Marken- oder Signalfarbe ein, auch kein Orange als Akzent.
- Baue Kennzahlen nicht als Kachelraster. Sie stehen als liniierte Zeile.
- Nutze keinen Glow und keine weichen Farbverläufe. Erlaubt ist der harte Halbstopp der laufenden Runde.
- Lege keine Schatten unter Karten oder Listen.
- Nutze Warnrot nicht als Fläche.
