import { App } from 'vue'
import AntdDesignForm from '@/core/AntdDesignForm.vue'
import Icons from '@/icons'
import '@/styles/index.styl'

declare global {
  interface Window {
    Vue: App
  }
}

Icons.install()

AntdDesignForm.install = (app: App) => {
  app.component(AntdDesignForm.name, AntdDesignForm)
}

const components = [AntdDesignForm]

const install = (app: App) => {
  components.forEach(component => app.component(component.name, component))
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export { install, AntdDesignForm }

export default {
  install,
  AntdDesignForm
}
