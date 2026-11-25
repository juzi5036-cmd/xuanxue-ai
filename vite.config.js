import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
  build: {
    modulePreload: false,
    target: 'es2015',
    rollupOptions: {
      output: {
        format: 'iife',
      },
    },
  },
})
