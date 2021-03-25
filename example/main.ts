import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import DesignForm from '../src/designForm'
import 'ant-design-vue/dist/antd.css'

createApp(App)
  .use(Antd)
  .use(DesignForm)
  .mount('#app')
