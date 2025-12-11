import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/atleteOS/', // Usar ruta relativa hace que funcione en cualquier subcarpeta o nombre de repo
});