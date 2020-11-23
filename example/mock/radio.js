export default {
  type: 'object',
  required: ['id', 'key'], // 必填的字段
  hidden: ['id'], // 隐藏的字段

  properties: {
    id: { type: 'string', title: 'ID' },
    key: { type: 'string', title: '字段标识(KEY)' },
    name: { type: 'string', title: '标题' },
    type: {
      type: 'string',
      title: '布局',
      default: 'radio',
      format: 'hidden',

      enum: ['radio'],
      options: {
        mode: 'button',
        enum_titles: ['文本', '多行文本'],
      },
    },
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
