<template>
  <el-form label-position="top" v-if="data" :key="data.key">
    <el-form-item label="字段标识" v-if="data.type !== 'grid'">
      <el-input v-model="data.model" />
    </el-form-item>

    <el-form-item label="标题" v-if="data.type !== 'grid'">
      <el-input v-model="data.label" />
    </el-form-item>

    <el-form-item label="宽度" v-if="hasKey('width')">
      <el-input v-model="data.options.width" />
    </el-form-item>

    <el-form-item label="占位内容" v-if="hasKey('placeholder')">
      <el-input v-model="data.options.placeholder" />
    </el-form-item>

    <el-form-item
      label="默认内容"
      v-if="
        hasKey('defaultValue') &&
        (data.type === 'input' ||
          data.type === 'password' ||
          data.type === 'textarea' ||
          data.type === 'text' ||
          data.type === 'rate' ||
          data.type === 'switch' ||
          data.type === 'slider')
      "
    >
      <el-input
        v-if="
          data.type === 'input' ||
          data.type === 'password' ||
          data.type === 'text'
        "
        v-model="data.options.defaultValue"
      />
      <el-input
        type="textarea"
        v-if="data.type === 'textarea'"
        v-model="data.options.defaultValue"
      />
      <el-rate
        v-if="data.type === 'rate'"
        v-model="data.options.defaultValue"
        :max="data.options.max"
        :allowHalf="data.options.allowHalf"
      />
      <el-switch
        v-if="data.type === 'switch'"
        v-model="data.options.defaultValue"
      />
      <template v-if="data.type === 'slider'">
        <el-input-number
          v-if="!data.options.range"
          v-model.number="data.options.defaultValue"
        />
        <template v-if="data.options.range">
          <el-input-number
            v-model.number="data.options.defaultValue[0]"
            :max="data.options.max"
          />
          <el-input-number
            v-model.number="data.options.defaultValue[1]"
            :max="data.options.max"
          />
        </template>
      </template>
    </el-form-item>

    <el-form-item label="最大长度" v-if="hasKey('maxlength')">
      <el-input v-model.number="data.options.maxlength" />
    </el-form-item>

    <el-form-item label="最大值" v-if="hasKey('max')">
      <el-input-number v-model.number="data.options.max" />
    </el-form-item>

    <el-form-item label="最小值" v-if="hasKey('min')">
      <el-input-number v-model.number="data.options.min" />
    </el-form-item>

    <el-form-item label="步长" v-if="hasKey('step')">
      <el-input-number v-model.number="data.options.step" :min="0" />
    </el-form-item>

    <el-form-item label="前缀" v-if="hasKey('prefix')">
      <el-input v-model="data.options.prefix" />
    </el-form-item>

    <el-form-item label="后缀" v-if="hasKey('suffix')">
      <el-input v-model="data.options.suffix" />
    </el-form-item>

    <el-form-item label="前置标签" v-if="hasKey('prepend')">
      <el-input v-model="data.options.prepend" />
    </el-form-item>

    <el-form-item label="后置标签" v-if="hasKey('append')">
      <el-input v-model="data.options.append" />
    </el-form-item>

    <el-form-item label="选中时的内容" v-if="hasKey('activeText')">
      <el-input v-model="data.options.activeText" />
    </el-form-item>

    <el-form-item label="非选中时的内容" v-if="hasKey('inactiveText')">
      <el-input v-model="data.options.inactiveText" />
    </el-form-item>

    <el-form-item label="文本框可输入" v-if="hasKey('editable')">
      <el-switch v-model="data.options.editable" />
    </el-form-item>

    <el-form-item label="范围选择" v-if="hasKey('range')">
      <el-switch
        v-model="data.options.range"
        @change="handleSliderModeChange"
      />
    </el-form-item>

    <el-form-item label="是否显示切换按钮" v-if="hasKey('showPassword')">
      <el-switch v-model="data.options.showPassword" />
    </el-form-item>

    <el-form-item label="是否显示字数" v-if="hasKey('showWordLimit')">
      <el-switch v-model="data.options.showWordLimit" />
    </el-form-item>

    <el-form-item label="是否自适应内容高度" v-if="hasKey('autosize')">
      <el-switch v-model="data.options.autosize" />
    </el-form-item>

    <el-form-item label="行数" v-if="hasKey('rows') && !data.options.autosize">
      <el-input-number v-model="data.options.rows" :min="0" />
    </el-form-item>

    <el-form-item label="是否允许半选" v-if="hasKey('allowHalf')">
      <el-switch v-model="data.options.allowHalf" />
    </el-form-item>

    <el-form-item label="布局方式" v-if="hasKey('inline')">
      <el-radio-group v-model="data.options.inline">
        <el-radio-button :label="true">行内</el-radio-button>
        <el-radio-button :label="false">块级</el-radio-button>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="是否多选" v-if="hasKey('multiple')">
      <el-switch
        v-model="data.options.multiple"
        @change="handleSelectModeChange"
      />
    </el-form-item>

    <el-form-item label="是否可搜索" v-if="hasKey('filterable')">
      <el-switch v-model="data.options.filterable" />
    </el-form-item>

    <el-form-item label="是否显示标签" v-if="hasKey('showLabel')">
      <el-switch v-model="data.options.showLabel" />
    </el-form-item>

    <el-form-item label="选项" v-if="hasKey('options')">
      <el-radio-group v-model="data.options.remote">
        <el-radio-button :label="false">静态数据</el-radio-button>
        <el-radio-button :label="true">远端数据</el-radio-button>
      </el-radio-group>
      <el-space
        v-if="data.options.remote"
        alignment="start"
        direction="vertical"
        style="margin-top: 10px"
      >
        <el-input v-model="data.options.remoteFunc">
          <template #prepend> 远端方法 </template>
        </el-input>
        <el-input v-model="data.options.props.label">
          <template #prepend> 标签 </template>
        </el-input>
        <el-input v-model="data.options.props.value">
          <template #prepend> 值 </template>
        </el-input>
      </el-space>
      <template v-else>
        <template
          v-if="
            data.type === 'radio' ||
            (data.type === 'select' && !data.options.multiple)
          "
        >
          <el-radio-group
            v-model="data.options.defaultValue"
            style="margin-top: 8px"
          >
            <Draggable
              tag="ul"
              item-key="index"
              ghostClass="ghost"
              handle=".drag-item"
              :group="{ name: 'options' }"
              :list="data.options.options"
            >
              <template #item="{ element, index }">
                <div
                  style="display: flex; align-items: center; margin-bottom: 5px"
                >
                  <el-radio
                    :label="element.value"
                    style="margin-right: 0px; margin-bottom: 0"
                  >
                    <el-input
                      :style="{
                        width: data.options.showLabel ? '90px' : '180px'
                      }"
                      v-model="element.value"
                    />
                    <el-input
                      v-if="data.options.showLabel"
                      :style="{
                        width: '90px'
                      }"
                      v-model="element.label"
                    />
                  </el-radio>
                  <SvgIcon
                    style="margin: 0 5px; cursor: move"
                    iconClass="item"
                    className="drag-item"
                  />
                  <el-button
                    type="primary"
                    circle
                    @click="handleOptionsRemove(index)"
                  >
                    <SvgIcon iconClass="delete" />
                  </el-button>
                </div>
              </template>
            </Draggable>
          </el-radio-group>
        </template>

        <template
          v-if="
            data.type === 'checkbox' ||
            (data.type === 'select' && data.options.multiple)
          "
        >
          <el-checkbox-group
            v-model="data.options.defaultValue"
            style="margin-top: 8px"
          >
            <Draggable
              tag="ul"
              item-key="index"
              ghostClass="ghost"
              handle=".drag-item"
              :group="{ name: 'options' }"
              :list="data.options.options"
            >
              <template #item="{ element, index }">
                <li
                  style="display: flex; align-items: center; margin-bottom: 5px"
                >
                  <el-checkbox
                    :label="element.value"
                    style="margin-right: 0px; margin-bottom: 0"
                  >
                    <el-input
                      :style="{
                        width: data.options.showLabel ? '90px' : '180px'
                      }"
                      v-model="element.value"
                    />
                    <el-input
                      v-if="data.options.showLabel"
                      v-model="element.label"
                      :style="{ width: '90px' }"
                    />
                  </el-checkbox>
                  <SvgIcon
                    style="margin: 0 5px; cursor: move"
                    iconClass="item"
                    className="drag-item"
                  />
                  <el-button
                    type="primary"
                    circle
                    @click="handleOptionsRemove(index)"
                  >
                    <SvgIcon iconClass="delete" />
                  </el-button>
                </li>
              </template>
            </Draggable>
          </el-checkbox-group>
        </template>

        <div style="margin-top: 5px">
          <el-button type="text" @click="handleInsertOption"
            >添加选项</el-button
          >
        </div>
      </template>
    </el-form-item>

    <template v-if="data.type === 'time'">
      <el-form-item label="默认值">
        <el-time-picker
          style="width: 100%"
          v-model="data.options.defaultValue"
          :format="data.options.format"
          :placeholder="data.options.placeholder"
        />
      </el-form-item>
    </template>

    <template v-if="data.type === 'date'">
      <el-form-item label="默认值">
        <el-date-picker
          style="width: 100%"
          v-model="data.options.defaultValue"
          :format="data.options.format"
          :placeholder="data.options.placeholder"
        />
      </el-form-item>
    </template>

    <template v-if="data.type === 'time' || data.type === 'date'">
      <el-form-item label="格式">
        <el-input v-model="data.options.format" />
      </el-form-item>
    </template>

    <template v-if="data.type === 'img-upload'">
      <el-form-item label="模式">
        <el-radio-group v-model="data.options.listType">
          <el-radio-button label="text">text</el-radio-button>
          <el-radio-button label="picture">picture</el-radio-button>
          <el-radio-button label="picture-card">picture-card</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="文件参数名">
        <el-input v-model="data.options.name" />
      </el-form-item>

      <el-form-item label="上传地址">
        <el-input v-model="data.options.action" />
      </el-form-item>

      <el-form-item label="接受上传的文件类型(多个使用 , 隔开)">
        <el-input v-model="data.options.accept" />
      </el-form-item>

      <el-form-item label="最大上传数量">
        <el-input-number v-model.number="data.options.limit" :min="1" />
      </el-form-item>

      <el-form-item label="上传请求方法">
        <el-radio-group v-model="data.options.method">
          <el-radio-button label="post">POST</el-radio-button>
          <el-radio-button label="put">PUT</el-radio-button>
          <el-radio-button label="get">GET</el-radio-button>
          <el-radio-button label="delete">DELETE</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </template>

    <el-form-item label="远端数据" v-if="data.type === 'cascader'">
      <el-space direction="vertical" alignment="start">
        <el-input v-model="data.options.remoteFunc">
          <template #prepend> 远端方法 </template>
        </el-input>
        <el-input v-model="data.options.props.label">
          <template #prepend> 标签 </template>
        </el-input>
        <el-input v-model="data.options.props.value">
          <template #prepend> 值 </template>
        </el-input>
        <el-input v-model="data.options.props.children">
          <template #prepend> 子选项 </template>
        </el-input>
      </el-space>
    </el-form-item>

    <template v-if="data.type === 'grid'">
      <el-form-item label="栅格间隔">
        <el-input-number v-model.number="data.options.gutter" :min="0" />
      </el-form-item>

      <el-form-item label="列配置项">
        <Draggable
          tag="ul"
          item-key="index"
          ghostClass="ghost"
          handle=".drag-item"
          :group="{ name: 'options' }"
          :list="data.columns"
        >
          <template #item="{ element, index }">
            <li style="margin-bottom: 5px">
              <SvgIcon iconClass="item" className="drag-item" />
              <el-input-number
                placeholder="栅格值"
                v-model.number="element.span"
                :min="0"
                :max="24"
              />
              <el-button
                type="primary"
                circle
                style="margin-left: 5px"
                @click="handleOptionsRemove(index)"
              >
                <SvgIcon iconClass="delete" />
              </el-button>
            </li>
          </template>
        </Draggable>

        <div>
          <el-button type="text" @click="handleInsertColumn">
            添加列
          </el-button>
        </div>
      </el-form-item>

      <el-form-item label="垂直对齐方式">
        <el-radio-group v-model="data.options.align">
          <el-radio-button label="top">顶部对齐</el-radio-button>
          <el-radio-button label="middle">居中对齐</el-radio-button>
          <el-radio-button label="bottom">底部对齐</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="水平排列方式">
        <el-select v-model="data.options.justify">
          <el-option value="start" label="左对齐" />
          <el-option value="end" label="右对齐" />
          <el-option value="center" label="居中" />
          <el-option value="space-around" label="两侧间隔相等" />
          <el-option value="space-between" label="两端对齐" />
        </el-select>
      </el-form-item>
    </template>

    <template v-if="data.type !== 'grid'">
      <el-form-item
        label="操作属性"
        v-if="
          hasKey('rules') ||
          hasKey('readonly') ||
          hasKey('disabled') ||
          hasKey('allowClear')
        "
      >
        <el-checkbox
          v-if="hasKey('rules')"
          v-model="data.options.rules.required"
          >必填</el-checkbox
        >
        <el-checkbox v-if="hasKey('readonly')" v-model="data.options.readonly"
          >只读</el-checkbox
        >
        <el-checkbox v-if="hasKey('disabled')" v-model="data.options.disabled"
          >禁用</el-checkbox
        >
        <el-checkbox v-if="hasKey('clearable')" v-model="data.options.clearable"
          >清除</el-checkbox
        >
      </el-form-item>

      <template v-if="hasKey('rules')">
        <h4>验证规则</h4>

        <el-form-item label="触发时机">
          <el-radio-group v-model="data.options.rules.trigger">
            <el-radio-button label="blur">Blur</el-radio-button>
            <el-radio-button label="change">Change</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="枚举类型">
          <el-input v-model="data.options.rules.enum" />
        </el-form-item>

        <el-form-item label="字段长度">
          <el-input v-model.number="data.options.rules.len" />
        </el-form-item>

        <el-form-item label="最大长度">
          <el-input v-model.number="data.options.rules.max" />
        </el-form-item>

        <el-form-item label="最小长度">
          <el-input v-model.number="data.options.rules.min" />
        </el-form-item>

        <el-form-item label="校验文案">
          <el-input v-model="data.options.rules.message" />
        </el-form-item>

        <el-form-item label="正则表达式">
          <el-input v-model="data.options.rules.pattern" />
        </el-form-item>

        <el-form-item label="校验类型">
          <el-select v-model="data.options.rules.type">
            <el-option value="string">字符串</el-option>
            <el-option value="number">数字</el-option>
            <el-option value="boolean">布尔值</el-option>
            <el-option value="method">方法</el-option>
            <el-option value="regexp">正则表达式</el-option>
            <el-option value="integer">整数</el-option>
            <el-option value="float">浮点数</el-option>
            <el-option value="array">数组</el-option>
            <el-option value="object">对象</el-option>
            <el-option value="enum">枚举</el-option>
            <el-option value="date">日期</el-option>
            <el-option value="url">URL地址</el-option>
            <el-option value="hex">十六进制</el-option>
            <el-option value="email">邮箱地址</el-option>
            <el-option value="any">任意类型</el-option>
          </el-select>
        </el-form-item>
      </template>
    </template>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import Draggable from 'vuedraggable'
import SvgIcon from '@/components/SvgIcon.vue'

export default defineComponent({
  name: 'ElWidgetConfig',
  components: {
    Draggable,
    SvgIcon
  },
  props: {
    select: {
      type: Object
    }
  },
  emits: ['update:select'],
  setup(props, context) {
    const data = ref<any>(props.select)

    watch(
      () => props.select,
      (val) => (data.value = val)
    )

    watch(data, (val) => context.emit('update:select', val), { deep: true })

    const hasKey = (key: string) =>
      Object.keys(data.value.options).includes(key)

    const handleInsertColumn = () => {
      data.value.columns.push({
        span: 0,
        list: []
      })
    }

    const handleInsertOption = () => {
      const index = data.value.options.options.length + 1
      data.value.options.options.push({
        label: `Option ${index}`,
        value: `Option ${index}`
      })
    }

    const handleOptionsRemove = (index: number) => {
      if (data.value.type === 'grid') {
        data.value.columns.splice(index, 1)
      } else {
        data.value.options.options.splice(index, 1)
      }
    }

    const handleSliderModeChange = (checked: boolean) => {
      checked
        ? (data.value.options.defaultValue = [10, 90])
        : (data.value.options.defaultValue = 0)
    }

    const handleSelectModeChange = (val: boolean) => {
      if (data.value.type === 'img-upload') {
        return
      }
      if (val) {
        if (data.value.options.defaultValue) {
          if (!(data.value.options.defaultValue instanceof Array)) {
            data.value.options.defaultValue = [data.value.options.defaultValue]
          }
        } else {
          data.value.options.defaultValue = []
        }
      } else {
        data.value.options.defaultValue.length
          ? (data.value.options.defaultValue =
              data.value.options.defaultValue[0])
          : (data.value.options.defaultValue = null)
      }
    }

    return {
      data,
      hasKey,
      handleInsertColumn,
      handleInsertOption,
      handleOptionsRemove,
      handleSliderModeChange,
      handleSelectModeChange
    }
  }
})
</script>
