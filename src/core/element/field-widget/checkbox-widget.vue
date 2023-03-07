<!--
 * @Author: qiuyu.yu 40136166+yuqiuyu123@users.noreply.github.com
 * @Date: 2023-03-06 16:55:27
 * @LastEditors: qiuyu.yu 40136166+yuqiuyu123@users.noreply.github.com
 * @FilePath: /vue-form-create/src/core/element/field-widget/checkbox-widget.vue
 * @Description: checkbox
-->
<template>
  <el-checkbox-group
    v-model="data"
    :style="{ width: element.options.width }"
    :disabled="disabled || element.options.disabled"
  >
    <el-checkbox
      v-for="item of element.options.remote
        ? element.options.remoteOptions
        : element.options.options"
      :key="item.value"
      :label="item.value"
      :style="{
        display: element.options.inline ? 'inline-block' : 'block',
      }"
    >
      {{ element.options.showLabel ? item.label : item.value }}
    </el-checkbox>
  </el-checkbox-group>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { WidgetForm } from "@/config/element";
export default defineComponent({
  name: "checkbox-widget",
  props: {
    config: {
      type: Object as PropType<WidgetForm["config"]>,
      required: true
    },
    element: {
      type: Object,
      required: true
    },
    model: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      required: true
    }
  },
  setup(props) {
    const data = computed({
      get: () => props.model[props.element.model],
      set: (val) => {
        // eslint-disable-next-line vue/no-mutating-props
        props.model[props.element.model] = val;
      }
    });
    return {
      data
    };
  }
});
</script>
