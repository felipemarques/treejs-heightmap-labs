# Three.js Heightmap Playground

Demo leve para transformar um heightmap em escala de cinza em terreno 3D com Three.js, movimento FPS e gerador de ruído determinístico.

## O que tem aqui
- `heightmaps/sample-heightmap.png`: gerado com seed 1337 (Simplex fBm, leve queda radial tipo ilha).
- `scripts/generate_heightmap.py`: cria o heightmap usando ruído value/perlin/simplex (só precisa de Pillow).
- `index.html`: carrega o heightmap, monta a geometria direto dos pixels e adiciona Pointer Lock (WASD + mouse).
- `examples/`: galeria de demos mais avançados (veja abaixo).

## Pré-requisitos
- Python 3 com Pillow disponível (para regenerar heightmaps).
- Qualquer servidor HTTP estático para abrir `index.html` (necessário para módulos e carregamento da imagem).

## Rodar o demo
```bash
python3 -m http.server 8000
```
Abra http://localhost:8000 e clique no canvas para capturar o mouse.

Controles: clique para travar, `WASD` move, mouse olha, `Esc` destrava, scroll/drag funciona quando destravado (Orbit).

## Gerar novo heightmap
```bash
python3 scripts/generate_heightmap.py
```
Parâmetros em `scripts/generate_heightmap.py`:
- `NOISE_TYPE`: `"simplex"` (padrão), `"perlin"`, `"value"`.
- `SEED`, `SIZE`, `OCTAVES`, `PERSISTENCE`, `LACUNARITY`, `SCALE` para mudar o relevo.
- A função `falloff` controla borda tipo ilha.

Saída sobrescreve `heightmaps/sample-heightmap.png`. Recarregue a página para ver.

## Exemplos
- `examples/example01`: Heightmap estático → malha de terreno com Pointer Lock (WASD + pulo), névoa, luzes e starfield. Sampler bilinear mantém o player colado ao terreno.
- `examples/example02`: Heightmap procedural (Simplex fBM) calculado no carregamento; blend de Pointer Lock + Orbit; overlay de performance (FPS, draws, tris, GPU, heap).
- `examples/example03`: Terreno procedural infinito em chunks com multi-LOD, mira e HUD, mais um NPC zumbi low-poly que persegue o player.
- `examples/example04`: Geração procedural com Seed, Biomas (Planície/Relevo), controles GUI (lil-gui) para parâmetros do terreno, LOD e Chunks. Inclui botão "Voltar ao Início".
- `examples/example05`: Terreno procedural com planícies determinísticas (por SEED), streaming de chunks com LOD e casas voxel espalhadas nas planícies. Seed configurável via hash.

## Como o render funciona (demo base)
- Import map aponta `three` e `three/addons/` para o CDN unpkg, então não precisa build.
- O heightmap vira um `Float32Array`; o `PlaneGeometry` recebe y pelos pixels em escala de cinza, normals são recalculadas.
- Um sampler bilinear (`heightAt`) mantém a câmera “colada” ao chão usando os mesmos dados de altura da malha.
- Luzes: hemisphere + direcional com sombras; material usa o heightmap como textura difusa (sem displacement no shader).

## Ideias de extensão
- Splat de texturas por altura/inclinação; espalhar props (árvores/rochas) via ruído.
- Mini-mapa ou overlay de debug mostrando altura e inclinação da câmera.

---
*Exemplos criados com o auxílio de IA: Antigravity + Models and VSCode CODEX extension.*
