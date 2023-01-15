import { resolve } from 'path'
import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

const root = resolve(__dirname , 'src')
const outDir = resolve(__dirname , 'dist')

export default defineConfig({
  root,
  build: {
    // Relative to the root
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input:{
        main: resolve(root ,'index.html'),
        second: resolve(root ,'Galaxy2', 'index.html')
      }
    }
  },
  publicDir: '../static',
  plugins: [glsl()]
});