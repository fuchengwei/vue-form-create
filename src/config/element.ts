import { makeComponentMap } from '@/utils/makemap'

export interface Rules {
  trigger: string
  enum: string
  len?: number
  max?: number
  message: string
  min?: number
  pattern: string
  required: boolean
  type: string
}

export interface WidgetForm {
  list: any[]
  config: {
    size: string
    hideRequiredAsterisk: boolean
    labelWidth: number
    labelPosition: string
  }
}

const rules: Rules = {
  trigger: 'blur',
  enum: '',
  len: undefined,
  max: undefined,
  message: '',
  min: undefined,
  pattern: '',
  required: false,
  type: 'any'
}

export const widgetForm: WidgetForm = {
  list: [],
  config: {
    size: 'small',
    hideRequiredAsterisk: false,
    labelWidth: 100,
    labelPosition: 'right'
  }
}

export const basicComponents = [
  {
    label: '单行文本',
    type: 'input',
    options: {
      width: '100%',
      defaultValue: '',
      placeholder: '',
      maxlength: null,
      prefix: '',
      suffix: '',
      prepend: '',
      append: '',
      disabled: false,
      clearable: false,
      readonly: false,
      rules
    }
  },
  {
    label: '密码框',
    type: 'password',
    options: {
      width: '100%',
      defaultValue: '',
      placeholder: '',
      maxlength: null,
      prefix: '',
      suffix: '',
      prepend: '',
      append: '',
      showPassword: true,
      disabled: false,
      clearable: false,
      readonly: false,
      rules
    }
  },
  {
    label: '多行文本',
    type: 'textarea',
    options: {
      width: '100%',
      defaultValue: '',
      placeholder: '',
      maxlength: null,
      rows: 4,
      autosize: false,
      showWordLimit: false,
      disabled: false,
      clearable: false,
      readonly: false,
      rules
    }
  },
  {
    label: '计数器',
    type: 'number',
    options: {
      width: '',
      defaultValue: 0,
      min: 0,
      max: 100,
      step: 1,
      disabled: false,
      rules
    }
  },
  {
    label: '单选框组',
    type: 'radio',
    options: {
      defaultValue: '',
      width: '',
      inline: true,
      remote: false,
      showLabel: false,
      remoteFunc:
        'https://raw.githubusercontent.com/fuchengwei/vue-form-create/master/mock/mock.json',
      options: [
        {
          value: 'Option 1',
          label: 'Option 1'
        },
        {
          value: 'Option 2',
          label: 'Option 2'
        },
        {
          value: 'Option 3',
          label: 'Option 3'
        }
      ],
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      disabled: false,
      rules
    }
  },
  {
    label: '多选框组',
    type: 'checkbox',
    options: {
      defaultValue: [],
      width: '',
      inline: true,
      remote: false,
      showLabel: false,
      remoteFunc:
        'https://raw.githubusercontent.com/fuchengwei/vue-form-create/master/mock/mock.json',
      options: [
        {
          label: 'Option 1',
          value: 'Option 1'
        },
        {
          label: 'Option 2',
          value: 'Option 2'
        },
        {
          label: 'Option 3',
          value: 'Option 3'
        }
      ],
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      disabled: false,
      rules
    }
  },
  {
    label: '时间选择器',
    type: 'time',
    options: {
      defaultValue: '',
      width: '',
      placeholder: '请选择时间',
      format: 'HH:mm:ss',
      valueFormat: 'HH:mm:ss',
      readonly: false,
      editable: true,
      clearable: true,
      disabled: false,
      rules
    }
  },
  {
    label: '日期选择器',
    type: 'date',
    options: {
      defaultValue: '',
      width: '',
      placeholder: '请选择时间',
      format: 'YYYY-MM-DD',
      readonly: false,
      editable: true,
      clearable: true,
      disabled: false,
      rules
    }
  },
  {
    label: '评分',
    type: 'rate',
    options: {
      defaultValue: 0,
      max: 5,
      allowHalf: false,
      disabled: false,
      rules
    }
  },
  {
    label: '下拉选择框',
    type: 'select',
    options: {
      defaultValue: '',
      width: '200px',
      multiple: false,
      placeholder: '',
      remote: false,
      showLabel: false,
      filterable: false,
      clearable: false,
      disabled: false,
      props: {
        label: 'label',
        value: 'value'
      },
      options: [
        {
          label: 'Option 1',
          value: 'Option 1'
        },
        {
          label: 'Option 2',
          value: 'Option 2'
        },
        {
          label: 'Option 3',
          value: 'Option 3'
        }
      ],
      remoteOptions: [],
      remoteFunc:
        'https://raw.githubusercontent.com/fuchengwei/vue-form-create/master/mock/mock.json',
      rules
    }
  },
  {
    label: '开关',
    type: 'switch',
    options: {
      defaultValue: false,
      disabled: false,
      activeText: '',
      inactiveText: '',
      rules
    }
  },
  {
    label: '滑块',
    type: 'slider',
    options: {
      defaultValue: 0,
      width: '',
      min: 0,
      max: 100,
      step: 1,
      disabled: false,
      range: false,
      rules
    }
  },
  {
    label: '文字',
    type: 'text',
    options: {
      defaultValue: 'This is a text'
    }
  }
]

export const advanceComponents = [
  {
    label: '图片',
    type: 'img-upload',
    options: {
      defaultValue: [],
      name: 'file',
      action: 'http://example.com/upload',
      method: 'post',
      listType: 'text',
      accept: 'image/*',
      limit: 3,
      multiple: false,
      disabled: false,
      rules
    }
  },
  {
    label: '富文本编辑器',
    type: 'richtext-editor',
    options: {
      defaultValue: '',
      width: '',
      disabled: false
    }
  },
  {
    label: '级联选择器',
    type: 'cascader',
    options: {
      defaultValue: [],
      width: '200px',
      placeholder: '',
      disabled: false,
      clearable: false,
      filterable: false,
      remote: true,
      remoteOptions: [],
      props: {
        label: 'label',
        value: 'value',
        children: 'children'
      },
      remoteFunc:
        'https://raw.githubusercontent.com/fuchengwei/vue-form-create/master/mock/mock.json',
      rules
    }
  }
]

export const layoutComponents = [
  {
    label: '栅格布局',
    type: 'grid',
    columns: [
      {
        span: 12,
        list: []
      },
      {
        span: 12,
        list: []
      }
    ],
    options: {
      gutter: 0,
      justify: 'start',
      align: 'top'
    }
  }
]

export const islayoutComponent = makeComponentMap(layoutComponents)
