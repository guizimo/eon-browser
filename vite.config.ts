import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'

// https://vitejs.dev/config/
// vite-plugin-electron https://github.com/electron-vite/vite-plugin-electron/tree/main/packages/electron#vite-plugin-electron
export default defineConfig({
  plugins: [
    vue(),
    electron({
      main: {
        entry: 'electron/main.ts'
      }
    })
  ]
})
