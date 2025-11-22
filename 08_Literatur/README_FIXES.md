# Anleitung: Erfahrung wieder zum Laufen bringen

## Problem
Die VR-Erfahrung startet nicht aufgrund von JavaScript-Syntaxfehlern im Code.

## Lösung

### Schritt 1: Die 4 Fehler im Code finden und beheben

#### Fehler 1: Tippfehler bei Variable (Zeile ~15 in `startTechno()`)
**Suchen nach:**
```javascript
hno.hatLoop = new Tone.Loop(time => {
```

**Ersetzen durch:**
```javascript
techno.hatLoop = new Tone.Loop(time => {
```

---

#### Fehler 2: Unvollständiger Befehl (in `startFinalVoices()`)
**Suchen nach:**
```javascript
voicesDiv.appendChild(v
```

**Ersetzen durch:**
```javascript
voicesDiv.appendChild(v);
```

**Wichtig:** Die Zeile muss mit `);` enden. Das Semikolon und die schließende Klammer fehlen im Original.

---

#### Fehler 3: Fehlende schließende Klammer
Nach dem Fix von Fehler 2, stellen Sie sicher, dass die `startFinalVoices()` Funktion mit `}` geschlossen wird:

```javascript
function startFinalVoices() {
  stopVoices();
  const voicesDiv = document.getElementById('voices');
  voicesDiv.style.display = 'block';
  voicesDiv.innerHTML = '';
  const finalVoices = ["Schreib!","Schneller!","Perfektionismus!","Die Zeit läuft ab..."];
  voiceInterval = setInterval(() => {
    const v = document.createElement('div');
    v.className = 'voice';
    v.textContent = finalVoices[Math.floor(Math.random()*finalVoices.length)];
    v.style.left = Math.random()*100+'%';
    v.style.top = Math.random()*100+'%';
    v.style.color = 'rgba(255,150,150,0.9)';
    voicesDiv.appendChild(v);
    setTimeout(() => v.remove(), 4000);
  }, 1500);
}  // <-- Diese schließende Klammer muss vorhanden sein!
```

---

#### Fehler 4: Variable am falschen Ort deklariert
**Suchen nach** (am Ende der Datei, nach `</html>`):
```javascript
let portal3Active = false;
```

**Diese Zeile löschen** und stattdessen **am Anfang des Script-Bereichs** zu den anderen Variablen hinzufügen:

```javascript
<script>
  // === Globale Variablen ===
  let gameStarted = false;
  let currentChapter = 1;
  let portal1Active = false;
  let pathChosen = false;
  let aiUsed = false;
  let voiceInterval = null;
  let portal3Active = false;  // <-- Hier hinzufügen!
  let portal4Active = false;
  
  // Techno audio object
  const techno = {
    kickSynth: null,
    hatSynth: null,
    stabSynth: null,
    kickLoop: null,
    hatLoop: null,
    stabLoop: null,
    running: false
  };
  
  // ... rest des Codes
</script>
```

---

## Schritt 2: Browser-Cache leeren und neu laden

Nach den Korrekturen:
1. **Datei speichern**
2. **Browser-Cache leeren** (Strg+Shift+Del oder Cmd+Shift+Del)
3. **Seite neu laden** (F5 oder Strg+R / Cmd+R)
4. **JavaScript-Konsole öffnen** (F12), um zu prüfen, ob noch Fehler angezeigt werden

## Schritt 3: Testen

Nach dem Laden der Seite sollten Sie:
- ✅ Den Start-Button sehen
- ✅ Auf den Start-Button klicken können
- ✅ Die Erfahrung sollte starten
- ✅ Keine Fehler in der JavaScript-Konsole sehen

## Warum diese Fehler das Starten verhinderten

JavaScript ist sehr strikt bei Syntax. Diese 4 Fehler haben bewirkt, dass:

1. **Fehler 1** (`hno` statt `techno`): Die Variable `hno` existiert nicht → ReferenceError
2. **Fehler 2** (fehlende Klammer/Semikolon): Der Parser kann den Code nicht verarbeiten → SyntaxError
3. **Fehler 3** (fehlende schließende Klammer): Die Funktion ist nicht vollständig → SyntaxError
4. **Fehler 4** (Variable außerhalb des Scripts): Die Variable ist für den Code nicht zugänglich

Wenn auch nur **einer** dieser Fehler vorhanden ist, wird das **gesamte Script nicht ausgeführt**, und die `startExperience()` Funktion kann nicht aufgerufen werden.

## Zusätzliche Hilfe

Die vollständig korrigierten Code-Abschnitte finden Sie in:
- `08_Literatur/CORRECTED_CODE_SECTIONS.js`

Diese Datei enthält die kompletten, fehlerfreien Versionen der problematischen Funktionen, die Sie als Referenz verwenden können.

## Noch Probleme?

Wenn die Erfahrung immer noch nicht startet:
1. Öffnen Sie die JavaScript-Konsole (F12)
2. Notieren Sie alle Fehlermeldungen
3. Prüfen Sie, ob alle 4 Fixes korrekt angewendet wurden
4. Stellen Sie sicher, dass Tone.js geladen ist (sollte im `<head>` stehen)
