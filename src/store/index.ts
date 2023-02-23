import { zhCn } from 'element-plus/lib/locales'

import type { ConfigProviderProps, FormProps } from 'element-plus'
import type { Component } from '@/config'

export interface State {
  selectWidgetItem?: Component
  widgetFormList: Component[]
  globalConfig: Omit<ConfigProviderProps, 'a11y' | 'namespace' | 'keyboardNavigation'>
  globalCss: string
  globalClass: string
  globalStyle: string
  globalState: Record<string, any>
  formConfig: FormProps
  formEvents: Record<string, string>
}

export const state = reactive<State>({
  widgetFormList: [],
  globalConfig: {
    locale: zhCn,
    size: 'default',
    button: {
      autoInsertSpace: false
    },
    message: {}
  },
  globalCss: '',
  globalClass: '[]',
  globalStyle: '{}',
  globalState: {},
  formConfig: {
    labelPosition: 'right',
    requireAsteriskPosition: 'left',
    labelWidth: '',
    labelSuffix: '',
    inline: false,
    inlineMessage: false,
    statusIcon: false,
    showMessage: true,
    disabled: false,
    validateOnRuleChange: true,
    hideRequiredAsterisk: false,
    scrollToError: false
  },
  formEvents: {
    validate: 'function click(prop, isValid, message, formInstance, formModel, state) {}'
  }
})
