<template>
  <div class="px-2 py-3" v-for="componentGroup of componentsGroup" :key="componentGroup.title">
    <div class="text-sm text-gray-700">{{ componentGroup.title }}</div>
    <draggable tag="div" item-key="type" :list="componentGroup.components" :group="{ name: 'people', pull: 'clone', put: false }" :sort="false" class="mt-2 grid grid-cols-2 gap-1">
      <template #item="{ element }">
        <div class="flex items-center bg-slate-100 h-7 rounded text-gray-600 border cursor-move hover:text-blue-400 hover:border-dashed hover:border-blue-400">
          <svg-icon :name="element.type" prefix="svg-icon" size="18px" class="mx-1.5" />
          <span class="text-xs">{{ element.label }}</span>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script lang="ts" setup>
import Draggable from 'vuedraggable'
import SvgIcon from '@/components/svg-icon.vue'
import componentsGroup from '@/config/index'

defineOptions({
  name: 'ComponentsGroup'
})
</script>
