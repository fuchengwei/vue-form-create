<template>
  <div ref="monacoEditorRef" class="border border-inherit" :style="{ height: props.height }"></div>
</template>

<script lang="ts" setup>
const monacoEditorRef = ref<HTMLDivElement>()

defineOptions({
  name: 'MonacoEditor'
})

const props = withDefaults(
  defineProps<{
    modelValue: string
    height?: string
    theme?: string
    language?: string
    readonly?: boolean
  }>(),
  {
    height: '100%',
    theme: 'vs',
    readonly: false
  }
)

const emits = defineEmits<{
  (eventName: 'update:modelValue', val: string): void
}>()

onMounted(() => {
  const model = window.monaco.editor.createModel(props.modelValue, props.language)
  const editorInstance = window.monaco.editor.create(monacoEditorRef.value!, {
    model,
    theme: props.theme,
    tabSize: 2,
    fontSize: 14,
    formatOnType: true,
    formatOnPaste: true,
    automaticLayout: true,
    emptySelectionClipboard: true,
    scrollBeyondLastLine: true,
    readOnly: props.readonly,
    minimap: {
      enabled: false
    },
    scrollbar: {
      vertical: 'hidden',
      horizontal: 'hidden',
      verticalScrollbarSize: 0,
      horizontalScrollbarSize: 0,
      alwaysConsumeMouseWheel: false
    }
  })

  editorInstance.onDidChangeModelContent(() => emits('update:modelValue', editorInstance.getValue()))
})
</script>
