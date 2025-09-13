import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vuetify from '@/plugins/vuetify'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(vuetify)
app.mount('#app')