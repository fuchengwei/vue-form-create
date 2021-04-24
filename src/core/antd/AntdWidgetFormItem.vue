<template>
  <div class="widget-item-container">
    <a-form-item
      class="widget-view"
      v-if="element"
      :key="element.key"
      :class="{ active: selectWidget?.key === element.key }"
      :label="element.label"
      :rules="element.options.rules"
    >
      <template v-if="element.type === 'input'">
        <a-input
          readonly
          :size="config.size"
          :value="element.options.defaultValue"
          :style="{ width: element.options.width }"
          :placeholder="element.options.placeholder"
          :maxlength="parseInt(element.options.maxlength)"
          :prefix="element.options.prefix"
          :suffix="element.options.suffix"
          :addonBefore="element.options.addonBefore"
          :addonAfter="element.options.addonAfter"
          :allowClear="element.options.allowClear"
          :disabled="element.options.disabled"
        />
      </template>

      <template v-if="element.type === 'password'">
        <a-input-password
          readonly
          :size="config.size"
          :value="element.options.defaultValue"
          :style="{ width: element.options.width }"
          :placeholder="element.options.placeholder"
          :maxlength="element.options.maxlength"
          :prefix="element.options.prefix"
          :suffix="element.options.suffix"
          :addonBefore="element.options.addonBefore"
          :addonAfter="element.options.addonAfter"
          :allowClear="element.options.allowClear"
          :disabled="element.options.disabled"
          :visibilityToggle="element.options.visibilityToggle"
        />
      </template>

      <template v-if="element.type === 'textarea'">
        <a-textarea
          style="resize: none"
          readonly
          :size="config.size"
          :rows="element.options.rows"
          :value="element.options.defaultValue"
          :style="{ width: element.options.width }"
          :placeholder="element.options.placeholder"
          :maxlength="element.options.maxlength"
          :showCount="element.options.showCount"
          :autoSize="element.options.autoSize"
          :allowClear="element.options.allowClear"
          :disabled="element.options.disabled"
        />
      </template>

      <template v-if="element.type === 'number'">
        <a-input-number
          readonly
          :size="config.size"
          :value="element.options.defaultValue"
          :style="{ width: element.options.width }"
          :max="element.options.max"
          :min="element.options.min"
          :disabled="element.options.disabled"
        />
      </template>

      <template v-if="element.type === 'radio'">
        <a-radio-group
          :size="config.size"
          :value="element.options.defaultValue"
          :style="{ width: element.options.width }"
          :disabled="element.options.disabled"
        >
          <a-radio
            v-for="item of element.options.options"
            :key="item.value"
            :value="item.value"
            :style="{
              display: element.options.inline ? 'inline-block' : 'block'
            }"
            >{{ element.options.showLabel ? item.label : item.value }}</a-radio
          >
        </a-radio-group>
      </template>

      <template v-if="element.type === 'checkbox'">
        <a-checkbox-group
          :value="element.options.defaultValue"
          :style="{ width: element.options.width }"
          :disabled="element.options.disabled"
        >
          <a-checkbox
            v-for="item of element.options.options"
            :key="item.value"
            :value="item.value"
            :style="{
              display: element.options.inline ? 'inline-block' : 'block'
            }"
            >{{
              element.options.showLabel ? item.label : item.value
            }}</a-checkbox
          >
        </a-checkbox-group>
      </template>

      <template v-if="element.type === 'time'">
        <a-time-picker
          :size="config.size"
          :value="element.options.defaultValue"
          :placeholder="element.options.placeholder"
          :inputReadOnly="element.options.readonly"
          :allowClear="element.options.allowClear"
          :format="element.options.format"
          :valueFormat="element.options.valueFormat"
          :disabled="element.options.disabled"
          :style="{ width: element.options.width }"
        />
      </template>

      <template v-if="element.type === 'date'">
        <a-date-picker
          :size="config.size"
          :value="element.options.defaultValue"
          :placeholder="element.options.placeholder"
          :inputReadOnly="element.options.readonly"
          :allowClear="element.options.allowClear"
          :format="element.options.format"
          :disabled="element.options.disabled"
          :style="{ width: element.options.width }"
        />
      </template>

      <template v-if="element.type === 'rate'">
        <a-rate
          :value="element.options.defaultValue"
          :count="element.options.max"
          :allowHalf="element.options.allowHalf"
          :allowClear="element.options.allowClear"
          :disabled="element.options.disabled"
        />
      </template>

      <template v-if="element.type === 'select'">
        <a-select
          :size="config.size"
          :mode="element.options.mode"
          :value="element.options.defaultValue"
          :placeholder="element.options.placeholder"
          :filter-option="handleFilterOption"
          :allowClear="element.options.clearable"
          :showSearch="element.options.showSearch"
          :disabled="element.options.disabled"
          :style="{ width: element.options.width }"
        >
          <a-select-option
            v-for="item of element.options.options"
            :key="item.value"
            :value="item.value"
            :label="element.options.showLabel ? item.label : item.value"
          >
            {{ element.options.showLabel ? item.label : item.value }}
          </a-select-option>
        </a-select>
      </template>

      <template v-if="element.type === 'switch'">
        <a-switch
          :size="config.size === 'large' ? 'default' : config.size"
          :checked="element.options.defaultValue"
          :checkedChildren="element.options.checkedChildren"
          :unCheckedChildren="element.options.unCheckedChildren"
          :disabled="element.options.disabled"
        />
      </template>

      <template v-if="element.type === 'slider'">
        <a-slider
          :value="element.options.defaultValue"
          :min="element.options.min"
          :max="element.options.max"
          :step="element.options.step"
          :range="element.options.range"
          :reverse="element.options.reverse"
          :disabled="element.options.disabled"
          :style="{ width: element.options.width }"
        />
      </template>

      <template v-if="element.type == 'text'">
        <span>{{ element.options.defaultValue }}</span>
      </template>

      <template v-if="element.type === 'img-upload'">
        <a-upload
          :name="element.options.file"
          :action="element.options.action"
          :accept="element.options.accept"
          :file-list="element.options.defaultValue"
          :listType="element.options.listType"
          :multiple="element.options.multiple"
          :disabled="element.options.disabled"
        >
          <SvgIcon
            v-if="element.options.listType === 'picture-card'"
            iconClass="insert"
          />
          <a-button v-else>
            <SvgIcon iconClass="img-upload" style="margin-right: 10px;" />
            点击上传
          </a-button>
        </a-upload>
      </template>

      <template v-if="element.type === 'richtext-editor'">
        <RichTextEditor
          :value="element.options.defaultValue"
          :disable="element.options.disabled"
          :style="{ width: element.options.width }"
        />
      </template>

      <template v-if="element.type === 'cascader'">
        <a-cascader
          :size="config.size"
          :value="element.options.defaultValue"
          :options="element.options.remoteOptions"
          :placeholder="element.options.placeholder"
          :allowClear="element.options.allowClear"
          :disabled="element.options.disabled"
          :style="{ width: element.options.width }"
        />
      </template>
    </a-form-item>
    <div class="widget-view-action" v-if="selectWidget?.key === element.key">
      <SvgIcon iconClass="copy" @click.stop="$emit('copy')" />
      <SvgIcon iconClass="delete" @click.stop="$emit('delete')" />
    </div>

    <div class="widget-view-drag" v-if="selectWidget?.key === element.key">
      <SvgIcon iconClass="move" className="drag-widget" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
import RichTextEditor from '@/components/RichTextEditor.vue'

export default defineComponent({
  name: 'AntdWidgetFormItem',
  components: {
    SvgIcon,
    RichTextEditor
  },
  props: {
    element: {
      type: Object,
      required: true
    }
  },
  emits: ['copy', 'delete'],
  setup() {
    const widgetForm = inject<any>('widgetFormRef')
    const selectWidget = inject('selectWidgetFormRef')

    const config = widgetForm.value.config

    const handleFilterOption = (input: string, option: { label: string }) =>
      option.label.toLowerCase().includes(input)

    return {
      config,
      selectWidget,
      handleFilterOption
    }
  }
})
</script>
