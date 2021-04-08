/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

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
    config.externals = {
      vue: 'Vue',
      axios: 'axios',
      vuedraggable: 'vuedraggable',
      wangeditor: 'wangeditor',
      'ace-builds': 'ace'
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
    config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
      {
        analyzerMode: 'static'
      }
    ])
  },
  devServer: {
    disableHostCheck: true
  }
}
