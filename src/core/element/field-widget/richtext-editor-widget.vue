<!--
 * @Author: qiuyu.yu 40136166+yuqiuyu123@users.noreply.github.com
 * @Date: 2023-03-06 13:44:21
 * @LastEditors: qiuyu.yu 40136166+yuqiuyu123@users.noreply.github.com
 * @FilePath: /vue-form-create/src/core/element/field-widget/richtext-editor-widget.vue
 * @Description: richtext-editor
-->
<template>
  <RichTextEditor
    v-model:value="data"
    :disable="disabled || element.options.disabled"
    :style="{ width: element.options.width }"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { WidgetForm } from "@/config/element";
import RichTextEditor from "@/components/RichTextEditor.vue";
export default defineComponent({
  name: "richtext-editor-widget",
  components: {
    RichTextEditor
  },
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
