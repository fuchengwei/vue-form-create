<template>
  <Draggable
    :class="formClass"
    item-key="key"
    ghostClass="ghost"
    handle=".drag-widget"
    :animation="200"
    :group="{ name: 'people' }"
    :list="list"
    @add="handleColMoveAdd($event, layoutElement, colIndex)"
  >
    <template #item="{ element, index }">
      <transition-group name="fade" tag="div">
        <template v-if="islayoutComponent(element.type)">
          <AntdWidgetLayoutForm
            :element="element"
            @click.stop="handleItemClick(element)"
          />
        </template>
        <template v-else>
          <AntdWidgetFormItem
            v-if="element.key"
            :key="element.key"
            :element="element"
            @click.stop="handleItemClick(element)"
            @copy="handleCopyClick(index, list)"
            @delete="handleDeleteClick(index, list)"
          />
        </template>
      </transition-group>
    </template>
  </Draggable>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue'
import { islayoutComponent } from '@/config/antd'
import Draggable from 'vuedraggable'
import AntdWidgetFormItem from '@/core/antd/AntdWidgetFormItem.vue'

export default defineComponent({
  name: 'DraggableForm',
  components: {
    Draggable,
    AntdWidgetFormItem,
    AntdWidgetLayoutForm: defineAsyncComponent(() => import('@/core/antd/AntdWidgetLayoutForm.vue'))
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    layoutElement: {
      type: Object,
      required: false,
      default: null
    },
    colIndex: {
      type: Number,
      required: false,
      default: null
    },
    formClass: {
      type: Array,
      default() {
        return ['widget-form-list']
      }
    }
  },
  emits: ['handleMoveAdd', 'handleItemClick', 'handleCopyClick', 'handleDeleteClick'],
  setup(props, context) {
    const handleColMoveAdd = ($event:any, element:any, colIndex:number) => {
      context.emit('handleMoveAdd', $event, element, colIndex)
    }
    const handleItemClick = (element:any) => {
      context.emit('handleItemClick', element)
    }
    const handleCopyClick = (index:number, list:any) => {
      context.emit('handleCopyClick', index, list)
    }
    const handleDeleteClick = (index:number, list:any) => {
      context.emit('handleDeleteClick', index, list)
    }
    return {
      handleColMoveAdd,
      handleItemClick,
      handleCopyClick,
      handleDeleteClick,
      islayoutComponent
    }
  }
})
</script>

<style>

</style>
