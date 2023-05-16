<template>
  <el-main class="bg-zinc-50 p-2 relative box-border">
    <div v-if="!state.widgetFormList.length" class="absolute top-[40%] w-[98%] text-center text-xl text-gray-400">从左侧拖拽来添加字段</div>
    <el-config-provider v-bind="state.globalConfig">
      <el-form ref="formInstance" v-bind="state.formConfig" v-on="eventFunction">
        <draggable
          tag="div"
          item-key="key"
          :animation="200"
          :group="{ name: 'people' }"
          :list="state.widgetFormList"
          class="widget-form-list bg-white shadow-2xl shadow-slate-200"
          v-bind="commonProps"
          @add="handlerDragAdd"
        >
          <template #item="{ element }">
            <widget-form-item :component="element" :form-instance="formInstance" />
          </template>
        </draggable>
      </el-form>
    </el-config-provider>
  </el-main>
</template>

<script lang="ts" setup>
import Draggable from 'vuedraggable'
import { v4 } from 'uuid'
import { cloneDeep } from 'lodash-es'
import WidgetFormItem from './widget-form-item.vue'
import { remoteIconList, state } from '@/store'
import { createEventFunction, loadDynamicParams } from '@/utils'

import type { FormInstance } from 'element-plus'

defineOptions({
  name: 'WidgetForm'
})

const formInstance = ref<FormInstance>()

const commonProps = computed(() => ({
  class: loadDynamicParams(state.globalClass, {}, '加载自定义类名失败', state.globalState),
  style: loadDynamicParams(state.globalStyle, [], '加载自定义样式失败', state.globalState)
}))

const eventFunction = computed(() => createEventFunction(state.formEvents, {}, formInstance.value))

const handlerDragAdd = ({ newIndex }: { newIndex: number }) => {
  const key = v4().replaceAll('-', '')

  const widgetFormList = cloneDeep(state.widgetFormList)

  widgetFormList[newIndex].key = `${widgetFormList[newIndex].type}_${key}`

  if (widgetFormList[newIndex].type === 'Icon' && remoteIconList.value.length) {
    widgetFormList[newIndex].config.name = remoteIconList.value[0]
  }

  state.widgetFormList[newIndex] = state.selectWidgetItem = widgetFormList[newIndex]
}

watch(
  [state.pageLifecycle, formInstance],
  () => {
    if (!formInstance.value) return

    const pageLifecycle = createEventFunction(state.pageLifecycle, {}, formInstance.value)

    pageLifecycle.onMounted()
    pageLifecycle.onUpdated()
  },
  {
    deep: true,
    immediate: true
  }
)
</script>

<style scoped>
.widget-form-list {
  min-height: calc(100vh - 65px);
  max-height: calc(100vh - 65px);
}
</style>
