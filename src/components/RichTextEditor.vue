<template>
  <div ref="editor"></div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
  watchEffect
} from 'vue'
import WangEditor from 'wangeditor'

export default defineComponent({
  name: 'RichTextEditor',
  props: {
    value: {
      type: String,
      default: ''
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:value'],
  setup(props, context) {
    const editor = ref()

    const content = computed({
      set: val => context.emit('update:value', val),
      get: () => props.value
    })

    let instance: WangEditor | null

    onMounted(() => {
      instance = new WangEditor(editor.value)
      Object.assign(instance.config, {
        zIndex: 9,
        onchange: (html: string) => (content.value = html)
      })
      instance.create()

      watchEffect(() =>
        instance && props.disable ? instance.disable() : instance?.enable()
      )
    })

    onBeforeUnmount(() => {
      instance && instance.destroy()
      instance = null
    })

    return {
      editor
    }
  }
})
</script>
