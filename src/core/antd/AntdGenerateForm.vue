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
      <template v-for="(element, index) of widgetForm.list">
        <template v-if="element.type === 'grid'">
          <a-row
            type="flex"
            v-if="element.key"
            :key="element.key"
            :gutter="element.options.gutter ?? 0"
            :justify="element.options.justify"
            :align="element.options.align"
          >
            <a-col
              v-for="(col, colIndex) of element.columns"
              :key="colIndex"
              :span="col.span ?? 0"
            >
              <AntdGenerateFormItem
                v-for="colItem of col.list"
                v-model:model="model"
                :key="colItem.key"
                :element="colItem"
                :config="data.config"
              />
            </a-col>
          </a-row>
        </template>
        <AntdGenerateFormItem
          v-else
          v-model:model="model"
          :key="element.key"
          :element="widgetForm.list[index]"
          :config="data.config"
        />
      </template>
    </a-form>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  toRefs,
  watch
} from 'vue'
import { message } from 'ant-design-vue'
import AntdGenerateFormItem from './AntdGenerateFormItem.vue'
import { antd } from '@/config'

export default defineComponent({
  name: 'AntdGenerateForm',
  components: {
    AntdGenerateFormItem
  },
  props: {
    data: {
      type: Object,
      default: antd.widgetForm
    },
    value: {
      type: Object
    }
  },
  setup(props) {
    const state = reactive({
      generateForm: null as any,
      model: {} as any,
      rules: {} as any,
      widgetForm:
        (props.data && JSON.parse(JSON.stringify(props.data))) ??
        antd.widgetForm
    })

    const generateModel = (list: any[]) => {
      for (let index = 0; index < list.length; index++) {
        const model = list[index].model
        if (!model) {
          return
        }
        if (list[index].type === 'grid') {
          list[index].columns.forEach((col: any) => generateModel(col.list))
        } else {
          if (props.value && Object.keys(props.value).includes(model)) {
            state.model[model] = props.value[model]
          } else {
            state.model[model] = list[index].options.defaultValue
          }

          state.rules[model] = list[index].options.rules
        }
      }
      nextTick(() => state.generateForm.resetFields())
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
        state.model = {}
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
              resolve(state.model)
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
      ...toRefs(state),
      getData,
      reset
    }
  }
})
</script>
