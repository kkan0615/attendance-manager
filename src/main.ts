import { createApp } from 'vue'
import App from './App.vue'
/* Router */
import { router } from '@/router'
import '@/router/beforeEach'
/* Store */
import { store } from '@/store'
/* Bootstrap */
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
/* Tailwind */
import '@/styles/tailwind.scss'
/* init dummy data */
import { initDummyData } from '@/dummies'
initDummyData()

const app = createApp(App)

app
  .use(router)
  .use(store)
  .mount('#app')
