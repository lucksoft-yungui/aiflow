import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

// https://vite.dev/config/
const editorDistPath = fileURLToPath(new URL('../dist/exports.esm.js', import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@lucksoft/aiflow-editor': editorDistPath,
    },
  },
  optimizeDeps: {
    exclude: ['@lucksoft/aiflow-editor'],
  },
})
