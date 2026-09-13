# 3dr Axis Labs — Next.js + React Three Fiber

A dark sci-fi/HUD themed rebuild of the 3dr Axis Labs site, built with Next.js
(App Router) and real WebGL 3D rendering via React Three Fiber / three.js —
not CSS tricks.

## What's real 3D here

- **Cursor drone**: a tiny X-frame cinewhoop-style quadcopter (ducted prop
  guards, spinning props, tilted FPV camera pod, red/green nav lights) that
  flies around the entire page, following your cursor with lag/easing,
  banking and pitching based on its direction of travel. It's a small
  (200×200px), transparent, click-through `<canvas>` moved via direct DOM
  transform (`components/CursorDrone.jsx`), loaded client-only via
  `components/CursorDroneLoader.jsx`. Currently placeholder geometry — see
  the note below on dropping in a real model. It automatically hides
  itself when your cursor is over the hero radar (see `radar-hitzone` in
  `CursorDrone.jsx`), and is hidden entirely on small screens since it
  needs a real pointer.
- **Hero radar mini-game**: click the pulsing contacts before they time
  out. `components/RadarGame.jsx` — pure CSS/React, no WebGL.
- **Services & Gallery**: CSS-only 3D transforms (perspective, tilt on
  hover, card flips) — lighter weight, no WebGL needed for simple cards.

### Swapping in your real drone model

`CursorDrone.jsx` currently builds the drone from primitive geometry
(boxes, spheres, cylinders) in the `DroneBody` component, so there's
nothing to download and it works instantly. Once you have a real model:

1. Export/convert it to `.glb` (the standard format for the web — if you
   only have `.fbx`/`.obj`/`.blend`, convert with Blender or
   [gltf.report](https://gltf.report)).
2. Drop it at `public/models/drone.glb`.
3. In `components/CursorDrone.jsx`, replace the `DroneBody` component with:

   ```jsx
   import { useGLTF } from "@react-three/drei";

   function DroneBody() {
     const { scene } = useGLTF("/models/drone.glb");
     return <primitive object={scene} scale={0.4} />;
   }
   ```

   (You'll need to add `"@react-three/drei"` import at the top if it isn't
   already there — it's already a dependency.)
4. Adjust the `scale` until it reads as "tiny drone" rather than a full
   ship — the follow/bank/bob logic in the `Drone()` component doesn't
   need to change.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To build for production:

```bash
npm run build
npm start
```

## Structure

```
app/
  layout.js       — root layout, fonts, metadata
  page.js          — assembles all sections
  globals.css      — design tokens + all styling
components/
  CursorDrone.jsx       — the cursor-following drone scene (placeholder geometry)
  CursorDroneLoader.jsx — client-only wrapper that lazy-loads CursorDrone
  SceneErrorBoundary.jsx — contains any 3D-scene crash so it can't break the rest of the page
  RadarGame.jsx    — hero radar mini-game (click contacts to score)
  Nav.jsx          — header with mobile menu toggle (client state)
  Hero.jsx
  Mission.jsx
  Services.jsx     — 6 service cards, CSS 3D tilt
  Gallery.jsx      — filterable, flip-card gallery (client state)
  Contact.jsx      — static form, not wired to a backend
  Footer.jsx
```

## Next steps you'll want to take

- **Real photos**: the gallery is placeholder gradient tiles. Swap the
  `.flip-front` content in `Gallery.jsx` for real `<Image>` components
  (Next.js's built-in image optimization) once you have project photos.
- **Contact form**: wired to your real Formspree endpoint
  (`formspree.io/f/xgaejabp`). Submissions land in the inbox tied to
  that Formspree account. Go into your Formspree dashboard once to
  confirm/verify the form if it asks — it usually requires one test
  submission before it starts forwarding emails.
- **Deploy**: this is a standard Next.js app — deploys directly to Vercel,
  Netlify, or any Node host.
- **3D drone model**: see "Swapping in your real drone model" above.
