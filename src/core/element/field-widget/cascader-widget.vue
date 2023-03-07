<!--
 * @Author: qiuyu.yu 40136166+yuqiuyu123@users.noreply.github.com
 * @Date: 2023-03-06 13:44:21
 * @LastEditors: qiuyu.yu 40136166+yuqiuyu123@users.noreply.github.com
 * @FilePath: /vue-form-create/src/core/element/field-widget/cascader-widget.vue
 * @Description: cascader-widget
-->
<template>
  <el-cascader
    v-model="data"
    :options="element.options.remoteOptions"
    :placeholder="element.options.placeholder"
    :filterable="element.options.filterable"
    :clearable="element.options.clearable"
    :disabled="disabled || element.options.disabled"
    :style="{ width: element.options.width }"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { WidgetForm } from "@/config/element";
export default defineComponent({
  name: "cascader-widget",
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
  setup(props, context) {
    const data = computed({
      get: () => props.model[props.element.model],
      set: (val) => {
        // eslint-disable-next-line vue/no-mutating-props
        props.model[props.element.model] = val;
      }
    });

    const selectChange = (type: string, data: any, option: any) => {
      context.emit("update:changeSelect", type, data, option);
    };

    return {
      data,
      selectChange
    };
  }
});
</script>
