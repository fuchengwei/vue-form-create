<template>
  <div class="fc-style">
    <a-form
      ref="generateForm"
      :model="model"
      :rules="rules"
      :layout="widgetForm.config.layout"
      :labelAlign="widgetForm.config.labelAlign"
      :labelCol="widgetForm.config.labelCol"
      :hideRequiredMark="widgetForm.config.hideRequiredMark"
    >
      <template v-for="(element) of widgetForm.list">
        <AntdGenerateLayoutForm
          v-if="islayoutComponent(element.type)"
          :key="element.key"
          :element="element"
        />
        <AntdGenerateFormItem
          v-else
          :key="element.key"
          :element="element"
        />
      </template>
    </a-form>
  </div>
</template>

<script lang="ts">
import {
  ref,
  defineComponent,
  onMounted,
  provide,
  reactive,
  toRefs,
  watch
} from 'vue'
import { message } from 'ant-design-vue'
import AntdGenerateFormItem from './AntdGenerateFormItem.vue'
import AntdGenerateLayoutForm from './AntdGenerateLayoutForm.vue'
import { antd } from '@/config'
import { islayoutComponent } from '@/config/antd'

export default defineComponent({
  name: 'AntdGenerateForm',
  components: {
    AntdGenerateFormItem,
    AntdGenerateLayoutForm
  },
  props: {
    data: {
      type: Object,
      default: antd.widgetForm
    },
    value: {
      type: Object
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const state = reactive({
      generateForm: null as any,
      rules: {} as any,
      widgetForm:
        (props.data && JSON.parse(JSON.stringify(props.data))) ??
        antd.widgetForm
    })
    const model = ref<any>({})

    provide('model', model)
    provide('config', props.data.config)

    const disabled = ref<any>(props.disabled)
    provide('disabled', disabled)
    watch(
      () => props.disabled,
      val => (disabled.value = val)
    )

    provide('updateModel', (newModel:any) => {
      model.value = newModel
    })

    const generateModel = (list: any[]) => {
      for (let index = 0; index < list.length; index++) {
        const modelKey = list[index].model
        if (!modelKey) {
          return
        }
        if (list[index].type === 'grid') {
          list[index].columns.forEach((col: any) => generateModel(col.list))
        } else {
          if (props.value && Object.keys(props.value).includes(modelKey)) {
            model.value[modelKey] = props.value[modelKey]
          } else {
            model.value[modelKey] = list[index].options.defaultValue
          }

          state.rules[modelKey] = list[index].options.rules
        }
      }
    }

    const generateOptions = (list: any[]) => {
      list.forEach(item => {
        if (item.type === 'grid') {
          item.columns.forEach((col: any) => generateOptions(col.list))
        } else {
          if (item.options.remote && item.options.remoteFunc) {
            fetch(item.options.remoteFunc)
              .then(resp => resp.json())
              .then(json => {
                if (json instanceof Array) {
                  item.options.remoteOptions = json.map(data => ({
                    label: data[item.options.props.label],
                    value: data[item.options.props.value],
                    children: data[item.options.props.children]
                  }))
                }
              })
          }
        }
      })
    }

    watch(
      () => props.data,
      val => {
        state.widgetForm =
          (val && JSON.parse(JSON.stringify(val))) ?? antd.widgetForm
        model.value = {}
        state.rules = {}
        generateModel(state.widgetForm.list)
        generateOptions(state.widgetForm.list)
      },
      { deep: true, immediate: true }
    )

    onMounted(() => {
      generateModel(state.widgetForm?.list ?? [])
      generateOptions(state.widgetForm?.list ?? [])
    })

    const getData = () => {
      return new Promise((resolve, reject) => {
        state.generateForm
          .validate()
          .then((validate: boolean) => {
            if (validate) {
              resolve(model.value)
            } else {
              message.error('验证失败')
            }
          })
          .catch((error: Error) => {
            reject(error)
          })
      })
    }

    const reset = () => {
      state.generateForm.resetFields()
    }

    return {
      model,
      ...toRefs(state),
      getData,
      reset,
      islayoutComponent
    }
  }
})
</script>
