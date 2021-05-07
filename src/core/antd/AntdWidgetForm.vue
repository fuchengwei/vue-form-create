<template>
  <div class="widget-form-container">
    <div v-if="!widgetForm.list" class="form-empty">从左侧拖拽来添加字段</div>
    <a-form
      :layout="widgetForm.config.layout"
      :labelAlign="widgetForm.config.labelAlign"
      :labelCol="widgetForm.config.labelCol"
      :hideRequiredMark="widgetForm.config.hideRequiredMark"
    >
      <DraggableForm
        :list="widgetForm.list"
        @handleMoveAdd="handleMoveAdd"
        @handleItemClick="handleItemClick"
        @handleCopyClick="handleCopyClick"
        @handleDeleteClick="handleDeleteClick"
      />
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, PropType, provide, ref, watch, toRaw, isProxy } from 'vue'
import { v4 } from 'uuid'
import { WidgetForm } from '@/config/antd'
import DraggableForm from '@/core/antd/components/DraggableForm.vue'
import { handleListInsert, handleListDelete } from '@/utils/array'

export default defineComponent({
  name: 'AntdWidgetForm',
  components: {
    DraggableForm
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
  setup(props:any, context) {
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
      val => (select.value = val)
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

    const handleColMoveAdd = (event: any, row: any, index: number) => {
      const { newIndex, oldIndex, item } = event
      const list = JSON.parse(JSON.stringify(props.widgetForm.list))

      if (item.className.includes('data-grid')) {
        item.tagName === 'DIV' &&
          list.splice(oldIndex, 0, row.columns[index].list[newIndex])
        row.columns[index].list.splice(newIndex, 1)
        return false
      }

      const key = v4().replaceAll('-', '')

      row.columns[index].list[newIndex] = {
        ...row.columns[index].list[newIndex],
        key,
        model: `${row.columns[index].list[newIndex].type}_${key}`,
        rules: []
      }

      if (
        row.columns[index].list[newIndex].type === 'radio' ||
        row.columns[index].list[newIndex].type === 'checkbox' ||
        row.columns[index].list[newIndex].type === 'select'
      ) {
        row.columns[index].list[newIndex] = {
          ...row.columns[index].list[newIndex],
          options: {
            ...row.columns[index].list[newIndex].options,
            options: row.columns[index].list[
              newIndex
            ].options.options.map((item: any) => ({ ...item }))
          }
        }
      }

      updateSelectWidgetForm(row.columns[index].list[newIndex])
    }

    return {
      handleItemClick,
      handleCopyClick,
      handleDeleteClick,
      handleMoveAdd,
      handleColMoveAdd
    }
  }
})
</script>
