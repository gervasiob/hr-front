
import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia'; // Importa Pinia
import App from './App.vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import { router, setupDynamicRoutes } from '@/router';
import localStoragePlugin from './plugins/localStoragePlugin';

async function bootstrapApp() {
    await setupDynamicRoutes(); // ⬅️ carga rutas desde backend

    const app = createApp(App);
    const pinia = createPinia(); // Crea una instancia de Pinia

    app.use(localStoragePlugin);
    app.use(pinia); // Usa Pinia en tu aplicación
    app.use(router);
    app.use(Antd);
    app.mount('#app');
}

bootstrapApp();
