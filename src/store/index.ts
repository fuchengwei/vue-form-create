import { zhCn } from 'element-plus/lib/locales'

import type { ConfigProviderProps } from 'element-plus'

export interface State {
  globalConfig: Omit<ConfigProviderProps, 'a11y' | 'namespace' | 'keyboardNavigation'>
}

export const state = reactive<State>({
  globalConfig: {
    locale: zhCn,
    size: 'default',
    button: {
      autoInsertSpace: false
    },
    message: {}
  }
})
