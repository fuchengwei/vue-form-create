const rules = {
  trigger: 'blur',
  enum: '',
  len: null,
  max: null,
  message: '',
  min: null,
  pattern: '',
  required: false,
  type: 'string'
}

export const widgetForm = {
  list: [],
  config: {
    size: 'default',
    hideRequiredMark: false,
    layout: 'horizontal',
    labelAlign: 'right',
    labelCol: {
      span: 3,
      offset: 0
    }
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
      addonBefore: '',
      addonAfter: '',
      disabled: false,
      allowClear: false,
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
      addonBefore: '',
      addonAfter: '',
      visibilityToggle: true,
      disabled: false,
      allowClear: false,
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
      autoSize: false,
      showCount: false,
      disabled: false,
      allowClear: false,
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
      readonly: false,
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
      remoteFunc: '',
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
      remoteFunc: '',
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
      readonly: false,
      allowClear: true,
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
      format: 'HH:mm:ss',
      readonly: false,
      allowClear: true,
      disabled: false,
      rules
    }
  },
  {
    label: '评分',
    type: 'rate',
    options: {
      defaultValue: null,
      max: 5,
      allowClear: true,
      allowHalf: false,
      disabled: false,
      rules
    }
  },
  {
    label: '下拉选择框',
    type: 'select',
    options: {
      defaultValue: null,
      width: '200px',
      mode: null,
      placeholder: '',
      remote: false,
      showLabel: false,
      showSearch: false,
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
      remoteFunc: '',
      rules
    }
  },
  {
    label: '开关',
    type: 'switch',
    options: {
      defaultValue: false,
      disabled: false,
      checkedChildren: '',
      unCheckedChildren: '',
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
      reverse: false,
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
      maxCount: 3,
      multiple: false,
      disabled: false,
      rules
    }
  },
  {
    label: '编辑器',
    type: 'editor',
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
      allowClear: false,
      remote: true,
      remoteOptions: [],
      props: {
        label: 'label',
        value: 'value',
        children: 'children'
      },
      remoteFunc: '',
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
