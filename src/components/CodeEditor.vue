<template>
  <div ref="aceRef" style="width: 100%; height:  350px;"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
import ace, { Ace } from 'ace-builds'

interface State {
  aceRef?: HTMLElement
  codeEditor?: Ace.Editor
}

export default defineComponent({
  name: 'CodeEditor',
  props: {
    value: {
      type: String,
      default: ''
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
    const state = reactive<State>({
      aceRef: undefined,
      codeEditor: undefined
    })

    onMounted(() => {
      state.codeEditor = ace.edit(state.aceRef!, {
        mode: `ace/mode/${props.language}`,
        theme: `ace/theme/${props.theme}`,
        value: props.value,
        readOnly: props.readonly,
        fontSize: 12,
        tabSize: 2
      })

      state.codeEditor.on('change', () =>
        context.emit('update:value', state.codeEditor?.getValue())
      )
    })

    watch(
      () => props.value,
      val => {
        if (state.codeEditor) {
          const currentPosition = state.codeEditor?.selection.getCursor()
          state.codeEditor.setValue(val)
          state.codeEditor.clearSelection()
          state.codeEditor.gotoLine(
            currentPosition.row + 1,
            currentPosition.column,
            true
          )
        }
      }
    )

    return {
      ...toRefs(state)
    }
  }
})
</script>
