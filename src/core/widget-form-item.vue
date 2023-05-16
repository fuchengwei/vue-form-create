<template>
  <draggable
    v-if="['Row', 'Col'].includes(props.component.type)"
    item-key="key"
    :tag="`el-${props.component.type.toLocaleLowerCase()}`"
    :group="{ name: 'people' }"
    :list="props.component.childNodes"
    :component-data="componentData"
    @add="handlerDragAdd"
  >
    <template #item="{ element }">
      <widget-form-item :component="element" :form-instance="props.formInstance" />
    </template>
  </draggable>

  <div v-else :class="commonClass" @click.stop.prevent="state.selectWidgetItem = props.component">
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
import Draggable from 'vuedraggable'
import { v4 } from 'uuid'
import { cloneDeep } from 'lodash-es'
import SvgIcon from '@/components/svg-icon.vue'
import { remoteIconList, state } from '@/store'
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
  class: loadDynamicParams(props.component.customClass, [], '加载自定义类名失败', state.globalState),
  style: loadDynamicParams(props.component.customStyle, {}, '加载自定义样式失败', state.globalState),
  ...loadDynamicParams(props.component.dynamicProps, {}, '加载props失败', state.globalState)
}))

const commonClass = computed(() => [
  'mx-0.5 my-1 bg-blue-50 border border-dashed pb-5',
  state.selectWidgetItem?.key === props.component.key
    ? 'outline outline-2 outline-blue-400 border-blue-400'
    : 'border-gray-300 hover:outline hover:outline-1 hover:outline-blue-400',
  ['Row', 'Col'].includes(props.component.type) && 'min-h-[50px]'
])

const componentData = computed(() => {
  const _componentData = {
    ...commonProps.value,
    onClick: (event: Event) => {
      event.stopPropagation()
      state.selectWidgetItem = props.component
    }
  }
  if (['Row', 'Col'].includes(props.component.type)) {
    _componentData.class = [
      ...commonProps.value.class,
      commonClass.value[0],
      commonClass.value[1],
      !props.component.childNodes?.length ? `min-w-[50px] min-h-[50px] ${props.component.type === 'Col' && 'inline'}` : props.component.type === 'Col' && 'inline-table'
    ]
  }
  return _componentData
})

const eventFunction = computed(() => createEventFunction(props.component.events, {}, props.formInstance))

const handlerDragAdd = ({ newIndex }: { newIndex: number }) => {
  const key = v4().replaceAll('-', '')

  const childNodes = cloneDeep(props.component.childNodes!)

  childNodes[newIndex].key = `${childNodes[newIndex].type}_${key}`

  if (childNodes[newIndex].type === 'Icon' && remoteIconList.value.length) {
    childNodes[newIndex].config.name = remoteIconList.value[0]
  }

  props.component.childNodes![newIndex] = state.selectWidgetItem = childNodes[newIndex]
}
</script>
