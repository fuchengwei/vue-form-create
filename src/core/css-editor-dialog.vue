<template>
  <el-dialog v-model="visible" title="全局样式表" destroy-on-close v-bind="$attrs">
    <monaco-editor v-model="monacoEditorValue" language="css" :height="height" />
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleSave">确定</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import MonacoEditor from '@/components/monaco-editor.vue'
import { state } from '@/store'
import { loadCss } from '@/utils'

defineOptions({
  name: 'CssEditorDialog'
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
  monacoEditorValue.value = state.globalCss
})

const handleSave = () => {
  state.globalCss = monacoEditorValue.value
  loadCss(monacoEditorValue.value)
  visible.value = false
}
</script>
