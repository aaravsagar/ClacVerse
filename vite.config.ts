import { defineConfig } from 'vite'
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron-renderer'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    electron([
      {
        entry: 'src/main/main.ts',
      }
    ]),
    renderer()
  ],
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
})