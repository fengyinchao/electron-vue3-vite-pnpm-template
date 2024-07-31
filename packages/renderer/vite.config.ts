import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import renderer from 'vite-plugin-electron-renderer'

// https://vitejs.dev/config/
export default defineConfig({
  mode: process.env.NODE_ENV,
  root: __dirname,
  plugins: [vue(), renderer()],
  base: './',
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
      '@common': path.join(__dirname, '../common'),
      '@type': path.join(__dirname, '../types'),
    },
  },
  build: {
    emptyOutDir: true,
    sourcemap: true,
    outDir: '../../dist/renderer',
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
})
