"""Generate a deterministic grayscale heightmap using procedural noise.

- Uses only the standard library plus Pillow (PIL).
- Produces a 512x512 PNG at heightmaps/sample-heightmap.png
- Controlled by a fixed seed for repeatability.
- Supports noise types: value (old), perlin, simplex (default).
"""

from __future__ import annotations

import math
import random
from pathlib import Path
from typing import Callable

from PIL import Image


SIZE = 512
SEED = 1337
OCTAVES = 6
PERSISTENCE = 0.5
LACUNARITY = 2.0
SCALE = 0.008
NOISE_TYPE = "simplex"  # options: "simplex", "perlin", "value"
OUTPUT_PATH = Path(__file__).resolve().parent.parent / "heightmaps" / "sample-heightmap.png"


def lerp(a: float, b: float, t: float) -> float:
    return a + (b - a) * t


def clamp(value: float, low: float = 0.0, high: float = 1.0) -> float:
    return max(low, min(high, value))


def hash_noise(xi: int, yi: int, seed: int) -> float:
    """Cheap, deterministic pseudo-random in [-1, 1] for a grid coordinate."""
    n = xi * 374761393 + yi * 668265263 + seed * 7000189
    n = (n ^ (n >> 13)) & 0xFFFFFFFF
    n = (n * 1274126177) & 0xFFFFFFFF
    return 1.0 - (n / 2147483648.0)


def value_noise(x: float, y: float, seed: int) -> float:
    """Bilinear-interpolated value noise for smoother transitions."""
    x0 = math.floor(x)
    y0 = math.floor(y)
    x_frac = x - x0
    y_frac = y - y0

    v00 = hash_noise(x0, y0, seed)
    v10 = hash_noise(x0 + 1, y0, seed)
    v01 = hash_noise(x0, y0 + 1, seed)
    v11 = hash_noise(x0 + 1, y0 + 1, seed)

    i1 = lerp(v00, v10, x_frac)
    i2 = lerp(v01, v11, x_frac)
    return lerp(i1, i2, y_frac)


class Perlin2D:
    """Improved Perlin noise in 2D with seeded permutation."""

    def __init__(self, seed: int) -> None:
        rng = random.Random(seed)
        p = list(range(256))
        rng.shuffle(p)
        self.perm = p * 2

    @staticmethod
    def fade(t: float) -> float:
        return t * t * t * (t * (t * 6 - 15) + 10)

    @staticmethod
    def grad(hash_val: int, x: float, y: float) -> float:
        h = hash_val & 3
        u = x if h < 2 else y
        v = y if h < 2 else x
        return (u if (h & 1) == 0 else -u) + (v if (h & 2) == 0 else -v)

    def noise(self, x: float, y: float) -> float:
        xi = math.floor(x) & 255
        yi = math.floor(y) & 255
        xf = x - math.floor(x)
        yf = y - math.floor(y)

        u = self.fade(xf)
        v = self.fade(yf)

        aa = self.perm[self.perm[xi] + yi]
        ab = self.perm[self.perm[xi] + yi + 1]
        ba = self.perm[self.perm[xi + 1] + yi]
        bb = self.perm[self.perm[xi + 1] + yi + 1]

        x1 = lerp(self.grad(aa, xf, yf), self.grad(ba, xf - 1, yf), u)
        x2 = lerp(self.grad(ab, xf, yf - 1), self.grad(bb, xf - 1, yf - 1), u)
        return lerp(x1, x2, v)


class Simplex2D:
    """2D Simplex noise (Gustavson) with seeded permutation."""

    F2 = 0.5 * (math.sqrt(3.0) - 1.0)
    G2 = (3.0 - math.sqrt(3.0)) / 6.0
    grad3 = (
        (1, 1, 0),
        (-1, 1, 0),
        (1, -1, 0),
        (-1, -1, 0),
        (1, 0, 1),
        (-1, 0, 1),
        (1, 0, -1),
        (-1, 0, -1),
        (0, 1, 1),
        (0, -1, 1),
        (0, 1, -1),
        (0, -1, -1),
    )

    def __init__(self, seed: int) -> None:
        rng = random.Random(seed)
        p = list(range(256))
        rng.shuffle(p)
        self.perm = p * 2
        self.perm_mod12 = [v % 12 for v in self.perm]

    def noise(self, xin: float, yin: float) -> float:
        s = (xin + yin) * self.F2
        i = math.floor(xin + s)
        j = math.floor(yin + s)
        t = (i + j) * self.G2
        x0 = xin - (i - t)
        y0 = yin - (j - t)

        if x0 > y0:
            i1, j1 = 1, 0
        else:
            i1, j1 = 0, 1

        x1 = x0 - i1 + self.G2
        y1 = y0 - j1 + self.G2
        x2 = x0 - 1.0 + 2.0 * self.G2
        y2 = y0 - 1.0 + 2.0 * self.G2

        ii = i & 255
        jj = j & 255
        g0 = self.perm_mod12[ii + self.perm[jj]]
        g1 = self.perm_mod12[ii + i1 + self.perm[jj + j1]]
        g2 = self.perm_mod12[ii + 1 + self.perm[jj + 1]]

        n0 = 0.0
        n1 = 0.0
        n2 = 0.0

        t0 = 0.5 - x0 * x0 - y0 * y0
        if t0 >= 0:
            t0 *= t0
            gx, gy, _ = self.grad3[g0]
            n0 = t0 * t0 * (gx * x0 + gy * y0)

        t1 = 0.5 - x1 * x1 - y1 * y1
        if t1 >= 0:
            t1 *= t1
            gx, gy, _ = self.grad3[g1]
            n1 = t1 * t1 * (gx * x1 + gy * y1)

        t2 = 0.5 - x2 * x2 - y2 * y2
        if t2 >= 0:
            t2 *= t2
            gx, gy, _ = self.grad3[g2]
            n2 = t2 * t2 * (gx * x2 + gy * y2)

        return 70.0 * (n0 + n1 + n2)


def choose_noise() -> Callable[[float, float], float]:
    if NOISE_TYPE == "simplex":
        simplex = Simplex2D(SEED)

        def fn(x: float, y: float) -> float:
            return simplex.noise(x, y)

        return fn
    if NOISE_TYPE == "perlin":
        perlin = Perlin2D(SEED)

        def fn(x: float, y: float) -> float:
            return perlin.noise(x, y)

        return fn

    def fn(x: float, y: float) -> float:
        return value_noise(x, y, SEED)

    return fn


def fbm(x: float, y: float, noise_fn: Callable[[float, float], float]) -> float:
    """Fractal Brownian motion over the chosen base noise."""
    amplitude = 1.0
    frequency = 1.0
    total = 0.0
    amp_sum = 0.0

    for octave in range(OCTAVES):
        total += amplitude * noise_fn(x * frequency, y * frequency)
        amp_sum += amplitude
        amplitude *= PERSISTENCE
        frequency *= LACUNARITY

    return total / amp_sum if amp_sum else 0.0


def falloff(x: int, y: int, size: int) -> float:
    """Radial falloff keeps edges lower to hint at an island silhouette."""
    half = size / 2.0
    dx = (x - half) / half
    dy = (y - half) / half
    r = math.sqrt(dx * dx + dy * dy)
    return clamp(1.0 - r * 0.9)


def generate() -> None:
    img = Image.new("L", (SIZE, SIZE))
    pixels = img.load()
    noise_fn = choose_noise()

    for y in range(SIZE):
        for x in range(SIZE):
            n = fbm(x * SCALE, y * SCALE, noise_fn)
            n = (n + 1.0) * 0.5  # normalize from [-1, 1] to [0, 1]

            shape = falloff(x, y, SIZE)
            height = clamp(n * 0.8 + shape * 0.3)
            height = clamp(height**1.15)  # gentle bias toward lower plains

            pixels[x, y] = int(height * 255)

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    img.save(OUTPUT_PATH)
    print(f"Saved: {OUTPUT_PATH} using {NOISE_TYPE} noise")


if __name__ == "__main__":
    generate()
