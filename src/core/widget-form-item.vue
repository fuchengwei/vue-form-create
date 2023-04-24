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

    <el-text v-if="props.component.type === 'Text'" v-bind="commonProps" v-on="eventFunction"> {{ commonProps.content }} </el-text>

    <el-link v-if="props.component.type === 'Link'" v-bind="commonProps" v-on="eventFunction">
      {{ commonProps.content }}
      <template #icon v-if="commonProps.icon">
        <svg-icon :name="commonProps.icon" />
      </template>
    </el-link>

    <el-divider v-if="props.component.type === 'Divider'" v-bind="commonProps"> {{ commonProps.content }} </el-divider>
  </div>
</template>

<script lang="ts" setup>
import SvgIcon from '@/components/svg-icon.vue'
import { state } from '@/store'
import { createEventFunction, loadDynamicParams } from '@/utils'

import type { Component } from '@/config'
import type { FormInstance } from 'element-plus'

defineOptions({
  name: 'WidgetFormItem'
})

const props = defineProps<{
  component: Component
  formInstance?: FormInstance
}>()

const commonProps = computed<any>(() => ({
  ...props.component.config,
  ...loadDynamicParams(props.component.dynamicProps, {}, '加载props失败', state.globalState),
  class: loadDynamicParams(props.component.customClass, {}, '加载自定义类名失败', state.globalState),
  style: loadDynamicParams(props.component.customStyle, [], '加载自定义样式失败', state.globalState)
}))

const eventFunction = computed(() => createEventFunction(props.component.events, {}, props.formInstance))
</script>
