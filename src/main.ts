import './assets/main.css'

import { createApp } from 'vue'
import router from './router/index';
import Antd from 'ant-design-vue'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(Antd)
app.mount('#app')