import { debounce } from 'lodash-es'
import { state } from '@/store'

import type { Component } from '@/config'
import { ElMessage, FormInstance } from 'element-plus'

const debounceErrorMessage = debounce(ElMessage.error, 500)

// 删除domNode
export const removeDomNode = (selectors: string) => document.querySelectorAll(selectors).forEach((node) => node.remove())

// 加载css
export const loadCss = (cssText: string) => {
  const id = 'customCss'

  removeDomNode(`#${id}`)

  const styleElement = document.createElement('style')
  styleElement.id = id
  try {
    styleElement.appendChild(document.createTextNode(cssText))
  } catch (_) {
    debounceErrorMessage('加载样式文件失败')
  }

  document.getElementsByTagName('head')[0].appendChild(styleElement)
}

// 加载function
export const loadFunction = (funcText: string, formModel: Record<string, any>, formInstance?: FormInstance, ...args: any) => {
  let func
  try {
    const newText = `(function() { return ${funcText} })()`
    func = eval(`(${newText})`)
  } catch (_) {
    debounceErrorMessage('加载方法失败')
  }

  return func(...args, formInstance, formModel, state.globalState)
}

// 创建event函数
export const createEventFunction = (component: Component, formModel: Record<string, any>, formInstance?: FormInstance) => {
  const { events } = component
  const eventFunction: Record<string, any> = {}

  if (events) {
    Object.keys(events).forEach((key) => {
      eventFunction[key] = (...args: any) => loadFunction(events[key], formModel, formInstance, ...args)
    })
  }

  return eventFunction
}
