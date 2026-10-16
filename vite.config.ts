/**
 * vite.config.ts — Vite (хөгжүүлэлтийн сервер ба build хэрэгсэл)-ийн тохиргоо.
 *
 * react() — React/JSX дэмжлэг, tailwindcss() — Tailwind CSS.
 * manualChunks — React сангуудыг тусдаа файл (vendor) болгож, хөтөч кэшлэхэд хялбар болгоно.
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});
