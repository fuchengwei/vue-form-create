// 验证是否外部地址
export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

// 复制文本
export function copy(text: string) {
  const input = document.createElement('textarea')
  input.value = text
  document.body.appendChild(input)
  input.select()
  document.execCommand('copy')
  document.body.removeChild(input)
}
