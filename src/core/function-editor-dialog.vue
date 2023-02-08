<template>
  <el-dialog v-model="visible" title="动作设置" destroy-on-close v-bind="$attrs">
    <monaco-editor v-model="monacoEditorValue" language="javascript" :height="height" />
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleSave">确定</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import MonacoEditor from '@/components/monaco-editor.vue'
import { state } from '@/store'

import type { State } from '@/store'

defineOptions({
  name: 'FunctionEditorDialog'
})

const props = defineProps<{
  modelValue: boolean
  eventName: string
  field?: keyof Pick<State, 'formEvents'>
}>()

const emits = defineEmits<{
  (eventName: 'update:modelValue', val: boolean): void
}>()

const visible = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value)
})

const height = `${document.body.clientHeight / 2}px`

const monacoEditorValue = ref('')

watchEffect(() => {
  monacoEditorValue.value = props.field ? state[props.field][props.eventName] : state.selectWidgetItem!.events![props.eventName]
})

const handleSave = () => {
  props.field ? (state[props.field][props.eventName] = monacoEditorValue.value) : (state.selectWidgetItem!.events![props.eventName] = monacoEditorValue.value)
  visible.value = false
}
</script>
