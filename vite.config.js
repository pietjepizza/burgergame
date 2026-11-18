import { defineConfig } from 'vite';

// base './' zorgt dat het spel werkt op GitHub Pages (https://<naam>.github.io/burgergame/)
export default defineConfig({
  base: './',
  build: { outDir: 'dist', assetsInlineLimit: 0 },
});
