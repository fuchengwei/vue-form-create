<!--
 * @Author: qiuyu.yu 40136166+yuqiuyu123@users.noreply.github.com
 * @Date: 2023-03-06 13:44:21
 * @LastEditors: qiuyu.yu 40136166+yuqiuyu123@users.noreply.github.com
 * @FilePath: /vue-form-create/src/core/element/field-widget/textarea-widget.vue
 * @Description: textarea
-->
<template>
  <el-input
    type="textarea"
    resize="none"
    v-model="data"
    :rows="element.options.rows"
    :style="{ width: element.options.width }"
    :placeholder="element.options.placeholder"
    :maxlength="parseInt(element.options.maxlength)"
    :show-word-limit="element.options.showWordLimit"
    :autosize="element.options.autosize"
    :clearable="element.options.clearable"
    :readonly="element.options.readonly"
    :disabled="disabled || element.options.disabled"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { WidgetForm } from "@/config/element";
export default defineComponent({
  name: "textarea-widget",
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
