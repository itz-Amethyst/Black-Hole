import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  root: 'src/Galaxy1/',
  build: {
    // Relative to the root
    outDir: '../dist',
  },
  publicDir: '../static',
  plugins: [glsl()]
});