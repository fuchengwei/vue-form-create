<template>
  <el-dialog v-model="visible" title="自定义style" destroy-on-close v-bind="$attrs">
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
  name: 'StyleEditorDialog'
})

const props = defineProps<{
  modelValue: boolean
  isGlobal?: boolean
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
  monacoEditorValue.value = `const customStyle = ${props.isGlobal ? state.globalStyle : state.selectWidgetItem?.customStyle}`
})

const handleSave = () => {
  const value = monacoEditorValue.value.replace('const customStyle = ', '')
  props.isGlobal ? (state.globalStyle = value) : (state.selectWidgetItem!.customStyle = value)
  visible.value = false
}
</script>
