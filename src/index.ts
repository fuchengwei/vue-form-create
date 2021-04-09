import { App } from 'vue'
import AntdDesignForm from '@/core/AntdDesignForm.vue'
import AntdGenerateForm from '@/core/AntdGenerateForm.vue'
import Icons from '@/icons'
import '@/styles/index.styl'

Icons.install()

AntdDesignForm.install = (app: App) => {
  app.component(AntdDesignForm.name, AntdDesignForm)
}

AntdGenerateForm.install = (app: App) => {
  app.component(AntdGenerateForm.name, AntdGenerateForm)
}

const components = [AntdDesignForm, AntdGenerateForm]

const install = (app: App) => {
  components.forEach(component => app.component(component.name, component))
}

export { install, AntdDesignForm, AntdGenerateForm }

export default {
  install,
  AntdDesignForm,
  AntdGenerateForm
}
