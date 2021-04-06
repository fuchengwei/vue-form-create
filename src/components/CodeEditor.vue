<template>
  <div
    ref="aceRef"
    style="width: 100%; height:  350px;"
  ></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
import ace, { Ace } from 'ace-builds'
import 'ace-builds/webpack-resolver'

export default defineComponent({
  name: 'CodeEditor',
  props: {
    value: {
      type: String
    },
    language: {
      type: String,
      default: 'javascript'
    },
    theme: {
      tyle: String,
      default: 'github'
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:value'],
  setup(props, context) {
    const state = reactive({
      aceRef: null,
      codeEditor: null as Ace.Editor
    })

    onMounted(() => {
      state.codeEditor = ace.edit(state.aceRef, {
        mode: `ace/mode/${props.language}`,
        theme: `ace/theme/${props.theme}`,
        value: props.value as string,
        readOnly: props.readonly,
        fontSize: 12,
        tabSize: 2
      })

      state.codeEditor.on('change', () =>
        context.emit('update:value', state.codeEditor.getValue())
      )
    })

    watch(
      () => props.value,
      (val: string) => state.codeEditor.setValue(val)
    )

    return {
      ...toRefs(state)
    }
  }
})
</script>
