import { App } from 'vue'
import AntdDesignForm from './core/antd/AntdDesignForm.vue'
import AntdGenerateForm from './core/antd/AntdGenerateForm.vue'
import ElDesignForm from './core/element/ElDesignForm.vue'
import ElGenerateForm from './core/element/ElGenerateForm.vue'
import Icons from './icons'
import './styles/index.styl'

Icons.install()

AntdDesignForm.install = (app: App) => {
  app.component(AntdDesignForm.name, AntdDesignForm)
}

AntdGenerateForm.install = (app: App) => {
  app.component(AntdGenerateForm.name, AntdGenerateForm)
}

ElDesignForm.install = (app: App) => {
  app.component(ElDesignForm.name, ElDesignForm)
}

ElGenerateForm.install = (app: App) => {
  app.component(ElGenerateForm.name, ElGenerateForm)
}

const components = [
  AntdDesignForm,
  AntdGenerateForm,
  ElDesignForm,
  ElGenerateForm
]

const install = (app: App) => {
  components.forEach(component => app.component(component.name, component))
}

export {
  install,
  AntdDesignForm,
  AntdGenerateForm,
  ElDesignForm,
  ElGenerateForm
}

export default {
  install,
  AntdDesignForm,
  AntdGenerateForm,
  ElDesignForm,
  ElGenerateForm
}
