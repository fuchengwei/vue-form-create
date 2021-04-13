import { CodeType, PlatformType } from '@/enums'

export default function(
  widgetForm: any,
  codeType: CodeType,
  platformType: PlatformType
) {
  if (codeType === CodeType.Vue) {
    return `<template>
  ${
    platformType === PlatformType.Antd
      ? `<antd-generate-form ref="generateFormRef" :data="widgetForm">
  </antd-generate-form>
  <a-button type="primary" @click="handleSubmit">提交</a-button>`
      : `<el-generate-form ref="generateFormRef" :data="widgetForm">
  </el-generate-form>
  <el-button type="primary" @click="handleSubmit">提交</el-button>`
  }
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  setup() {
    const state = reactive({
      generateFormRef: null,
      widgetForm: ${JSON.stringify(widgetForm)}
    })

    const handleSubmit = () => {
      state.generateFormRef.getData().then(data => {
        console.log(data)
        // data success
        // data 表单数据
      }).catch(error => {
        // data failed
      })
    }

    return {
      ...toRefs(state),
      handleSubmit
    }
  }
})
</script>
    `
  }
  if (codeType === CodeType.Html) {
    return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    ${
      platformType === PlatformType.Antd
        ? '<link rel="stylesheet" href="https://unpkg.com/ant-design-vue@next/dist/antd.min.css" />'
        : '<link rel="stylesheet" href="https://unpkg.com/element-plus/lib/theme-chalk/index.css" />'
    }
  </head>
  <body>
    <div id="app">
      ${
        platformType === PlatformType.Antd
          ? `<antd-generate-form ref="generateFormRef" :data="widgetForm">
      </antd-generate-form>
      <a-button type="primary" @click="handleSubmit">提交</a-button>`
          : `<el-generate-form ref="generateFormRef" :data="widgetForm">
      </el-generate-form>
      <el-button type="primary" @click="handleSubmit">提交</el-button>`
      }
    </div>
    <script src="https://unpkg.com/vue@next/dist/vue.global.prod.js"></script>
    <script src="https://unpkg.com/vue-form-create/dist/formCreate.umd.min.js"></script>
    <script src="https://unpkg.com/ace-builds/src-noconflict/ace.js"></script>
    ${
      platformType === PlatformType.Antd
        ? `<script src="https://unpkg.com/moment/moment.js"></script>
    <script src="https://unpkg.com/ant-design-vue@next/dist/antd.min.js"></script>`
        : '<script src="https://unpkg.com/element-plus/lib/index.full.js"></script>'
    }
    <script>
      const { createApp, reactive, toRefs } = Vue

      createApp({
        setup() {
          const state = reactive({
            generateFormRef: null,
            widgetForm: ${JSON.stringify(widgetForm)}
          })
      
          const handleSubmit = () => {
            state.generateFormRef.getData().then(data => {
              console.log(data)
              // data success
              // data 表单数据
            }).catch(error => {
              // data failed
            })
          }
      
          return {
            ...toRefs(state),
            handleSubmit
          }
        }
      })
      .use(${platformType === PlatformType.Antd ? 'antd' : 'ElementPlus'})
      .use(formCreate)
      .mount('#app')
    </script>
  </body>
</html>
    `
  }
}
