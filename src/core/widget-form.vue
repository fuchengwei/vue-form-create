<template>
  <el-main class="bg-zinc-50 p-2 relative box-border">
    <div v-if="!state.widgetFormList.length" class="absolute top-[40%] w-[98%] text-center text-xl text-gray-400">从左侧拖拽来添加字段</div>
    <el-form ref="formInstance" v-bind="state.formConfig">
      <draggable
        tag="div"
        item-key="key"
        handler=".drag-widget"
        :animation="200"
        :group="{ name: 'people' }"
        :list="state.widgetFormList"
        @add="handlerDragAdd"
        class="widget-form-list bg-white shadow-2xl shadow-slate-200"
      >
        <template #item="{ element }">
          <widget-form-item :component="element" :form-instance="formInstance" />
        </template>
      </draggable>
    </el-form>
  </el-main>
</template>

<script lang="ts" setup>
import Draggable from 'vuedraggable'
import { v4 } from 'uuid'
import { cloneDeep } from 'lodash-es'
import WidgetFormItem from './widget-form-item.vue'
import { state } from '@/store'

import type { FormInstance } from 'element-plus'

defineOptions({
  name: 'WidgetForm'
})

const formInstance = ref<FormInstance>()

const handlerDragAdd = ({ newIndex }: { newIndex: number }) => {
  const key = v4().replaceAll('-', '')

  const widgetFormList = cloneDeep(state.widgetFormList)

  widgetFormList[newIndex].key = `${widgetFormList[newIndex].type}_${key}`

  state.widgetFormList[newIndex] = widgetFormList[newIndex]
  state.selectWidgetItem = widgetFormList[newIndex]
}
</script>

<style scoped>
.widget-form-list {
  min-height: calc(100vh - 65px);
  max-height: calc(100vh - 65px);
}
</style>
