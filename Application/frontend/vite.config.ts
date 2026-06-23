import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { vitePrerenderPlugin } from 'vite-prerender-plugin';

export default defineConfig({
  plugins: [
    react(),
    vitePrerenderPlugin({
      prerenderScript: path.resolve(__dirname, 'src/prerender.tsx'),
      renderTarget: '#root',
      additionalPrerenderRoutes: ['/contact', '/explore', '/events'],
    }),
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  build: {
    target: 'es2019',
  },
  server: {
    port: 5173,
    proxy: {
      '/api': { target: 'http://localhost:8787', changeOrigin: true },
    },
  },
});
