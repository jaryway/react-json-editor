export default {
  Input: {
    showLabel: {
      type: 'boolean',
      default: true,
      format: 'checkbox',
    },
    defaultValue: {
      type: 'string',
      format: 'input',
    },
    placeholder: {
      type: 'string',
      format: 'input',
    },
    layout: {
      type: 'string',
      enum: ['horizontal', 'vertical'],
    },
    hidden: {
      type: 'boolean',
      default: false,
    },
    disabled: {
      type: 'boolean',
      default: false,
    },
    minLength: {
      type: 'integer',
      format: 'input',
    },
    maxLength: {
      type: 'integer',
      format: 'input',
    },
    required: {
      type: 'boolean',
      default: false,
    },
    // watch: {},
    // dependency: [{}],
  },
  TextArea: {
    showLabel: {
      type: 'boolean',
      default: true,
      format: 'checkbox',
    },
    defaultValue: {
      type: 'string',
      format: 'input',
    },
    placeholder: {
      type: 'string',
      format: 'input',
    },
    layout: {
      type: 'string',
      enum: ['horizontal', 'vertical'],
    },
    hidden: {
      type: 'boolean',
      default: false,
    },
    disabled: {
      type: 'boolean',
      default: false,
    },
    minLength: {
      type: 'integer',
      format: 'input',
    },
    maxLength: {
      type: 'integer',
      format: 'input',
    },
    required: {
      type: 'boolean',
      default: false,
    },
    autoSize: {
      type: 'boolean',
      default: true,
    },
  },
  Radio: {
    showLabel: {
      title: '显示标签',
      type: 'boolean',
      default: true,
      format: 'checkbox',
    },
    defaultValue: {
      type: 'string',
      format: 'input',
    },
    placeholder: {
      type: 'string',
      format: 'input',
    },
    layout: {
      type: 'string',
      enum: ['horizontal', 'vertical', 'inline'],
    },
    hidden: {
      type: 'boolean',
      default: false,
    },
    disabled: {
      type: 'boolean',
      default: false,
    },
    required: {
      type: 'boolean',
      default: false,
    },
    showOptionLabel: {
      type: 'boolean',
      default: true,
    },

    remote: {
      type: 'boolean',
      default: true,
    },
    remoteUrl: {
      type: 'string',
      default: '',
    },
    props: {
      type: 'object',
      properties: {
        label: {
          type: 'string',
        },
        value: {
          type: 'string',
        },
      },
    },
    options: {
      type: 'array',
      default: [
        { value: '选项1', label: '选项1', checked: true },
        { value: '选项2', label: '选项2' },
        { value: '选项3', label: '选项3' },
      ],
      items: {
        type: 'object',

        properties: {
          value: { type: 'string', default: 'value' },
          label: { type: 'string' },
          checked: { type: 'boolean' },
        },
      },
    },
  },
};
