<!--
 * @Author: qiuyu.yu 40136166+yuqiuyu123@users.noreply.github.com
 * @Date: 2023-03-06 13:44:21
 * @LastEditors: qiuyu.yu 40136166+yuqiuyu123@users.noreply.github.com
 * @FilePath: /vue-form-create/src/core/element/field-widget/password-widget.vue
 * @Description: 密码框
-->
<template>
  <el-input
    v-model="data"
    :style="{ width: element.options.width }"
    :placeholder="element.options.placeholder"
    :maxlength="parseInt(element.options.maxlength)"
    :clearable="element.options.clearable"
    :disabled="disabled || element.options.disabled"
    :readonly="element.options.readonly"
    :show-password="element.options.showPassword"
  >
    <template #prefix v-if="element.options.prefix">{{
      element.options.prefix
    }}</template>
    <template #suffix v-if="element.options.suffix">{{
      element.options.suffix
    }}</template>
    <template #prepend v-if="element.options.prepend">{{
      element.options.prepend
    }}</template>
    <template #append v-if="element.options.append">{{
      element.options.append
    }}</template>
  </el-input>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { WidgetForm } from "@/config/element";
export default defineComponent({
  name: "password-widget",
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
