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
  },
  {
    label: '文本',
    type: 'Text',
    customClass: '[]',
    customStyle: '{}',
    dynamicProps: '{}',
    events: {
      click: 'function click(event, formInstance, formModel, state) {}'
    },
    config: {
      content: '文本',
      type: undefined,
      size: 'default',
      truncated: false,
      tag: 'span'
    }
  },
  {
    label: '链接',
    type: 'Link',
    customClass: '[]',
    customStyle: '{}',
    dynamicProps: '{}',
    events: {
      click: 'function click(event, formInstance, formModel, state) {}'
    },
    config: {
      content: '链接',
      type: 'default',
      underline: true,
      disabled: false,
      href: '',
      icon: ''
    }
  }
]

const otherComponents: Component[] = [
  {
    label: '分割线',
    type: 'Divider',
    customClass: '[]',
    customStyle: '{}',
    dynamicProps: '{}',
    config: {
      content: '分割线',
      direction: 'horizontal',
      borderStyle: 'solid',
      contentPosition: 'center'
    }
  }
]

export default [
  {
    title: 'Basic 基础组件',
    components: basicComponents
  },
  {
    title: 'Others 其他组件',
    components: otherComponents
  }
] as ComponentGroup[]
