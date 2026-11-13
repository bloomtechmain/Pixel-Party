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
    // Pages Functions run under `npm run dev:functions` (wrangler on :8788).
    proxy: { '/api': 'http://localhost:8788' },
  },
});
