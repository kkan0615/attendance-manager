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
/* Custom Styles */
import '@/styles/index.scss'
/* Dayjs */
import { initDayjs } from '@/utils/libs/dayjs'
initDayjs()
/* Datepicker */
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
/* Devextreme */
import 'devextreme/dist/css/dx.material.orange.light.compact.css'

/* Dummy */
import { initAllDummy } from '@/dummies'
if (import.meta.env.VITE_IS_USE_DUMMY) {
  initAllDummy()
}

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
  .component('date-picker', Datepicker)
  .mount('#app')
