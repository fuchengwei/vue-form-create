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
            <Header v-bind="$props" />
            <a-layout-content :class="{'widget-empty': widgetForm.list}">
              <AntdWidgetForm
                ref="widgetFormRef"
                v-if="!resetJson"
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
    </a-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, toRefs } from 'vue'
import ComponentGroup from '../components/ComponentGroup.vue'
import Header from '../components/Header.vue'
import AntdWidgetForm from './AntdWidgetForm.vue'
import AntdWidgetConfig from './AntdWidgetConfig.vue'
import AntdFormConfig from './AntdFormConfig.vue'
import { antd } from '@/config'

export default defineComponent({
  name: 'AntdDesignForm',
  components: {
    ComponentGroup,
    Header,
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
    upload: {
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
      default: () => ['img-upload', 'editor', 'cascader']
    },
    layoutFields: {
      type: Array as PropType<Array<string>>,
      default: () => ['grid']
    }
  },
  setup() {
    const state = reactive({
      antd,
      resetJson: false,
      widgetForm: {
        list: [],
        config: {
          size: 'default',
          hideRequiredMark: false,
          layout: 'horizontal',
          labelAlign: 'right',
          labelCol: {
            span: 3,
            offset: 0
          }
        }
      },
      widgetFormSelect: null,
      configTab: 'widget',
      previewVisible: false,
      jsonVisible: false,
      codeVisible: false,
      uploadVisible: false,
      remoteFuncs: {
        funcTest(resolve) {
          setTimeout(() => {
            const options = [
              { id: '1', name: 'name1' },
              { id: '2', name: 'name2' },
              { id: '3', name: 'name3' }
            ]

            resolve(options)
          }, 2000)
        },
        uploadCallBack(response, file, fileList) {
          console.log('callback', response, file, fileList)
        }
      },
      widgetModels: {},
      blank: '',
      htmlTemplate: '',
      vueTemplate: '',
      jsonTemplate: '',
      uploadEditor: null,
      jsonCopyValue: '',
      jsonClipboard: null,
      jsonEg: `
        {
          "list": [],
          "config": {
            "labelWidth": 100,
            "labelPosition": "top",
            "size": "small"
          }
        }
      `,
      codeActiveName: 'vue'
    })

    return {
      ...toRefs(state)
    }
  }
})
</script>
