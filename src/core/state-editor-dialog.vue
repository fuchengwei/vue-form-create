<template>
  <el-dialog v-model="visible" title="全局State" destroy-on-close v-bind="$attrs">
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

defineOptions({
  name: 'StateEditorDialog'
})

const props = defineProps<{
  modelValue: boolean
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
  monacoEditorValue.value = `const globalState = ${JSON.stringify(state.globalState, null, 2).replace(/"([^"]+)":/g, '$1:')}`
})

const handleSave = () => {
  state.globalState = eval(`(${monacoEditorValue.value.replace('const globalState = ', '')})`)
  visible.value = false
}
</script>
