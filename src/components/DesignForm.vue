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
                :list="basicComponents"
              />
              <ComponentGroup
                title="高级字段"
                :fields="advanceFields"
                :list="advanceComponents"
              />
              <ComponentGroup
                title="布局字段"
                :fields="layoutFields"
                :list="layoutComponents"
              />
            </div>
          </a-layout-sider>
          <a-layout class="center-container">
            <Header v-bind="$props" />
          </a-layout>
        </a-layout>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, toRefs } from 'vue'
import ComponentGroup from './ComponentGroup.vue'
import Header from './Header.vue'
import { basicComponents, layoutComponents, advanceComponents } from '@/config'

export default defineComponent({
  name: 'DesignForm',
  components: {
    ComponentGroup,
    Header
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
        'textarea',
        'number',
        'radio',
        'checkbox',
        'time',
        'date',
        'rate',
        'color',
        'select',
        'switch',
        'slider',
        'text'
      ]
    },
    advanceFields: {
      type: Array as PropType<Array<string>>,
      default: () => ['blank', 'imgupload', 'editor', 'cascader']
    },
    layoutFields: {
      type: Array as PropType<Array<string>>,
      default: () => ['grid']
    }
  },
  setup() {
    const state = reactive({
      basicComponents,
      layoutComponents,
      advanceComponents,
      resetJson: false,
      widgetForm: {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'right',
          size: 'small'
        }
      },
      configTab: 'widget',
      widgetFormSelect: null,
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
