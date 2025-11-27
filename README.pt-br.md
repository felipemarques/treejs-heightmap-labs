# Three.js Heightmap Playground

Demo leve para transformar um heightmap em escala de cinza em terreno 3D com Three.js, movimento FPS e gerador de ruído determinístico.

## O que tem aqui
- `heightmaps/sample-heightmap.png`: gerado com seed 1337 (Simplex fBm, leve queda radial tipo ilha).
- `scripts/generate_heightmap.py`: cria o heightmap usando ruído value/perlin/simplex (só precisa de Pillow).
- `index.html`: carrega o heightmap, monta a geometria direto dos pixels e adiciona Pointer Lock (WASD + mouse).

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

## Como o render funciona
- Import map aponta `three` e `three/addons/` para o CDN unpkg, então não precisa build.
- O heightmap vira um `Float32Array`; o `PlaneGeometry` recebe y pelos pixels em escala de cinza, normals são recalculadas.
- Um sampler bilinear (`heightAt`) mantém a câmera “colada” ao chão usando os mesmos dados de altura da malha.
- Luzes: hemisphere + direcional com sombras; material usa o heightmap como textura difusa (sem displacement no shader).

## Ideias de extensão
- Splat de texturas por altura/inclinação; espalhar props (árvores/rochas) via ruído.
- Terreno em tiles com LOD para mapas maiores.
- Mini-mapa ou overlay de debug mostrando altura e inclinação da câmera.
