import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { createPinia } from 'pinia';
import { loadFonts } from './plugins/webfontloader'

const pinia = createPinia();
loadFonts()

createApp(App)
  .use(vuetify)
  .use(pinia)
  .mount('#app')
