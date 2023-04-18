<template>
  <el-dialog v-model="visible" :title="title" destroy-on-close v-bind="$attrs">
    <monaco-editor v-model="monacoEditorValue" language="javascript" :height="height" />
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleSave">确定</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import MonacoEditor from '@/components/monaco-editor.vue'

defineOptions({
  name: 'FunctionEditorDialog'
})

const props = defineProps<{
  title: string
  modelVisible: boolean
  modelValue: string
}>()

const emits = defineEmits<{
  (eventName: 'update:modelVisible', val: boolean): void
  (eventName: 'update:modelValue', val: string): void
}>()

const visible = computed({
  get: () => props.modelVisible,
  set: (value) => emits('update:modelVisible', value)
})

const height = `${document.body.clientHeight / 2}px`

const monacoEditorValue = ref('')

watchEffect(() => {
  monacoEditorValue.value = props.modelValue
})

const handleSave = () => {
  emits('update:modelValue', monacoEditorValue.value)
  visible.value = false
}
</script>
