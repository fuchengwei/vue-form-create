<template>
  <a-form
    v-if="data"
    layout="vertical"
  >
    <a-form-item label="字段标识">
      <a-input
        v-if="data.type !== 'grid'"
        v-model:value="data.model"
      />
    </a-form-item>

    <a-form-item label="标题">
      <a-input
        v-if="data.type !== 'grid'"
        v-model:value="data.label"
      />
    </a-form-item>

    <a-form-item
      label="宽度"
      v-if="hasKey('width')"
    >
      <a-input v-model:value="data.options.width" />
    </a-form-item>

    <a-form-item
      label="占位内容"
      v-if="hasKey('placeholder')"
    >
      <a-input v-model:value="data.options.placeholder" />
    </a-form-item>

    <a-form-item
      label="默认内容"
      v-if="hasKey('defaultValue')"
    >
      <a-input v-model:value="data.options.defaultValue" />
    </a-form-item>

    <a-form-item
      label="最大长度"
      v-if="hasKey('maxlength')"
    >
      <a-input v-model:value.number="data.options.maxlength" />
    </a-form-item>

    <a-form-item
      label="前缀"
      v-if="hasKey('prefix')"
    >
      <a-input v-model:value.number="data.options.prefix" />
    </a-form-item>

    <a-form-item
      label="后缀"
      v-if="hasKey('suffix')"
    >
      <a-input v-model:value.number="data.options.suffix" />
    </a-form-item>

    <a-form-item
      label="前置标签"
      v-if="hasKey('addonBefore')"
    >
      <a-input v-model:value.number="data.options.addonBefore" />
    </a-form-item>

    <a-form-item
      label="后置标签"
      v-if="hasKey('addonAfter')"
    >
      <a-input v-model:value.number="data.options.addonAfter" />
    </a-form-item>

    <a-form-item
      label="是否显示切换按钮"
      v-if="hasKey('visibilityToggle')"
    >
      <a-switch
        checked-children="显示"
        un-checked-children="隐藏"
        v-model:checked="data.options.visibilityToggle"
      />
    </a-form-item>

    <a-form-item
      label="是否显示字数"
      v-if="hasKey('showCount')"
    >
      <a-switch
        checked-children="显示"
        un-checked-children="隐藏"
        v-model:checked="data.options.showCount"
      />
    </a-form-item>

    <a-form-item
      label="是否自适应内容高度"
      v-if="hasKey('autosize')"
    >
      <a-switch
        checked-children="是"
        un-checked-children="否"
        v-model:checked="data.options.autosize"
      />
    </a-form-item>

    <a-form-item
      label="行数"
      v-if="hasKey('rows') && !data.options.autosize"
    >
      <a-input-number
        v-model:value="data.options.rows"
        :min="0"
      />
    </a-form-item>

    <template v-if="data.type !== 'grid'">
      <a-form-item label="操作属性">
        <a-checkbox
          v-if="hasKey('rules')"
          v-model:checked="data.options.rules.required"
        >必填</a-checkbox>
        <a-checkbox
          v-if="hasKey('readonly')"
          v-model:checked="data.options.readonly"
        >只读</a-checkbox>
        <a-checkbox
          v-if="hasKey('disabled')"
          v-model:checked="data.options.disabled"
        >禁用</a-checkbox>
        <a-checkbox
          v-if="hasKey('allowClear')"
          v-model:checked="data.options.allowClear"
        >清除</a-checkbox>
      </a-form-item>

      <template v-if="hasKey('rules')">
        <h4>验证规则</h4>

        <a-form-item label="触发时机">
          <a-radio-group
            v-model:value="data.options.rules.trigger"
            button-style="solid"
          >
            <a-radio-button value="blur">Blur</a-radio-button>
            <a-radio-button value="change">Change</a-radio-button>
            <a-radio-button :value="['blur', 'change']">All</a-radio-button>
          </a-radio-group>
        </a-form-item>

        <a-form-item label="枚举类型">
          <a-input v-model:value="data.options.rules.enum" />
        </a-form-item>

        <a-form-item label="字段长度">
          <a-input v-model:value.number="data.options.rules.len" />
        </a-form-item>

        <a-form-item label="最大长度">
          <a-input v-model:value.number="data.options.rules.max" />
        </a-form-item>

        <a-form-item label="校验文案">
          <a-input v-model:value="data.options.rules.message" />
        </a-form-item>

        <a-form-item label="最小长度">
          <a-input v-model:value.number="data.options.rules.min" />
        </a-form-item>

        <a-form-item label="正则表达式">
          <a-input v-model:value="data.options.rules.pattern" />
        </a-form-item>

        <a-form-item label="校验类型">
          <a-select v-model:value="data.options.rules.type">
            <a-select-option value="string">字符串</a-select-option>
            <a-select-option value="number">数字</a-select-option>
            <a-select-option value="boolean">布尔值</a-select-option>
            <a-select-option value="method">方法</a-select-option>
            <a-select-option value="regexp">正则表达式</a-select-option>
            <a-select-option value="integer">整数</a-select-option>
            <a-select-option value="float">浮点数</a-select-option>
            <a-select-option value="array">数组</a-select-option>
            <a-select-option value="object">对象</a-select-option>
            <a-select-option value="enum">枚举</a-select-option>
            <a-select-option value="date">日期</a-select-option>
            <a-select-option value="url">URL地址</a-select-option>
            <a-select-option value="hex">十六进制</a-select-option>
            <a-select-option value="email">邮箱地址</a-select-option>
            <a-select-option value="any">任意类型</a-select-option>
          </a-select>
        </a-form-item>
      </template>

    </template>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'AntdWidgetConfig',
  props: {
    select: {
      type: Object
    }
  },
  emits: ['update:select'],
  setup(props, context) {
    const data = ref(props.select)

    watch(
      () => props.select,
      (val) => (data.value = val)
    )

    watch(data, (val) => context.emit('update:select', val))

    const hasKey = (key: string) =>
      Object.keys(data.value.options).includes(key)

    return {
      data,
      hasKey
    }
  }
})
</script>
