<!--
 * @Author: qiuyu.yu 40136166+yuqiuyu123@users.noreply.github.com
 * @Date: 2023-03-06 16:55:27
 * @LastEditors: qiuyu.yu 40136166+yuqiuyu123@users.noreply.github.com
 * @FilePath: /vue-form-create/src/core/element/field-widget/img-upload-widget.vue
 * @Description: img-upload
-->
<template>
  <el-upload
    :name="element.options.file"
    :action="element.options.action"
    :accept="element.options.accept"
    :file-list="element.options.defaultValue"
    :listType="element.options.listType"
    :multiple="element.options.multiple"
    :limit="element.options.limit"
    :disabled="disabled || element.options.disabled"
    :on-success="handleUploadSuccess"
  >
    <SvgIcon v-if="element.options.listType === 'picture-card'" iconClass="insert" />
    <el-button v-else>
        <SvgIcon iconClass="img-upload" style="margin-right: 10px" />点击上传
    </el-button>
  </el-upload>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { WidgetForm } from "@/config/element";
import SvgIcon from "@/components/SvgIcon.vue";
export default defineComponent({
  name: "img-upload-widget",
  components: {
    SvgIcon
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

    const handleUploadSuccess = (_res: any, _file: any, fileList: any[]) => {
      data.value = fileList;
    };
    return {
      data,
      handleUploadSuccess
    };
  }
});
</script>
