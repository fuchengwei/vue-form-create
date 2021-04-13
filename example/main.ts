import { createApp } from 'vue'
import antd from 'ant-design-vue'
import element from 'element-plus'
import App from './App.vue'
import DesignForm from '../src'
import 'ant-design-vue/dist/antd.css'
import 'element-plus/lib/theme-chalk/index.css'

createApp(App)
  .use(antd)
  .use(element)
  .use(DesignForm)
  .mount('#app')
