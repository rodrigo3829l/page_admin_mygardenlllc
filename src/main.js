import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { createPinia } from 'pinia';
import { loadFonts } from './plugins/webfontloader'
import { useUserStore } from './store/userStore';
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import router from './router/router';

const pinia = createPinia();
loadFonts()

createApp(App)
  .use(vuetify)
  .use(pinia)
  .use(router)
  .use(Vue3Toastify, {
    autoClose: 3000, // Configuraciones globales (opcional)
  })
  .mount('#app')

const userStore = useUserStore()
userStore.initializeStore()