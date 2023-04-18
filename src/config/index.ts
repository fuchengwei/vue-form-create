export interface Component {
  key?: string
  label: string
  type: string
  customClass: string
  customStyle: string
  dynamicProps: string
  dynamicFormItemProps?: string
  events?: Record<string, string>
  config: Record<string, any>
  remoteConfig?: Record<string, any>
  formItemConfig?: Record<string, any>
  childNodes?: Component[]
}

export interface ComponentGroup {
  title: string
  components: Component[]
}

export const componentConfigMap: Record<string, any> = {}

Object.values(
  import.meta.glob('./*.vue', {
    import: 'default',
    eager: true
  })
).forEach((componentConfig: any) => (componentConfigMap[componentConfig.name] = componentConfig))

const basicComponents: Component[] = [
  {
    label: '按钮',
    type: 'Button',
    customClass: '[]',
    customStyle: '{}',
    dynamicProps: '{}',
    events: {
      click: 'function click(event, formInstance, formModel, state) {}'
    },
    config: {
      content: '按钮',
      size: undefined,
      type: undefined,
      plain: false,
      text: false,
      bg: false,
      link: false,
      round: false,
      circle: false,
      loading: false,
      disabled: false,
      autofocus: false,
      nativeType: 'button',
      autoInsertSpace: undefined,
      color: '',
      isHidden: false
    }
  },
  {
    label: '图标',
    type: 'Icon',
    customClass: '[]',
    customStyle: '{}',
    dynamicProps: '{}',
    events: {
      click: 'function click(event, formInstance, formModel, state) {}'
    },
    config: {
      name: '',
      size: '30px',
      color: '',
      isHidden: false
    }
  }
]

export default [
  {
    title: '基础组件',
    components: basicComponents
  }
] as ComponentGroup[]
