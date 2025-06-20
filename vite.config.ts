import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(__dirname, 'node_modules/pdfjs-dist/build/pdf.worker.mjs'),
          dest: '.'
        }
      ]
    })
  ],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  server: {
    host: true,
    port: 5173,
    allowedHosts: true,
    fs: {
      allow: ['..']
    }
  },
  optimizeDeps: {
    include: ['react-pdf'],
    exclude: ['pdfjs-dist']
  },
  build: {
    rollupOptions: {
      external: ['canvas']
    }
  },
  define: {
    global: 'globalThis',
  }
});