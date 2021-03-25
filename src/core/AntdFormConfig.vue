<template>
  <div class="form-config-container">
    <a-form layout="vertical">
      <a-form-item label="标签对齐方式">
        <a-radio-group
          v-model:value="data.labelAlign"
          button-style="solid"
        >
          <a-radio-button value="left">左对齐</a-radio-button>
          <a-radio-button value="right">右对齐</a-radio-button>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="标签布局">
        <span class="label">span</span>
        <a-input-number
          v-model:value="data.labelCol.span"
          :min="0"
          :max="24"
        />
        <span class="label">offset</span>
        <a-input-number
          v-model:value="data.labelCol.offset"
          :min="0"
          :max="24"
        />
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'AntdFormConfig',
  props: {
    config: {
      type: Object
    }
  },
  emits: ['update:config'],
  setup(props, context) {
    const data = ref(props.config)
    console.log(data.value)

    watch(data, () => context.emit('update:config', data))

    return {
      data
    }
  }
})
</script>
