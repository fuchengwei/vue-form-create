import { App, DefineComponent } from 'vue'

declare namespace FormCreate {
  export function install(app: App): void
  export const AntdDesignForm: DefineComponent
  export const AntdGenerateForm: DefineComponent
  export const ElDesignForm: DefineComponent
  export const ElGenerateForm: DefineComponent
}

export as namespace FormCreate

export = FormCreate
