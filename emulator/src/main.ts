import { createApp } from 'vue'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

declare global {
  interface Window {
    bridge: any
  }
}

createApp(App).mount('#app')
