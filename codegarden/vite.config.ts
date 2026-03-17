import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/pyodide/*',
          dest: 'assets/pyodide',
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@engine': path.resolve(__dirname, 'src/engine'),
      '@sandbox': path.resolve(__dirname, 'src/sandbox'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@data': path.resolve(__dirname, 'src/data'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
    },
  },
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
  preview: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          monaco: ['monaco-editor', '@monaco-editor/react'],
          three: ['three'],
          pyodide: ['pyodide'],
        },
      },
    },
  },
  worker: {
    format: 'es',
    rollupOptions: {
      external: [/\/assets\/pyodide\/.*/],
    },
  },
})
