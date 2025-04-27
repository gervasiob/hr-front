import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import { router } from '@/router'
import localStoragePlugin from './plugins/localStoragePlugin'

const app = createApp(App)

app.use(localStoragePlugin)
app.use(router)
app.use(Antd).mount('#app')