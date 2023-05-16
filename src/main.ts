import { createApp } from 'vue'
import { ElRow, ElCol } from 'element-plus'
import DesignForm from '@/core/design-form.vue'
import 'element-plus/lib/components/row/style/css'
import 'element-plus/lib/components/col/style/css'
import 'virtual:svg-icons-register'
import './styles/index.css'

const app = createApp(DesignForm)

app.component('el-row', ElRow)
app.component('el-col', ElCol)

app.mount('#root')
