/**
 * astro.config.mjs
 * Konfigurasi final — Server rendering via Vercel adapter
 * API routes membutuhkan server mode, halaman tetap bisa prerender
 */
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  site: 'https://cloudsi.vercel.app',
  prefetch: true,
  integrations: [
    tailwind(),
    sitemap()
  ],
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/ogl')) {
              return 'ogl';
            }
          }
        }
      }
    }
  },
});

