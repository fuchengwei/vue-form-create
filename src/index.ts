import { App } from 'vue'
import DesignForm from '@/components/DesignForm.vue'
import Icons from '@/icons'
import '@/styles/index.styl'

Icons.install()

DesignForm.install = (app: App) => {
  app.component(DesignForm.name, DesignForm)
}

const components = [DesignForm]

const install = (app: App) => {
  components.forEach(component => app.component(component.name, component))
}

export { install, DesignForm }

export default {
  install,
  DesignForm
}
