export default {
  install: () => {
    const context = require.context('./svg', false, /\.svg$/)
    context.keys().map(context)
  }
}
