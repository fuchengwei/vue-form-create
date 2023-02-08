import { zhCn } from 'element-plus/lib/locales'

import type { ConfigProviderProps, FormProps } from 'element-plus'
import type { Component } from '@/config'

export interface State {
  selectWidgetItem?: Component
  globalConfig: Omit<ConfigProviderProps, 'a11y' | 'namespace' | 'keyboardNavigation'>
  formConfig: FormProps
  formEvents: Record<string, string>
}

export const state = reactive<State>({
  globalConfig: {
    locale: zhCn,
    size: 'default',
    button: {
      autoInsertSpace: false
    },
    message: {}
  },
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
