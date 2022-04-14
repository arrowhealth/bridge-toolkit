import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'import.meta.env.EMULATOR_VERSION': JSON.stringify(process.env.npm_package_version),
  },
  server: {
    port: 4000,
  },
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    vue(),
    Unocss(),
  ]
})
