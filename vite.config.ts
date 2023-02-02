import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoImport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'
import defineOptions from 'unplugin-vue-define-options/dist/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'

export default defineConfig({
  server: {
    open: true
  },
  plugins: [
    vue(),
    autoImport({ dts: 'src/types/auto-imports.d.ts', imports: ['vue'], resolvers: [ElementPlusResolver()] }),
    components({ dts: 'src/types/components.d.ts', resolvers: [ElementPlusResolver()] }),
    defineOptions(),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/icons')],
      symbolId: 'svg-icon-[dir]-[name]'
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
