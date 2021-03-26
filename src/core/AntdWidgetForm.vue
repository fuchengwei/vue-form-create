<template>
  <div class="widget-form-container">
    <div
      v-if="!widgetForm.list"
      class="form-empty"
    >从左侧拖拽来添加字段</div>
    <a-form
      :layout="widgetForm.config.layout"
      :labelAlign="widgetForm.config.labelAlign"
      :labelCol="widgetForm.config.labelCol"
      :hideRequiredMark="widgetForm.config.hideRequiredMark"
    >
      <Draggable
        class="widget-form-list"
        item-key="type"
        ghostClass='ghost'
        handle=".drag-widget"
        :animation="200"
        :group="{name: 'people'}"
        :list="widgetForm.list"
        @add="handleMoveAdd"
      >
        <template #item="{ element, index }">
          <transition-group
            name="fade"
            tag="div"
          >
            <AntdWidgetFormItem
              v-if="element.key"
              :key="element.key"
              :element="element"
              :config="widgetForm.config"
              :selectWidget="widgetFormSelect"
              @click="handleItemClick(index)"
              @copy="handleCopyClick(index)"
              @delete="handleDeleteClick(index)"
            />
          </transition-group>
        </template>
      </Draggable>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Draggable from 'vuedraggable'
import { v4 } from 'uuid'
import AntdWidgetFormItem from './AntdWidgetFormItem.vue'

export default defineComponent({
  name: 'AntdWidgetForm',
  components: {
    Draggable,
    AntdWidgetFormItem
  },
  props: {
    widgetForm: {
      type: Object
    },
    widgetFormSelect: {
      type: Object
    }
  },
  emits: ['update:widgetForm', 'update:widgetFormSelect'],
  setup(props, context) {
    const handleItemClick = (index: number) => {
      context.emit('update:widgetFormSelect', props.widgetForm.list[index])
    }

    const handleCopyClick = (index: number) => {
      const key = v4().replaceAll('-', '')
      const list = JSON.parse(JSON.stringify(props.widgetForm.list))

      let copyData = {
        ...list[index],
        options: {
          ...list[index].options,
          remoteFunc: `func_${key}`
        },
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
            options: copyData.options.options.map((item) => ({ ...item }))
          }
        }
      }

      list.push(copyData)

      context.emit('update:widgetForm', { ...props.widgetForm, list })

      context.emit('update:widgetFormSelect', copyData)
    }

    const handleDeleteClick = (index: number) => {
      const list = JSON.parse(JSON.stringify(props.widgetForm.list))

      if (list.length - 1 === index) {
        if (index === 0) {
          context.emit('update:widgetFormSelect', null)
        } else {
          context.emit('update:widgetFormSelect', list[index - 1])
        }
      } else {
        context.emit('update:widgetFormSelect', list[index + 1])
      }

      list.splice(index, 1)

      context.emit('update:widgetForm', { ...props.widgetForm, list })
    }

    const handleMoveAdd = (event) => {
      const { newIndex } = event

      const key = v4().replaceAll('-', '')
      const list = JSON.parse(JSON.stringify(props.widgetForm.list))

      list[newIndex] = {
        ...list[newIndex],
        options: {
          ...list[newIndex].options,
          remoteFunc: `func_${key}`
        },
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
            options: list[newIndex].options.options.map((item) => ({ ...item }))
          }
        }
      }

      if (list[newIndex].type === 'grid') {
        list[newIndex] = {
          ...list[newIndex],
          columns: list[newIndex].columns.map((item) => ({ ...item }))
        }
      }

      context.emit('update:widgetForm', { ...props.widgetForm, list })

      context.emit('update:widgetFormSelect', list[newIndex])
    }

    return {
      handleItemClick,
      handleCopyClick,
      handleDeleteClick,
      handleMoveAdd
    }
  }
})
</script>
