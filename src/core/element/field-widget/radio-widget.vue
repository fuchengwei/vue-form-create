<!--
 * @Author: qiuyu.yu 40136166+yuqiuyu123@users.noreply.github.com
 * @Date: 2023-03-06 13:44:21
 * @LastEditors: qiuyu.yu 40136166+yuqiuyu123@users.noreply.github.com
 * @FilePath: /vue-form-create/src/core/element/field-widget/radio-widget.vue
 * @Description: radio
-->
<template>
  <el-radio-group
    v-model="data"
    :style="{ width: element.options.width }"
    :disabled="disabled || element.options.disabled"
  >
    <el-radio
      v-for="item of element.options.remote
        ? element.options.remoteOptions
        : element.options.options"
      :key="item.value"
      :label="item.value"
      :style="{
        display: element.options.inline ? 'inline-block' : 'block',
      }"
      >{{ element.options.showLabel ? item.label : item.value }}</el-radio
    >
  </el-radio-group>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { WidgetForm } from "@/config/element";
export default defineComponent({
  name: "radio-widget",
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
