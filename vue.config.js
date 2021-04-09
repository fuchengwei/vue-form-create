/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/',
  assetsDir: 'static',
  productionSourceMap: false,
  css: {
    extract: false
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.externals = {
        vue: 'Vue',
        vuedraggable: 'vuedraggable',
        wangeditor: 'wangeditor',
        'ace-builds': 'ace',
        'ant-design-vue': 'antd'
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  devServer: {
    disableHostCheck: true
  }
}
