import Antd from 'ant-design-vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import './index.css'
import 'ant-design-vue/dist/reset.css'

const app = createApp(App)

app.use(router)
app.use(Antd)

app.mount('#app')
