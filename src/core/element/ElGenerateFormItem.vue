<!--
 * @Author: qiuyu.yu 40136166+yuqiuyu123@users.noreply.github.com
 * @Date: 2023-02-23 18:03:42
 * @LastEditors: qiuyu.yu 40136166+yuqiuyu123@users.noreply.github.com
 * @FilePath: /vue-form-create/src/core/element/ElGenerateFormItem.vue
 * @Description: 表单项
-->
<template>
  <el-form-item
    v-if="element"
    :key="element.key"
    :label="element.label"
    :prop="element.model"
  >
    <component :is="getWidgetName(element.type)" v-bind="$props"></component>
  </el-form-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { WidgetForm } from "@/config/element";
import FieldComponents from "./field-widget/index";

export default defineComponent({
  name: "ElGenerateFormItem",
  components: {
    // SvgIcon,
    // RichTextEditor,
    // ...FieldComponents
    // ceshi
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
  emits: ["update:changeSelect"],
  setup(props, context) {
    const selectChange = (type: string, data: any, option: any) => {
      context.emit("update:changeSelect", type, data, option);
    };

    const getSelectData = () => {
      console.log(123455);
    };

    const getWidgetName = (type: any) => {
      const compType = type + '-widget'
      const c = FieldComponents[compType]
      return c
    }

    return {
      selectChange,
      getSelectData,
      getWidgetName
    };
  }
});
</script>
