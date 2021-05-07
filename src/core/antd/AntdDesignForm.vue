<template>
  <div class="fc-style">
    <a-layout class="fc-container">
      <a-layout-content class="fc-main">
        <a-layout>
          <a-layout-sider theme="light" :width="250">
            <div class="components">
              <ComponentGroup
                title="基础字段"
                :fields="basicFields"
                :list="antd.basicComponents"
              />
              <ComponentGroup
                title="高级字段"
                :fields="advanceFields"
                :list="antd.advanceComponents"
              />
              <ComponentGroup
                title="布局字段"
                :fields="layoutFields"
                :list="antd.layoutComponents"
              />
            </div>
          </a-layout-sider>
          <a-layout class="center-container">
            <AntdHeader
              v-bind="$props"
              @preview="() => (previewVisible = true)"
              @uploadJson="() => (uploadJsonVisible = true)"
              @generateJson="handleGenerateJson"
              @generateCode="handleGenerateCode"
              @clearable="handleClearable"
            >
              <slot name="header"></slot>
            </AntdHeader>
            <a-layout-content :class="{ 'widget-empty': widgetForm.list }">
              <AntdWidgetForm
                ref="widgetFormRef"
                v-model:widgetForm="widgetForm"
                v-model:widgetFormSelect="widgetFormSelect"
              />
            </a-layout-content>
          </a-layout>
          <a-layout-sider
            theme="light"
            class="widget-config-container"
            :width="300"
          >
            <a-layout>
              <a-layout-header>
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
              </a-layout-header>
              <a-layout-content class="config-content">
                <AntdWidgetConfig
                  v-show="configTab === 'widget'"
                  v-model:select="widgetFormSelect"
                />
                <AntdFormConfig
                  v-show="configTab === 'form'"
                  v-model:config="widgetForm.config"
                />
              </a-layout-content>
            </a-layout>
          </a-layout-sider>
        </a-layout>
      </a-layout-content>

      <a-modal
        v-model:visible="uploadJsonVisible"
        title="导入JSON"
        :width="800"
        @ok="handleUploadJson"
      >
        <a-alert
          type="info"
          message="JSON格式如下，直接复制生成的json覆盖此处代码点击确定即可"
          style="margin-bottom: 10px"
        />
        <CodeEditor v-model:value="jsonEg" language="json" />
      </a-modal>

      <a-modal v-model:visible="previewVisible" :width="800">
        <AntdGenerateForm
          style="margin-top: 20px"
          ref="generateFormRef"
          :data="widgetForm"
        />
        <template #footer>
          <a-button @click="handleReset">重置</a-button>
          <a-button type="primary" @click="handleGetData">获取数据</a-button>
        </template>
      </a-modal>

      <a-modal
        v-model:visible="generateJsonVisible"
        title="生成JSON"
        okText="Copy"
        :width="800"
        @ok="handleCopyClick(generateJsonTemplate)"
      >
        <CodeEditor :value="generateJsonTemplate" language="json" readonly />
      </a-modal>

      <a-modal
        v-model:visible="dataJsonVisible"
        title="获取数据"
        okText="Copy"
        :width="800"
        @ok="handleCopyClick(dataJsonTemplate)"
      >
        <CodeEditor :value="dataJsonTemplate" language="json" readonly />
      </a-modal>

      <a-modal
        v-model:visible="dataCodeVisible"
        title="生产代码"
        okText="Copy"
        :width="800"
        @ok="handleCopyClick(dataCodeTemplate)"
      >
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
      </a-modal>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, toRefs, watchEffect, provide } from 'vue'
import { message } from 'ant-design-vue'
import { defaultsDeep } from 'lodash'
import CodeEditor from '@/components/CodeEditor.vue'
import ComponentGroup from '@/components/ComponentGroup.vue'
import AntdHeader from './AntdHeader.vue'
import AntdWidgetForm from './AntdWidgetForm.vue'
import AntdGenerateForm from './AntdGenerateForm.vue'
import AntdWidgetConfig from './AntdWidgetConfig.vue'
import AntdFormConfig from './AntdFormConfig.vue'
import { antd } from '@/config'
import { copy } from '@/utils'
import { CodeType, PlatformType } from '@/enums'
import generateCode from '@/utils/generateCode'
import { WidgetForm } from '@/config/antd'

export default defineComponent({
  name: 'AntdDesignForm',
  components: {
    AntdHeader,
    ComponentGroup,
    CodeEditor,
    AntdWidgetForm,
    AntdGenerateForm,
    AntdWidgetConfig,
    AntdFormConfig
  },
  data() {
    return {
      disabled: false
    }
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
      antd,
      codeType: CodeType,
      widgetForm: JSON.parse(JSON.stringify(antd.widgetForm)),
      widgetFormSelect: null as any,
      generateFormRef: null as any,
      configTab: 'widget',
      previewVisible: false,
      uploadJsonVisible: false,
      dataJsonVisible: false,
      dataCodeVisible: false,
      generateJsonVisible: false,
      generateCodeVisible: false,
      generateJsonTemplate: JSON.stringify(antd.widgetForm, null, 2),
      dataJsonTemplate: '',
      dataCodeTemplate: '',
      codeLanguage: CodeType.Vue,
      jsonEg: JSON.stringify(antd.widgetForm, null, 2)
    })

    const handleUploadJson = () => {
      try {
        state.widgetForm.list = []
        defaultsDeep(state.widgetForm, JSON.parse(state.jsonEg))

        if (state.widgetForm.list) {
          state.widgetFormSelect = state.widgetForm.list[0]
        }

        state.uploadJsonVisible = false
        message.success('上传成功')
      } catch (error) {
        message.error('上传失败')
      }
    }

    const handleCopyClick = (text: string) => {
      copy(text)
      message.success('Copy成功')
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
          PlatformType.Antd
        )!
      }
    })

    const handleClearable = () => {
      state.widgetForm.list = []
      defaultsDeep(
        state.widgetForm,
        JSON.parse(JSON.stringify(antd.widgetForm))
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
      generateCode(state.widgetForm, codeType, PlatformType.Antd)

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
