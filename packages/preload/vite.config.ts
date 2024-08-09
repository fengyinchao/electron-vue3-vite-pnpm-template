import vue from '@vitejs/plugin-vue'
import { builtinModules } from 'module'
import { defineConfig } from 'vite'

import pkg from '../../package.json'
import path from 'path'

export default defineConfig({
  root: __dirname,
  base: './',
  resolve: {
    alias: {
      '@common': path.join(__dirname, '../common'),
    },
  },
  build: {
    outDir: '../../dist/preload',
    lib: {
      entry: 'index.ts',
      formats: ['cjs'],
      fileName: () => '[name].cjs',
    },
    sourcemap: true,
    minify: process.env.NODE_ENV === 'production',
    emptyOutDir: true,
    rollupOptions: {
      external: ['electron', ...builtinModules, ...Object.keys(pkg.dependencies || {})],
    },
  },
  plugins: [vue()],
})
