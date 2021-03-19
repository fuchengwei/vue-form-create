<template>
  <div class="widget-cate">{{ title }}</div>
  <Draggable
    tag="ul"
    ghostClass="ghost"
    item-key="type"
    :list="list"
    :group="{name: 'people', pull: 'clone', put: false}"
    :sort="false"
    :move="handleMove"
    @start="handleMoveStart"
    @end="handleMoveEnd"
  >
    <template #item="{ element }">
      <li
        v-if="fields.includes(element.type)"
        class="form-edit-widget-label"
        :class="{'no-put': element.tpye === 'divider'}"
      >
        <a>
          <SvgIcon :iconClass="element.type" />
          <span>{{ element.name }}</span>
        </a>
      </li>
    </template>
  </Draggable>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Draggable from 'vuedraggable'
import SvgIcon from './SvgIcon.vue'

export default defineComponent({
  name: 'ComponentGroup',
  components: {
    Draggable,
    SvgIcon
  },
  props: {
    title: {
      type: String,
      required: true
    },
    fields: {
      type: Array as PropType<Array<string>>,
      required: true
    },
    list: {
      type: Array as PropType<Array<string>>,
      required: true
    },
    handleMove: {
      type: Function,
      default: () => null
    },
    handleMoveStart: {
      type: Function,
      default: () => null
    },
    handleMoveEnd: {
      type: Function,
      default: () => null
    }
  }
})
</script>
