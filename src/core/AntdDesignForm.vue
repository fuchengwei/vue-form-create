<template>
  <div class="fd-style">
    <a-layout class="fd-container">
      <a-layout-content class="fd-main">
        <a-layout>
          <a-layout-sider
            theme="light"
            :width="250"
          >
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
            <Header
              v-bind="$props"
              @uploadJson="() => uploadJsonVisible = true"
              @generateJson="() => (generateJsonTemplate = JSON.stringify(widgetForm, null, 2)) && (generateJsonVisible = true)"
              @clearable="() => (widgetForm = JSON.parse(JSON.stringify(antd.widgetForm))) && (widgetFormSelect = null)"
            />
            <a-layout-content :class="{'widget-empty': widgetForm.list}">
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
                  :class="{active: configTab === 'widget'}"
                  @click="configTab = 'widget'"
                >字段属性</div>
                <div
                  class="config-tab"
                  :class="{active: configTab === 'form'}"
                  @click="configTab = 'form'"
                >表单属性</div>
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
          style="margin-bottom: 10px;"
        />
        <CodeEditor
          v-model:value="jsonEg"
          language="json"
        />
      </a-modal>

      <a-modal
        v-model:visible="generateJsonVisible"
        title="生成JSON"
        okText='Copy'
        :width="800"
        @ok="handleGenerateJson"
      >
        <CodeEditor
          :value="generateJsonTemplate"
          language="json"
          readonly
        />
      </a-modal>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, toRefs } from 'vue'
import { message } from 'ant-design-vue'
import Header from '@/components/Header.vue'
import ComponentGroup from '@/components/ComponentGroup.vue'
import CodeEditor from '@/components/CodeEditor.vue'
import AntdWidgetForm from './AntdWidgetForm.vue'
import AntdWidgetConfig from './AntdWidgetConfig.vue'
import AntdFormConfig from './AntdFormConfig.vue'
import { antd } from '@/config'
import { copy } from '@/utils'

export default defineComponent({
  name: 'AntdDesignForm',
  components: {
    Header,
    ComponentGroup,
    CodeEditor,
    AntdWidgetForm,
    AntdWidgetConfig,
    AntdFormConfig
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
      widgetForm: antd.widgetForm,
      widgetFormSelect: null,
      configTab: 'widget',
      previewVisible: false,
      uploadJsonVisible: false,
      generateJsonVisible: false,
      generateCodeVisible: false,
      generateJsonTemplate: JSON.stringify(antd.widgetForm, null, 2),
      jsonEg: JSON.stringify(antd.widgetForm, null, 2)
    })

    const handleUploadJson = () => {
      try {
        state.widgetForm = JSON.parse(state.jsonEg)

        if (state.widgetForm.list) {
          state.widgetFormSelect = state.widgetForm.list[0]
        }

        state.uploadJsonVisible = false

        message.success('上传成功')
      } catch (error) {
        message.error(error.message)
      }
    }

    const handleGenerateJson = () => {
      copy(state.generateJsonTemplate)
      message.success('复制成功')
    }

    return {
      ...toRefs(state),
      handleUploadJson,
      handleGenerateJson
    }
  }
})
</script>
