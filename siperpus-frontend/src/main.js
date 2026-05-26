// src/main.js — update untuk guards
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { setupGuards } from './router/guards'
import './assets/globals.css'
const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
setupGuards(router) // Setup guards SETELAH pinia diaktifkan
app.use(router)
app.mount('#app')