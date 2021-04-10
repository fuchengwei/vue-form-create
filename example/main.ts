import { createApp } from 'vue'
import antd from 'ant-design-vue'
import App from './App.vue'
import DesignForm from '../src'
import 'ant-design-vue/dist/antd.css'

createApp(App)
  .use(antd)
  .use(DesignForm)
  .mount('#app')
