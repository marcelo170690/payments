import { createApp } from 'vue'
import './assets/style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css'


import { createWebHistory, createRouter } from 'vue-router'

import { routes } from './routes';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App)
  .use(router)
  .use(ToastService)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: true,
      }
    }
  })
  .mount('#app')
