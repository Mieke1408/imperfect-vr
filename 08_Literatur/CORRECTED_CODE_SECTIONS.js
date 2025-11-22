// CORRECTED CODE SECTIONS FOR "index copy.html"
// These sections replace the buggy code in the original file

// ============================================================
// SECTION 1: startTechno() - Fixed variable name typo
// ============================================================
function startTechno() {
  try {
    if (techno.running) return;
    
    if (!techno.kickSynth) {
      techno.kickSynth = new Tone.MembraneSynth({
        pitchDecay: 0.05,
        octaves: 8,
        oscillator: { type: 'sine' },
        envelope: { attack: 0.001, decay: 0.4, sustain: 0.01, release: 1.4 }
      }).toDestination();
    }
    
    if (!techno.hatSynth) {
      techno.hatSynth = new Tone.MetalSynth({
        frequency: 200,
        envelope: { attack: 0.001, decay: 0.1, release: 0.01 },
        harmonicity: 5.1,
        modulationIndex: 32,
        resonance: 4000,
        octaves: 1.5
      }).toDestination();
      techno.hatSynth.volume.value = -12;
    }
    
    if (!techno.stabSynth) {
      techno.stabSynth = new Tone.Synth({
        oscillator: { type: 'sawtooth' },
        envelope: { attack: 0.005, decay: 0.1, sustain: 0.3, release: 1 }
      }).toDestination();
      techno.stabSynth.volume.value = -6;
    }

    // KICK: 1 pro Sekunde (Herzschlag)
    techno.kickLoop = new Tone.Loop(time => {
      techno.kickSynth.triggerAttackRelease('C1', '8n', time);
    }, '1s');

    // HAT: leichte Akzente zwischen Herzschlägen
    // FIXED: Changed "hno.hatLoop" to "techno.hatLoop"
    techno.hatLoop = new Tone.Loop(time => {
      // leichte Akzente zwischen Herzschlägen
      techno.hatSynth.triggerAttackRelease('16n', time + 0.5);
      techno.hatSynth.triggerAttackRelease('16n', time + 0.75);
    }, '1s');

    // sparse Stabs synchronisiert (alle 2 Takte)
    let stabCount = 0;
    techno.stabLoop = new Tone.Loop(time => {
      if ((stabCount % 4) === 0) {
        techno.stabSynth.triggerAttackRelease(['E3','G3','C3'][Math.floor(Math.random()*3)], '2n', time);
      }
      stabCount++;
    }, '2s');

    // Setting: langsamer BPM, bedrohlich
    Tone.Transport.bpm.value = 60;
    Tone.Transport.start();
    techno.kickLoop.start(0);
    techno.hatLoop.start(0);
    techno.stabLoop.start(0);

    techno.running = true;
  } catch (e) {
    console.warn('startTechno failed', e);
  }
}

// ============================================================
// SECTION 2: startFinalVoices() - Fixed incomplete statement and closing brace
// ============================================================
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
    // FIXED: Added closing parenthesis and semicolon
    voicesDiv.appendChild(v);
    setTimeout(() => v.remove(), 4000);
  }, 1500);
  // FIXED: Added closing brace for the function
}

// ============================================================
// SECTION 3: Variable declarations - Should be at the top of script
// ============================================================
// These should be declared with other global variables at the beginning of the script section:

let gameStarted = false;
let currentChapter = 1;
let portal1Active = false;
let pathChosen = false;
let aiUsed = false;
let voiceInterval = null;
let portal3Active = false;  // FIXED: Moved from after </html> tag to proper location

// Note: If your code also uses portal4Active, declare it here as well:
// let portal4Active = false;

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
