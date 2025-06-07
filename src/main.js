import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import { router, setupDynamicRoutes } from '@/router'
import localStoragePlugin from './plugins/localStoragePlugin'

async function bootstrapApp() {
    await setupDynamicRoutes(); // ⬅️ carga rutas desde backend

    const app = createApp(App);
    app.use(localStoragePlugin);
    app.use(router);
    app.use(Antd);
    app.mount('#app');
}

bootstrapApp();
