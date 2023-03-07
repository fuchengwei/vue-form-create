<!--
 * @Author: qiuyu.yu 40136166+yuqiuyu123@users.noreply.github.com
 * @Date: 2023-03-06 13:44:21
 * @LastEditors: qiuyu.yu 40136166+yuqiuyu123@users.noreply.github.com
 * @FilePath: /vue-form-create/src/core/element/field-widget/select-widget.vue
 * @Description: select
-->
<template>
  <el-select
    v-model="data"
    :multiple="element.options.multiple"
    :placeholder="element.options.placeholder"
    :clearable="element.options.clearable"
    :filterable="element.options.filterable"
    :disabled="disabled || element.options.disabled"
    :style="{ width: element.options.width }"
    @change="selectChange(element.type, $event, element.options)"
  >
    <el-option
      v-for="item of element.options.remote
        ? element.options.remoteOptions
        : element.options.options"
      :key="item.value"
      :value="item.value"
      :label="element.options.showLabel ? item.label : item.value"
    />
  </el-select>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { WidgetForm } from "@/config/element";
export default defineComponent({
  name: "select-widget",
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
