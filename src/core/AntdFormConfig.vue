<template>
  <div class="form-config-container">
    <a-form layout="vertical">
      <a-form-item label="表单布局">
        <a-radio-group v-model:value="data.layout" button-style="solid">
          <a-radio-button value="horizontal">水平排列</a-radio-button>
          <a-radio-button value="vertical">垂直排列</a-radio-button>
          <a-radio-button value="inline">内联</a-radio-button>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="标签对齐方式">
        <a-radio-group v-model:value="data.labelAlign" button-style="solid">
          <a-radio-button value="left">左对齐</a-radio-button>
          <a-radio-button value="right">右对齐</a-radio-button>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="标签布局">
        <span class="label">span</span>
        <a-input-number v-model:value="data.labelCol.span" :min="0" :max="24" />
        <span class="label">offset</span>
        <a-input-number
          v-model:value="data.labelCol.offset"
          :min="0"
          :max="24"
        />
      </a-form-item>

      <a-form-item label="组件尺寸">
        <a-radio-group v-model:value="data.size" button-style="solid">
          <a-radio-button value="large">大</a-radio-button>
          <a-radio-button value="default">默认</a-radio-button>
          <a-radio-button value="small">小</a-radio-button>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="隐藏必选标记">
        <a-switch
          checked-children="隐藏"
          un-checked-children="显示"
          v-model:checked="data.hideRequiredMark"
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

    watch(data, () => context.emit('update:config', data))

    return {
      data
    }
  }
})
</script>
