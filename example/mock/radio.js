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
      format: 'select',

      enum: ['radio'],
      options: {
        mode: 'button',
        enum_titles: ['文本', '多行文本'],
      },
    },

    // showLabel: { type: 'boolean', title: '显示控件标题' }, //
    // hidden: { type: 'boolean', title: '是否隐藏' }, //
    // disabled: { type: 'boolean', title: '是否禁用' }, //
    // required: { type: 'boolean', title: '是否填项' }, // 对应的 message 必填项
    // pattern: { type: 'string', title: undefined }, // 对应的 message 格式错误
    // maxLength: { type: 'number', title: '最大长度' }, // 最大长度
    // minLength: { type: 'number', title: '最小长度' }, // 最小长度
    // autoSize: {
    //   type: 'boolean',
    //   title: '高度自增',
    //   format: 'select',
    //   options: {
    //     dependencies: {
    //       type: 'textarea',
    //     },
    //   },
    // },

    // defaultValue: { type: 'string', title: '默认值' },
    // placeholder: { type: 'string', title: '输入提示', default: '请输入' },
    // layout: {
    //   type: 'string',
    //   format: 'select',
    //   title: '布局',
    //   enum: ['horizontal', 'vertival'],
    //   options: {
    //     mode: 'button',
    //     enum_titles: ['横向', '垂直'],
    //   },
    // },

    // id: newId(),
    // // icon: 'icon-radio-active',
    // type: 'Radio',
    // name: '单选框组',
    // key: `input-${newId()}`, // 字段 key，对应 form 中的控件的 name
    // layout: 'horizontal', // 'horizontal'|'vertical'|'inline',
    // hidden: false, // 是否隐藏
    // disabled: false, // 是否禁用
    // required: false,
    // showLabel: true, // 是否显示 title
    // showOptionLabel: false, // 是否显示 option 的 label
    // remote: false,
    // remoteUrl: '',
    // props: { label: 'label', value: 'value' },
    // options: [
    //   { value: '选项1', label: '选项1', checked: true },
    //   { value: '选项2', label: '选项2' },
    //   { value: '选项3', label: '选项3' },
    // ],
  },
};
