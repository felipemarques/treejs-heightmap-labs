import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Relative base for GitHub Pages compatibility
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        example01: resolve(__dirname, 'examples/example01/index.html'),
        example02: resolve(__dirname, 'examples/example02/index.html'),
        example03: resolve(__dirname, 'examples/example03/index.html'),
        example04: resolve(__dirname, 'examples/example04/index.html'),
        example05: resolve(__dirname, 'examples/example05/index.html'),
      },
    },
  },
});
