<!--
 * @Author: qiuyu.yu 40136166+yuqiuyu123@users.noreply.github.com
 * @Date: 2023-03-06 13:44:21
 * @LastEditors: qiuyu.yu 40136166+yuqiuyu123@users.noreply.github.com
 * @FilePath: /vue-form-create/src/core/element/field-widget/text-widget.vue
 * @Description: text
-->
<template>
  <span>{{ element.options.defaultValue }}</span>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { WidgetForm } from "@/config/element";
export default defineComponent({
  name: "text-widget",
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
  }
});
</script>
