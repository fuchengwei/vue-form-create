<template>
  <a-form-item
    class="widget-view"
    v-if="element"
    :class="{active: selectWidget.key === element.key, required: element.options.required}"
    :label="element.name"
  >
    <template v-if="element.type === 'input'">
      <a-input
        :value="element.options.defaultValue"
        :style="{width: element.options.width}"
        :placeholder="element.options.placeholder"
        :disabled="element.options.disabled"
      />
    </template>

    <template v-if="element.type === 'textarea'">
      <a-textarea
        :value="element.options.defaultValue"
        :rows="5"
        :style="{width: element.options.width}"
        :placeholder="element.options.placeholder"
        :disabled="element.options.disabled"
      />
    </template>

    <template v-if="element.type === 'number'">
      <a-input-number
        :value="element.options.defaultValue"
        :style="{width: element.options.width}"
        :min="element.options.min"
        :max="element.options.max"
        :step="element.options.step"
        :disabled="element.options.disabled"
      />
    </template>

    <template v-if="element.type === 'radio'">
      <a-radio-group
        :value="element.options.defaultValue"
        :style="{width: element.options.width}"
        :disabled="element.options.disabled"
      >
        <a-radio
          v-for="item of element.options.options"
          :key="item.value"
          :value="item.value"
          :style="{disabled: element.options.inline ? 'inline-blokc' : 'block'}"
        >{{ element.options.showLabel ? item.label : item.value }}</a-radio>
      </a-radio-group>
    </template>

    <template v-if="element.type === 'checkbox'">
      <a-checkbox-group
        :value="element.options.defaultValue"
        :style="{width: element.options.width}"
        :disabled="element.options.disabled"
      >
        <a-checkbox
          v-for="item of element.options.options"
          :key="item.value"
          :value="item.value"
          :style="{disabled: element.options.inline ? 'inline-blokc' : 'block'}"
        >{{ element.options.showLabel ? item.label : item.value }}</a-checkbox>
      </a-checkbox-group>
    </template>

    <template v-if="element.type === 'time'">
      <a-time-picker
        :value="element.options.defaultValue"
        :placeholder="element.options.placeholder"
        :inputReadOnly="element.options.readonly"
        :disabled="element.options.disabled"
        :style="{width: element.options.width}"
      />
    </template>

    <template v-if="element.type === 'date'">
      <a-date-picker
        :value="element.options.defaultValue"
        :placeholder="element.options.placeholder"
        :inputReadOnly="element.options.readonly"
        :disabled="element.options.disabled"
        :style="{width: element.options.width}"
      />
    </template>

    <template v-if="element.type === 'rate'">
      <a-rate
        :value="element.options.defaultValue"
        :count="element.options.max"
        :disabled="element.options.disabled"
        :allowHalf="element.options.allowHalf"
      />
    </template>

    <template v-if="element.type === 'select'">
      <a-select
        :value="element.options.defaultValue"
        :disabled="element.options.disabled"
        :allowClear="element.options.clearable"
        :placeholder="element.options.placeholder"
        :style="{width: element.options.width}"
      >
        <a-select-option
          v-for="item of element.options.options"
          :key="item.value"
          :value="item.value"
        >
          {{ element.options.showLabel ? item.label : item.value }}
        </a-select-option>
      </a-select>
    </template>

    <template v-if="element.type === 'switch'">
      <a-switch
        :checked="element.options.defaultValue"
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
        :disabled="element.options.disabled"
        :style="{width: element.options.width}"
      />
    </template>

    <template v-if="element.type == 'text'">
      <span>{{element.options.defaultValue}}</span>
    </template>
  </a-form-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AntdWidgetFormItem',
  props: {
    element: {
      type: Object
    },
    selectWidget: {
      type: Object
    }
  },
  setup() {
    return {}
  }
})
</script>
