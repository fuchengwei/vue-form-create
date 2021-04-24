export function makeComponentMap(
  components: Array<any>
): (key: string) => boolean {
  const map: Record<string, boolean> = Object.create(null)
  for (let i = 0; i < components.length; i++) {
    map[components[i].type] = true
  }
  return val => !!map[val]
}
