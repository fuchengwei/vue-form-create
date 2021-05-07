<template>
  <Draggable
    :class="formClass"
    item-key="key"
    ghostClass="ghost"
    handle=".drag-widget"
    :animation="200"
    :group="{ name: 'people' }"
    :list="list"
    @add="handleMoveAdd($event, layoutElement, colIndex)"
  >
    <template #item="{ element, index }">
      <transition-group name="fade" tag="div">
        <template v-if="islayoutComponent(element.type)">
          <ElWidgetLayoutForm
            v-if="element.key"
            :key="element.key"
            :element="element"
            :index="index"
            @click.stop="handleItemClick(element)"
          />
        </template>
        <template v-else>
          <ElWidgetFormItem
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
import { islayoutComponent } from '@/config/element'
import Draggable from 'vuedraggable'
import ElWidgetFormItem from '@/core/element/ElWidgetFormItem.vue'

export default defineComponent({
  name: 'ElDraggableForm',
  components: {
    Draggable,
    ElWidgetFormItem,
    ElWidgetLayoutForm: defineAsyncComponent(() => import('@/core/element/ElWidgetLayoutForm.vue'))
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
    const handleMoveAdd = ($event:any, element:any, colIndex:number) => {
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
      handleMoveAdd,
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
