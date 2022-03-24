import { createApp } from 'vue'
import App from './App.vue'
/* Quasar */
import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
/* Tailwind */
import '@/styles/libs/tailwind.css'

const app = createApp(App)
app
  .use(Quasar, {
    plugins: {}
  })
  .mount('#app')
