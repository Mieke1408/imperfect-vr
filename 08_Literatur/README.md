# Literatur - Interactive VR Experience

A multi-chapter VR storytelling experience exploring themes of creativity, choice, and narrative.

## Features

### Chapter Overview
1. **Kapitel 1: Die Worte** - Introduction with floating letters and words
2. **Kapitel 2: Der Pfad** - The path forward
3. **Kapitel 3: Das Labyrinth** - Interactive story choices with **hover-based selection**
4. **Kapitel 4: Die Maschine** - AI terminal interaction
5. **Kapitel 5: Der Schreibtisch** - Final desk writing experience
6. **Kapitel 6: Das Ende** - Conclusion

### Hover-Based Interaction (Chapter 3)

In Chapter 3, the traditional click-based interaction has been replaced with a **hover-based selection system** as the primary interaction method, with **click as an accessible fallback**.

#### How It Works
- **Hover to Select**: Move your gaze (or mouse cursor) over any choice box
- **2-Second Timer**: Selection is triggered automatically after hovering for 2 seconds
- **Visual Feedback**: 
  - Box brightens from gray (#888) to green (#2ecc71) as you hover
  - Color transitions smoothly to show progress
  - Circular progress ring fills from 0° to 360° around the box
  - Final selection is marked with bright green
- **Cancellable**: Move away before the 2 seconds to cancel selection
- **Single Selection**: Only one box can be hovered at a time
- **Accessibility**: Click still works as a fallback for users who cannot use hover (assistive technologies, motor disabilities)

#### Implementation Details
- Uses `mouseenter` and `mouseleave` events for desktop compatibility
- **Accessibility**: `click` event maintained as fallback for assistive technologies
- Compatible with VR raycaster interactions
- Progress updates every 50ms for smooth visual feedback
- Prevents multiple simultaneous selections with `pathChosen` flag
- RGB color constants for maintainable code
- Proper newline handling in ending text display

### Technical Details

- Built with [A-Frame 1.4.0](https://aframe.io/)
- Uses [Tone.js](https://tonejs.github.io/) for audio
- VR-ready with WASD controls for desktop
- Responsive design with full-screen experience

## Controls

- **Desktop**: WASD to move, mouse to look around
- **VR**: Standard VR headset controls
- **Interaction**: 
  - Hover over objects for 2 seconds (Chapter 3 choices)
  - Click on other interactive elements (terminals, doors, portals)

## Running Locally

```bash
# Simple HTTP server
python3 -m http.server 8000

# Or with Node.js
npx http-server
```

Then open `http://localhost:8000/index.html` in your browser.

## Browser Compatibility

- Chrome/Edge (recommended for VR)
- Firefox
- Safari (limited VR support)

## License

Part of the Imperfect VR project.
