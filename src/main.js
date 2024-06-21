import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import { router } from '@/router';
import ZoomOnHover from "vue-zoom-on-hover";

const app = createApp(App);

app.use(ZoomOnHover);
app.use(router);
app.use(Antd).mount('#app');