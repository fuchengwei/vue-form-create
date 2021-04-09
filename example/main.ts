import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import DesignForm from '../src'

window.addEventListener('DOMContentLoaded', () => {
  createApp(App)
    .use(Antd)
    .use(DesignForm)
    .mount('#app')
})
