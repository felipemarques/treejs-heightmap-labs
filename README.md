# Three.js Heightmap Playground

Lightweight demo to turn a grayscale heightmap into a 3D terrain with Three.js, FPS movement, and a deterministic noise generator.

## What’s here
- `heightmaps/sample-heightmap.png`: generated with seed 1337 (Simplex fBm, slight island falloff).
- `scripts/generate_heightmap.py`: creates the heightmap using value/perlin/simplex noise (no external deps beyond Pillow).
- `index.html`: loads the heightmap, builds geometry directly from pixel data, and adds Pointer Lock controls (WASD + mouse).
- `examples/`: gallery of progressively more advanced demos (see below).

## Prereqs
- Python 3 with Pillow available (for regenerating heightmaps).
- Any static HTTP server to open `index.html` (required for module imports and image loading).

## Run the demo
```bash
python3 -m http.server 8000
```
Open http://localhost:8000 and click the canvas to capture the mouse.

Controls: click to lock, `WASD` to move, mouse to look, `Esc` to unlock, scroll/drag works when unlocked (Orbit).

## Generate a new heightmap
```bash
python3 scripts/generate_heightmap.py
```
Tweak in `scripts/generate_heightmap.py`:
- `NOISE_TYPE`: `"simplex"` (default), `"perlin"`, `"value"`.
- `SEED`, `SIZE`, `OCTAVES`, `PERSISTENCE`, `LACUNARITY`, `SCALE` for different terrain character.
- `falloff` function controls island-like borders.

The output overwrites `heightmaps/sample-heightmap.png`. Reload the page to see it.

## Examples
- `examples/example01`: Static heightmap → terrain mesh with Pointer Lock (WASD + jump), fog, lights, and starfield backdrop. Uses bilinear sampling to keep the player grounded.
- `examples/example02`: Procedural Simplex fBM heightmap, updated at load-time; Pointer Lock + Orbit blend; performance overlay (FPS, draws, tris, GPU, heap).
- `examples/example03`: Infinite procedural terrain streamed in chunks with multi-LOD meshes, central crosshair + HUD, and a low-poly zombie NPC that pursues the player.
- `examples/example04`: Procedural generation with Seed, Biomes (Plains/Relief), GUI controls (lil-gui) for terrain parameters, LOD, and Chunks. Includes "Back to Home" button.
- `examples/example05`: Procedural terrain with deterministic plains (by SEED), chunk streaming with LOD, and voxel houses spawned on plains. Configurable seed via URL hash.

## How the rendering works (base demo)
- Import map points `three` and `three/addons/` to the unpkg CDN, so no build step needed.
- The heightmap is read into a `Float32Array`; `PlaneGeometry` vertices get their y set from grayscale values, normals are recomputed.
- A bilinear sampler (`heightAt`) keeps the camera “grounded” by sampling the same height data used for the mesh.
- Lighting: hemisphere + directional with shadows; material uses the heightmap as a diffuse texture (no displacement in the shader).

## Ideas to extend
- Texture splat based on height/slope; add props (trees/rocks) via scattered noise.
- Mini-map or debug overlay showing camera height and slope.

---
*Examples created with the aid of AI: Antigravity + Models and VSCode CODEX extension.*
