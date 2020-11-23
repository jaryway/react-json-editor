export default {
  type: 'object',
  required: ['id', 'key'], // 必填的字段
  hidden: ['id'], // 隐藏的字段

  properties: {
    id: { type: 'string', title: 'ID' },
    key: { type: 'string', title: '字段标识(KEY)' },
    name: { type: 'string', title: '标题' },

    hidden: { type: 'boolean', title: '是否隐藏' }, //
    disabled: { type: 'boolean', title: '是否禁用' }, //
    required: { type: 'boolean', title: '是否填项' }, // 对应的 message 必填项
    // pattern: { type: 'string', title: undefined }, // 对应的 message 格式错误
    // maxLength: { type: 'number', title: '最大长度' }, // 最大长度
    // minLength: { type: 'number', title: '最小长度' }, // 最小长度

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

    remote: { type: 'boolean', title: '使用接口数据', format: 'checkbox' },

    options: {
      type: 'array',
      uniqueItems: true,
      uniqueItemFields: ['value'], // value 值必须唯一
      title: 'Pets',
      options: { dependencies: { remote: false } },
      items: {
        type: 'object',
        title: 'Pet',
        properties: {
          value: { type: 'string', title: '值' },
          label: { type: 'string', title: '标签' },
          checked: { type: 'boolean', format: 'select', title: '选中' },
          // user: {
          //   type: 'array',
          //   format: 'table',
          //   title: 'Pets',
          //   uniqueItems: true,
          //   items: {
          //     type: 'object',
          //     title: '选项',
          //     properties: {
          //       value: {
          //         type: 'string',
          //         // enum: ['cat', 'dog', 'bird', 'reptile', 'other'],
          //         default: 'dog',
          //       },
          //       label: {
          //         type: 'string',
          //       },
          //       checked: {
          //         type: 'boolean',
          //       },
          //     },
          //   },
          // },
        },
      },
    },

    showOptionLabel: {},
  },

  /**
   * id: 'd1f4c244e48bb',
    icon: 'icon-radio-active',
    type: 'Radio',
    name: '安全告知：',
    key: 'inform',
    layout: 'horizontal',
    hidden: false,
    disabled: false,
    required: true,
    showLabel: true,
    showOptionLabel: false,
    remote: false,
    remoteUrl: '',
    props: { label: 'label', value: 'value' },
    options: [
      {
        value: '已对相关人员进行《相关方人员安全告知协议》教育',
        checked: true,
        key: '3da845e29b854',
      },
    ],
   */
};
