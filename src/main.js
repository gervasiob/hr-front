import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import { router } from '@/router';

import localStoragePlugin from './plugins/localStoragePlugin';

// import axios from 'axios';

// const token = localStorage.getItem('token');
// if (token) {
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// }
const app = createApp(App);

app.use(localStoragePlugin);
app.use(router);
app.use(Antd).mount('#app');