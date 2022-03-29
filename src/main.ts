import { createApp } from 'vue'
import { i18n } from '@/locale'
import { createPinia } from 'pinia'
import { router } from '@/router'
import '@/router/beforeRoute'
import App from './App.vue'
/* Quasar */
import { Quasar, Dialog, Notify } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
/* Tailwind */
import '@/styles/libs/tailwind.css'

const app = createApp(App)
app
  .use(i18n)
  .use(Quasar, {
    plugins: {
      Notify,
      Dialog,
    }
  })
  .use(createPinia())
  .use(router)
  .mount('#app')
