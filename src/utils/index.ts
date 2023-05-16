import { ElMessage, FormInstance } from 'element-plus'
import { debounce } from 'lodash-es'
import { remoteIconList, state } from '@/store'

const debounceErrorMessage = debounce(ElMessage.error, 500)

// 删除domNode
export const removeDomNode = (selectors: string) => document.querySelectorAll(selectors).forEach((node) => node.remove())

// 加载js链接
export const loadJsLink = (id: string, src: string) => {
  if (!src) return

  removeDomNode(`#${id}`)

  const script = document.createElement('script')
  script.id = id
  script.src = src

  document.getElementsByTagName('head')[0].appendChild(script)
}

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

// 加载动态参数
export const loadDynamicParams = (paramsText: string, initValue: Record<string, any> | [], errorMessage: string, state: Record<string, any>) => {
  try {
    initValue = eval(`(${paramsText})`)
  } catch (error) {
    debounceErrorMessage(errorMessage)
  }
  return initValue
}

// 加载远程Icon
export const debounceLoadRemoteIcon = debounce((src: string) => {
  loadJsLink('icon-script', src)
  fetch(src)
    .then((resp) => resp.text())
    .then((text) => {
      remoteIconList.value = text.match(/(?<=id=").*?(?=")/g) ?? []
    })
}, 500)

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
export const createEventFunction = (events: Record<string, any> | undefined, formModel: Record<string, any>, formInstance?: FormInstance) => {
  const eventFunction: Record<string, any> = {}

  if (events) {
    Object.keys(events).forEach((key) => {
      eventFunction[key] = (...args: any) => loadFunction(events[key], formModel, formInstance, ...args)
    })
  }

  return eventFunction
}
