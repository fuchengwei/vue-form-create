<template>
  <a-form-item
    v-if="element"
    :key="element.key"
    :label="element.label"
    :name="element.model"
    :rules="element.options.rules"
  >
    <template v-if="element.type === 'input'">
      <a-input
        v-model:value="data"
        :size="config.size"
        :style="{width: element.options.width}"
        :placeholder="element.options.placeholder"
        :maxlength="element.options.maxlength"
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
        v-model:value="data"
        :size="config.size"
        :style="{width: element.options.width}"
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
        v-model:value="data"
        :size="config.size"
        :rows="element.options.rows"
        :style="{width: element.options.width}"
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
        v-model:value="data"
        :size="config.size"
        :style="{width: element.options.width}"
        :max="element.options.max"
        :min="element.options.min"
        :disabled="element.options.disabled"
      />
    </template>

    <template v-if="element.type === 'radio'">
      <a-radio-group
        v-model:value="data"
        :size="config.size"
        :style="{width: element.options.width}"
        :disabled="element.options.disabled"
      >
        <a-radio
          v-for="item of element.options.options"
          :key="item.value"
          :value="item.value"
          :style="{display: element.options.inline ? 'inline-block' : 'block'}"
        >{{ element.options.showLabel ? item.label : item.value }}</a-radio>
      </a-radio-group>
    </template>

    <template v-if="element.type === 'checkbox'">
      <a-checkbox-group
        v-model:value="data"
        :style="{width: element.options.width}"
        :disabled="element.options.disabled"
      >
        <a-checkbox
          v-for="item of element.options.options"
          :key="item.value"
          :value="item.value"
          :style="{display: element.options.inline ? 'inline-block' : 'block'}"
        >{{ element.options.showLabel ? item.label : item.value }}</a-checkbox>
      </a-checkbox-group>
    </template>

    <template v-if="element.type === 'time'">
      <a-time-picker
        v-model:value="data"
        :size="config.size"
        :placeholder="element.options.placeholder"
        :inputReadOnly="element.options.readonly"
        :allowClear="element.options.allowClear"
        :format="element.options.format"
        :disabled="element.options.disabled"
        :style="{width: element.options.width}"
      />
    </template>

    <template v-if="element.type === 'date'">
      <a-date-picker
        v-model:value="data"
        :size="config.size"
        :placeholder="element.options.placeholder"
        :inputReadOnly="element.options.readonly"
        :allowClear="element.options.allowClear"
        :format="element.options.format"
        :disabled="element.options.disabled"
        :style="{width: element.options.width}"
      />
    </template>

    <template v-if="element.type === 'rate'">
      <a-rate
        v-model:value="data"
        :count="element.options.max"
        :allowHalf="element.options.allowHalf"
        :allowClear="element.options.allowClear"
        :disabled="element.options.disabled"
      />
    </template>

    <template v-if="element.type === 'select'">
      <a-select
        v-model:mode="data"
        :size="config.size"
        :value="element.options.defaultValue"
        :placeholder="element.options.placeholder"
        :filter-option="handleFilterOption"
        :allowClear="element.options.clearable"
        :showSearch="element.options.showSearch"
        :disabled="element.options.disabled"
        :style="{width: element.options.width}"
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
        v-model:checked="data"
        :size="config.size === 'large' ? 'default' : config.size"
        :checkedChildren="element.options.checkedChildren"
        :unCheckedChildren="element.options.unCheckedChildren"
        :disabled="element.options.disabled"
      />
    </template>

    <template v-if="element.type === 'slider'">
      <a-slider
        v-model:value="data"
        :min="element.options.min"
        :max="element.options.max"
        :step="element.options.step"
        :range="element.options.range"
        :reverse="element.options.reverse"
        :disabled="element.options.disabled"
        :style="{width: element.options.width}"
      />
    </template>

    <template v-if="element.type == 'text'">
      <span>{{element.options.defaultValue}}</span>
    </template>

    <template v-if="element.type === 'img-upload'">
      <a-upload
        :name="element.options.file"
        :action="element.options.action"
        :accept="element.options.accept"
        :file-list="data"
        :listType="element.options.listType"
        :multiple="element.options.multiple"
        :disabled="element.options.disabled"
        @change="handleUploadChange"
      >
        <SvgIcon
          v-if="element.options.listType === 'picture-card'"
          iconClass="insert"
        />
        <a-button v-else>
          <SvgIcon
            iconClass="img-upload"
            style="margin-right: 10px;"
          />
          点击上传
        </a-button>
      </a-upload>

    </template>

    <template v-if="element.type === 'richtext-editor'">
      <RichTextEditor
        v-model:value="data"
        :disable="element.options.disabled"
        :style="{width: element.options.width}"
      />
    </template>

    <template v-if="element.type === 'cascader'">
      <a-cascader
        v-model:value="data"
        :size="config.size"
        :options="element.options.remoteOptions"
        :placeholder="element.options.placeholder"
        :allowClear="element.options.allowClear"
        :disabled="element.options.disabled"
        :style="{width: element.options.width}"
      />
    </template>
  </a-form-item>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
import RichTextEditor from '@/components/RichTextEditor.vue'

export default defineComponent({
  name: 'AntdGenerateFormItem',
  components: {
    SvgIcon,
    RichTextEditor
  },
  props: {
    config: {
      type: Object
    },
    element: {
      type: Object
    },
    model: {
      type: Object
    }
  },
  emits: ['update:model'],
  setup(props, context) {
    const data = computed({
      get: () => props.model[props.element.model],
      set: (val) => {
        const model = JSON.parse(JSON.stringify(props.model))
        model[props.element.model] = val
        context.emit('update:model', model)
      }
    })

    const handleFilterOption = (input: string, option) => {
      const { label }: { label: string } = option
      return label.toLowerCase().includes(input)
    }

    const handleUploadChange = ({ fileList }) => {
      data.value = fileList
    }

    return {
      data,
      handleFilterOption,
      handleUploadChange
    }
  }
})
</script>
