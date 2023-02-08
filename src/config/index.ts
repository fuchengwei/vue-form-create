export interface Component {
  key?: string
  label: string
  type: string
  customClass: string
  customStyle: string
  dynamicProps?: string
  dynamicFormItemProps?: string
  events?: Record<string, string>
  config: Record<string, any>
  remoteConfig?: Record<string, any>
  formItemConfig?: Record<string, any>
  childNodes?: Component[]
}
