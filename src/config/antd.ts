const rules = {
  trigger: 'blur',
  enum: '',
  len: null,
  max: null,
  message: '',
  mix: null,
  pattern: '',
  required: false,
  type: 'string'
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
      required: false,
      rules: {
        trigger: 'blur',
        enum: '',
        len: null,
        max: null,
        message: '',
        mix: null,
        pattern: '',
        required: false,
        type: 'string'
      }
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
      required: false,
      rules: {
        trigger: 'blur',
        enum: '',
        len: null,
        max: null,
        message: '',
        mix: null,
        pattern: '',
        required: false,
        type: 'string'
      }
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
      showCount: false,
      disabled: false,
      allowClear: false,
      required: false,
      rules
    }
  },
  {
    label: '计数器',
    type: 'number',
    options: {
      width: '',
      required: false,
      defaultValue: 0,
      min: '',
      max: '',
      step: 1,
      disabled: false,
      controlsPosition: ''
    }
  },
  {
    label: '单选框组',
    type: 'radio',
    options: {
      inline: false,
      defaultValue: '',
      showLabel: false,
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
      required: false,
      width: '',
      remote: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: '',
      disabled: false
    }
  },
  {
    label: '多选框组',
    type: 'checkbox',
    options: {
      inline: false,
      defaultValue: [],
      showLabel: false,
      options: [
        {
          value: 'Option 1'
        },
        {
          value: 'Option 2'
        },
        {
          value: 'Option 3'
        }
      ],
      required: false,
      width: '',
      remote: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: '',
      disabled: false
    }
  },
  {
    label: '时间选择器',
    type: 'time',
    options: {
      defaultValue: '21:19:56',
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: '',
      startPlaceholder: '',
      endPlaceholder: '',
      isRange: false,
      arrowControl: true,
      format: 'HH:mm:ss',
      required: false,
      width: ''
    }
  },
  {
    label: '日期选择器',
    type: 'date',
    options: {
      defaultValue: '',
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: '',
      startPlaceholder: '',
      endPlaceholder: '',
      type: 'date',
      format: 'yyyy-MM-dd',
      timestamp: false,
      required: false,
      width: ''
    }
  },
  {
    label: '评分',
    type: 'rate',
    options: {
      defaultValue: null,
      max: 5,
      disabled: false,
      allowHalf: false,
      required: false
    }
  },
  {
    label: '颜色选择器',
    type: 'color',
    options: {
      defaultValue: '',
      disabled: false,
      showAlpha: false,
      required: false
    }
  },
  {
    label: '下拉选择框',
    type: 'select',
    options: {
      defaultValue: '',
      multiple: false,
      disabled: false,
      clearable: false,
      placeholder: '',
      required: false,
      showLabel: false,
      width: '',
      options: [
        {
          value: 'Option 1'
        },
        {
          value: 'Option 2'
        },
        {
          value: 'Option 3'
        }
      ],
      remote: false,
      filterable: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: ''
    }
  },
  {
    label: '开关',
    type: 'switch',
    options: {
      defaultValue: false,
      required: false,
      disabled: false
    }
  },
  {
    label: '滑块',
    type: 'slider',
    options: {
      defaultValue: 0,
      disabled: false,
      required: false,
      min: 0,
      max: 100,
      step: 1,
      showInput: false,
      range: false,
      width: ''
    }
  },
  {
    label: '文字',
    type: 'text',
    options: {
      defaultValue: 'This is a text',
      customClass: ''
    }
  }
]

export const advanceComponents = [
  {
    label: '自定义区域',
    type: 'blank',
    options: {
      defaultType: 'String'
    }
  },
  {
    label: '图片',
    type: 'img-upload',
    options: {
      defaultValue: [],
      size: {
        width: 100,
        height: 100
      },
      width: '',
      disabled: false,
      length: 8,
      multiple: false,
      isDelete: false,
      min: 0,
      isEdit: false,
      action: 'https://jsonplaceholder.typicode.com/photos/'
    }
  },
  {
    label: '编辑器',
    type: 'editor',
    options: {
      defaultValue: '',
      width: ''
    }
  },
  {
    label: '级联选择器',
    type: 'cascader',
    options: {
      defaultValue: [],
      width: '',
      placeholder: '',
      disabled: false,
      clearable: false,
      remote: true,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label',
        children: 'children'
      },
      remoteFunc: ''
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
