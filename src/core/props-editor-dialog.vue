<template>
  <el-dialog v-model="visible" title="动态props" destroy-on-close v-bind="$attrs">
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
  name: 'PropsEditorDialog'
})

const props = defineProps<{
  modelValue: boolean
  fieldName: 'dynamicProps' | 'dynamicFormItemProps'
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
  monacoEditorValue.value = `const ${props.fieldName} = ${state.selectWidgetItem?.[props.fieldName]}`
})

const handleSave = () => {
  state.selectWidgetItem![props.fieldName] = monacoEditorValue.value.replace(`const ${props.fieldName} = `, '')
  visible.value = false
}
</script>
