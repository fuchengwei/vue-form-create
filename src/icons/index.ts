export default {
  install: () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const context = require.context('./svg', false, /\.svg$/)
    context.keys().map(context)
  }
}
