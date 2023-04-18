<template>
  <div
    class="mx-0.5 my-1 bg-blue-50 border border-dashed pb-5"
    :class="[
      state.selectWidgetItem?.key === props.component.key
        ? 'outline outline-2 outline-blue-400 border-blue-400'
        : 'border-gray-300 hover:outline hover:outline-1 hover:outline-blue-400'
    ]"
    @click="state.selectWidgetItem = props.component"
  >
    <el-button v-if="props.component.type === 'Button'" v-bind="commonProps" v-on="eventFunction"> {{ commonProps.content }} </el-button>

    <svg-icon v-if="props.component.type === 'Icon'" :name="props.component.config.name" v-bind="commonProps" v-on="eventFunction" />
  </div>
</template>

<script lang="ts" setup>
import SvgIcon from '@/components/svg-icon.vue'
import { state } from '@/store'
import { createEventFunction } from '@/utils'

import type { Component } from '@/config'
import type { FormInstance } from 'element-plus'

defineOptions({
  name: 'WidgetFormItem'
})

const props = defineProps<{
  component: Component
  formInstance?: FormInstance
}>()

const commonProps = computed(() => {
  const _commonProps = {
    ...props.component.config
  }

  return _commonProps
})

const eventFunction = computed(() => createEventFunction(props.component, {}, props.formInstance))
</script>
