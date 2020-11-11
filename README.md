JSON editor for react

## 文件结构

```
|-- example                 // 示例
|-- src                     // 源码
    |-- components          // 项目组件
    |-- editors             // 表单控件
    |-- shared              // 公共组件
```

## TODO:

> 1. [x] 基本功能实现;
> 2. [x] 依赖项显示/隐藏;
> 3. [x] 支持数组
> 4. [x] 支持对象嵌套;
> 5. [ ] 主题???;

### async-validator

```js
import Schema, { Rules } from 'async-validator';
const descriptor: Rules = {
  list: {
    type: 'array',
    required: true,
    defaultField: {
      type: 'object',
      required: true,
      fields: {
        name: { type: 'number', required: true },
      },
    },
  },
};
// 验证 array<object> 类型
const validator = new Schema(descriptor);
validator.validate({ list: [{ name: 'wuji' }, { name: '' }] }, undefined, (error) => {
  console.log('error', error);
});

```

### 参考资料
[1] [json-schema-validation](http://json-schema.org/draft/2019-09/json-schema-validation.html)

[2] [json-editor](https://github.com/json-editor/json-editor)