<template>
  <div class="widget-form-container">
    <div v-if="!widgetForm.list" class="form-empty">从左侧拖拽来添加字段</div>
    <el-form
      label-suffix=":"
      :size="widgetForm.config.size"
      :label-position="widgetForm.config.labelPosition"
      :label-width="`${widgetForm.config.labelWidth}px`"
      :hide-required-asterisk="widgetForm.config.hideRequiredAsterisk"
    >
      <ElDraggableForm
        :list="widgetForm.list"
        @handleMoveAdd="handleMoveAdd"
        @handleItemClick="handleItemClick"
        @handleCopyClick="handleCopyClick"
        @handleDeleteClick="handleDeleteClick"
      />
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, PropType, provide, ref, watch, toRaw, isProxy } from 'vue'
import { v4 } from 'uuid'
import { WidgetForm, islayoutComponent } from '@/config/element'
import { handleListInsert, handleListDelete } from '@/utils/array'
import ElDraggableForm from './components/ElDraggableForm.vue'

export default defineComponent({
  name: 'ElWidgetForm',
  components: {
    ElDraggableForm
  },
  props: {
    widgetForm: {
      type: Object as PropType<WidgetForm>,
      required: true
    },
    widgetFormSelect: {
      type: Object
    }
  },
  emits: ['update:widgetForm', 'update:widgetFormSelect'],
  setup(props, context) {
    const updateSelectWidgetForm = (widgetFormSelect: any) => {
      if (isProxy(widgetFormSelect)) {
        widgetFormSelect = toRaw(widgetFormSelect)
      }
      context.emit('update:widgetFormSelect', widgetFormSelect)
      // 手动触发select更新
      select.value = widgetFormSelect
    }

    const updateWidgetForm = (widgetForm: any) => {
      context.emit('update:widgetForm', widgetForm)
    }

    const select = ref<any>({})
    provide('selectWidgetFormRef', select)
    watch(
      () => props.widgetFormSelect,
      val => {
        // 层次深了监听会不起效果
        select.value = val
      }
    )
    provide('getSelectWidgetForm', () => (props.widgetFormSelect))
    provide('updateSelectWidgetForm', updateSelectWidgetForm)

    const widgetForm = ref<any>({})
    provide('widgetFormRef', widgetForm)
    watch(
      () => props.widgetForm,
      val => (widgetForm.value = val)
    )
    provide('getWidgetForm', () => (props.widgetForm))
    provide('updateWidgetForm', updateWidgetForm)

    const handleItemClick = (row: any) => {
      updateSelectWidgetForm(row)
    }

    const handleCopyClick = (index: number, list: any[]) => {
      const key = v4().replaceAll('-', '')
      const oldList = JSON.parse(JSON.stringify(props.widgetForm.list))

      let copyData = {
        ...list[index],
        key,
        model: `${list[index].type}_${key}`,
        rules: list[index].rules ?? []
      }

      if (
        list[index].type === 'radio' ||
        list[index].type === 'checkbox' ||
        list[index].type === 'select'
      ) {
        copyData = {
          ...copyData,
          options: {
            ...copyData.options,
            options: copyData.options.options.map((item: any) => ({ ...item }))
          }
        }
      }

      updateWidgetForm({
        ...props.widgetForm,
        list: handleListInsert(list[index].key, oldList, copyData)
      })

      updateSelectWidgetForm(copyData)
    }

    const handleDeleteClick = (index: number, list: any[]) => {
      const oldList = JSON.parse(JSON.stringify(props.widgetForm.list))

      if (list.length - 1 === index) {
        if (index === 0) {
          nextTick(() => updateSelectWidgetForm(null))
        } else {
          updateSelectWidgetForm(list[index - 1])
        }
      } else {
        updateSelectWidgetForm(list[index + 1])
      }

      updateWidgetForm({
        ...props.widgetForm,
        list: handleListDelete(list[index].key, oldList)
      })
    }

    const handleMoveAdd = (event: any) => {
      const { newIndex } = event

      const key = v4().replaceAll('-', '')
      const list = JSON.parse(JSON.stringify(props.widgetForm.list))

      list[newIndex] = JSON.parse(JSON.stringify(list[newIndex]))

      list[newIndex] = {
        ...list[newIndex],
        key,
        model: `${list[newIndex].type}_${key}`,
        rules: []
      }

      if (
        list[newIndex].type === 'radio' ||
        list[newIndex].type === 'checkbox' ||
        list[newIndex].type === 'select'
      ) {
        list[newIndex] = {
          ...list[newIndex],
          options: {
            ...list[newIndex].options,
            options: list[newIndex].options.options.map((item: any) => ({
              ...item
            }))
          }
        }
      }

      if (list[newIndex].type === 'grid') {
        list[newIndex] = {
          ...list[newIndex],
          columns: list[newIndex].columns.map((item: any) => ({ ...item }))
        }
      }

      updateWidgetForm({ ...props.widgetForm, list })

      updateSelectWidgetForm(list[newIndex])
    }

    return {
      handleItemClick,
      handleCopyClick,
      handleDeleteClick,
      handleMoveAdd,
      islayoutComponent
    }
  }
})
</script>
