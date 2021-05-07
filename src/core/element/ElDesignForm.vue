<template>
  <div class="fc-style">
    <el-container class="fc-container">
      <el-main class="fc-main">
        <el-container>
          <el-aside width="250px">
            <div class="components">
              <ComponentGroup
                title="基础字段"
                :fields="basicFields"
                :list="element.basicComponents"
              />
              <ComponentGroup
                title="高级字段"
                :fields="advanceFields"
                :list="element.advanceComponents"
              />
              <ComponentGroup
                title="布局字段"
                :fields="layoutFields"
                :list="element.layoutComponents"
              />
            </div>
          </el-aside>
          <el-main class="center-container">
            <ElCustomHeader
              v-bind="$props"
              @preview="() => (previewVisible = true)"
              @uploadJson="() => (uploadJsonVisible = true)"
              @generateJson="handleGenerateJson"
              @generateCode="handleGenerateCode"
              @clearable="handleClearable"
            >
              <slot name="header"></slot>
            </ElCustomHeader>
            <el-main :class="{ 'widget-empty': widgetForm.list }">
              <ElWidgetForm
                ref="widgetFormRef"
                v-model:widgetForm="widgetForm"
                v-model:widgetFormSelect="widgetFormSelect"
              />
            </el-main>
          </el-main>
          <el-aside class="widget-config-container" width="300px">
            <el-container>
              <el-header>
                <div
                  class="config-tab"
                  :class="{ active: configTab === 'widget' }"
                  @click="configTab = 'widget'"
                >
                  字段属性
                </div>
                <div
                  class="config-tab"
                  :class="{ active: configTab === 'form' }"
                  @click="configTab = 'form'"
                >
                  表单属性
                </div>
              </el-header>
              <el-main class="config-content">
                <ElWidgetConfig
                  v-show="configTab === 'widget'"
                  v-model:select="widgetFormSelect"
                />
                <ElFormConfig
                  v-show="configTab === 'form'"
                  v-model:config="widgetForm.config"
                />
              </el-main>
            </el-container>
          </el-aside>
        </el-container>
      </el-main>

      <el-dialog v-model="uploadJsonVisible" title="导入JSON" :width="800">
        <a-alert
          type="info"
          message="JSON格式如下，直接复制生成的json覆盖此处代码点击确定即可"
          style="margin-bottom: 10px"
        />
        <CodeEditor v-model:value="jsonEg" language="json" />
        <template #footer>
          <el-button size="medium" @click="() => (uploadJsonVisible = false)"
            >取消</el-button
          >
          <el-button type="primary" size="medium" @click="handleUploadJson"
            >导入</el-button
          >
        </template>
      </el-dialog>

      <el-dialog v-model="previewVisible" title="预览" :width="800">
        <ElGenerateForm
          ref="generateFormRef"
          v-if="previewVisible"
          :data="widgetForm"
        />
        <template #footer>
          <el-button size="medium" @click="handleReset">重置</el-button>
          <el-button type="primary" size="medium" @click="handleGetData"
            >获取数据</el-button
          >
        </template>

        <el-dialog v-model="dataJsonVisible" title="获取数据" :width="800">
          <CodeEditor :value="dataJsonTemplate" language="json" readonly />

          <template #footer>
            <el-button size="medium" @click="() => (dataJsonVisible = false)"
              >取消</el-button
            >
            <el-button
              type="primary"
              size="medium"
              @click="handleCopyClick(dataJsonTemplate)"
              >Copy</el-button
            >
          </template>
        </el-dialog>
      </el-dialog>

      <el-dialog v-model="generateJsonVisible" title="生成JSON" :width="800">
        <CodeEditor :value="generateJsonTemplate" language="json" readonly />

        <template #footer>
          <el-button size="medium" @click="() => (generateJsonVisible = false)"
            >取消</el-button
          >
          <el-button
            type="primary"
            size="medium"
            @click="handleCopyClick(generateJsonTemplate)"
            >Copy</el-button
          >
        </template>
      </el-dialog>

      <el-dialog v-model="dataCodeVisible" title="生产代码" :width="800">
        <a-tabs
          type="card"
          v-model:activeKey="codeLanguage"
          :tabBarStyle="{ margin: 0 }"
        >
          <a-tab-pane tab="Vue Component" :key="codeType.Vue">
            <CodeEditor :value="dataCodeTemplate" language="html" readonly />
          </a-tab-pane>
          <a-tab-pane tab="HTML" :key="codeType.Html">
            <CodeEditor :value="dataCodeTemplate" language="html" readonly />
          </a-tab-pane>
        </a-tabs>

        <template #footer>
          <el-button size="medium" @click="() => (dataCodeVisible = false)"
            >取消</el-button
          >
          <el-button
            type="primary"
            size="medium"
            @click="handleCopyClick(dataCodeTemplate)"
            >Copy</el-button
          >
        </template>
      </el-dialog>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, toRefs, watchEffect } from 'vue'
import { ElMessage } from 'element-plus'
import { defaultsDeep } from 'lodash'
import CodeEditor from '@/components/CodeEditor.vue'
import ComponentGroup from '@/components/ComponentGroup.vue'
import ElCustomHeader from './ElCustomHeader.vue'
import ElWidgetForm from './ElWidgetForm.vue'
import ElGenerateForm from './ElGenerateForm.vue'
import ElWidgetConfig from './ElWidgetConfig.vue'
import ElFormConfig from './ElFormConfig.vue'
import { element } from '@/config'
import { copy } from '@/utils'
import { CodeType, PlatformType } from '@/enums'
import generateCode from '@/utils/generateCode'
import { WidgetForm } from '@/config/element'

export default defineComponent({
  name: 'ElDesignForm',
  components: {
    ElCustomHeader,
    ComponentGroup,
    CodeEditor,
    ElWidgetForm,
    ElGenerateForm,
    ElWidgetConfig,
    ElFormConfig
  },
  props: {
    preview: {
      type: Boolean,
      default: true
    },
    generateCode: {
      type: Boolean,
      default: true
    },
    generateJson: {
      type: Boolean,
      default: true
    },
    uploadJson: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: true
    },
    basicFields: {
      type: Array as PropType<Array<string>>,
      default: () => [
        'input',
        'password',
        'textarea',
        'number',
        'radio',
        'checkbox',
        'time',
        'date',
        'rate',
        'select',
        'switch',
        'slider',
        'text'
      ]
    },
    advanceFields: {
      type: Array as PropType<Array<string>>,
      default: () => ['img-upload', 'richtext-editor', 'cascader']
    },
    layoutFields: {
      type: Array as PropType<Array<string>>,
      default: () => ['grid']
    }
  },
  setup() {
    const state = reactive({
      element,
      codeType: CodeType,
      widgetForm: JSON.parse(JSON.stringify(element.widgetForm)),
      widgetFormSelect: null,
      generateFormRef: null as any,
      configTab: 'widget',
      previewVisible: false,
      uploadJsonVisible: false,
      dataJsonVisible: false,
      dataCodeVisible: false,
      generateJsonVisible: false,
      generateCodeVisible: false,
      generateJsonTemplate: JSON.stringify(element.widgetForm, null, 2),
      dataJsonTemplate: '',
      dataCodeTemplate: '',
      codeLanguage: CodeType.Vue,
      jsonEg: JSON.stringify(element.widgetForm, null, 2)
    })

    const handleUploadJson = () => {
      try {
        state.widgetForm.list = []
        defaultsDeep(state.widgetForm, JSON.parse(state.jsonEg))

        if (state.widgetForm.list) {
          state.widgetFormSelect = state.widgetForm.list[0]
        }

        state.uploadJsonVisible = false
        ElMessage.success('上传成功')
      } catch (error) {
        ElMessage.error('上传失败')
      }
    }

    const handleCopyClick = (text: string) => {
      copy(text)
      ElMessage.success('Copy成功')
    }

    const handleGetData = () => {
      state.generateFormRef.getData().then((res: any) => {
        state.dataJsonTemplate = JSON.stringify(res, null, 2)
        state.dataJsonVisible = true
      })
    }

    const handleGenerateJson = () =>
      (state.generateJsonTemplate = JSON.stringify(
        state.widgetForm,
        null,
        2
      )) && (state.generateJsonVisible = true)

    const handleGenerateCode = () => {
      state.codeLanguage = CodeType.Vue
      state.dataCodeVisible = true
    }

    watchEffect(() => {
      if (state.dataCodeVisible) {
        state.dataCodeTemplate = generateCode(
          state.widgetForm,
          state.codeLanguage,
          PlatformType.Element
        )!
      }
    })

    const handleClearable = () => {
      state.widgetForm.list = []
      defaultsDeep(
        state.widgetForm,
        JSON.parse(JSON.stringify(element.widgetForm))
      )
      state.widgetFormSelect = null
    }

    const handleReset = () => state.generateFormRef.reset()

    const getJson = () => state.widgetForm

    const setJson = (json: WidgetForm) => {
      state.widgetForm.list = []
      defaultsDeep(state.widgetForm, json)
      if (json.list.length) {
        state.widgetFormSelect = json.list[0]
      }
    }

    const getTemplate = (codeType: CodeType) =>
      generateCode(state.widgetForm, codeType, PlatformType.Element)

    const clear = () => handleClearable()

    return {
      ...toRefs(state),
      handleUploadJson,
      handleCopyClick,
      handleGetData,
      handleGenerateJson,
      handleGenerateCode,
      handleClearable,
      handleReset,
      getJson,
      setJson,
      getTemplate,
      clear
    }
  }
})
</script>
