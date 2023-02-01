import { createApp } from 'vue'
import DesignForm from '@/core/design-form.vue'
import 'virtual:svg-icons-register'
import './styles/index.css'

const app = createApp(DesignForm)
app.mount('#root')
