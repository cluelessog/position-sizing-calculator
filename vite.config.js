import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // Ensure this points correctly to your `src` folder
    },
  },
  base: "position-sizing-calculator"
});
