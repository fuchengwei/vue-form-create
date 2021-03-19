// 验证是否外部地址
export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
