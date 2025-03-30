import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/front/', // 👈 importante si no está en raíz
  build: {
    target: 'esnext'
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: process.env.PORT || 3000,
    strictPort: true
  },
  preview: {
    port: process.env.PORT || 3000,
    strictPort: true
  }
})
