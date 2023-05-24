import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/my-app',
  plugins: [Vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // 'vue-router': fileURLToPath(new URL('../router/src', import.meta.url)),
    },
  },
  server: {
    open: true,
    port: 5173,
    host: '0.0.0.0',
    proxy: {
      '/my-app': {
        target: 'http://10.11.131.129:6222',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/profile/, '')
      }
    }
  },
  define: {
    __DEV__: JSON.stringify(!process.env.prod),
    __BROWSER__: 'true',
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  },
})
