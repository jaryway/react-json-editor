export default {
  type: 'object',
  required: ['id', 'key'], // 必填的字段
  hidden: ['id'], // 隐藏的字段

  properties: {
    id: { type: 'string', title: 'ID', default: '1', format: 'hidden' },
    key: { type: 'string', title: '字段标识(KEY)' },
    name: { type: 'string', title: '标题' },
    type: {
      type: 'string',
      title: '类型',
      default: 'text',
      format: 'select',

      enum: ['text', 'textarea'],
      options: {
        mode: 'button',
        enum_titles: ['文本', '多行文本'],
      },
    },
    autoSize: {
      type: 'boolean',
      title: '高度自增',
      format: 'checkbox',
      options: {
        dependencies: {
          type: 'textarea',
          id: '1',
        },
      },
    },

    showLabel: { type: 'boolean', title: '显示控件标题', format: 'checkbox' }, //
    hidden: { type: 'boolean', title: '是否隐藏' }, //
    disabled: { type: 'boolean', title: '是否禁用' }, //
    required: { type: 'boolean', title: '是否填项' }, // 对应的 message 必填项
    pattern: { type: 'string', title: undefined }, // 对应的 message 格式错误
    maxLength: { type: 'number', title: '最大长度' }, // 最大长度
    minLength: { type: 'number', title: '最小长度' }, // 最小长度

    defaultValue: { type: 'string', title: '默认值' },
    placeholder: { type: 'string', title: '输入提示', default: '请输入' },
    layout: {
      type: 'string',
      format: 'select',
      title: '布局',
      enum: ['horizontal', 'vertival'],
      options: {
        mode: 'button',
        enum_titles: ['横向', '垂直'],
      },
    },
  },
};
