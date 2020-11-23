/**
 * 属性规则请参考
 * http://json-schema.org/draft/2019-09/json-schema-validation.html#rfc.section.6.5.3
 */

export interface Schema {
  type: 'string' | 'boolean' | 'array' | 'object' | 'number' | 'integer' | 'null' | 'undefined';
  title?: string;
  format?: 'table' | 'url' | 'email' | 'date' | string;
  items?: Schema;
  min?: number;
  max?: number;
  step?: number;
  enum?: string[];
  default?: any;
  required?: (string | number)[];

  parent?: Schema;

  /* 字符串属性 */
  minLength?: number; // 非负整数
  maxLength?: number; // 非负整数
  pattern?: string; // 必须是有效的正则表达式
  /* 字符串属性 end */

  /* 数组属性 */
  minItems?: number; // 最小数组项目数
  maxItems?: number; // 最大数组项目数
  uniqueItems?: number; // 数组中的每一项是否必须唯一
  uniqueItemFields?: string[]; // 当 uniqueItems 为 true 时。指定验证那些字段必须唯一
  /* 数组属性 end */

  description: string;
  // p?: boolean;
  properties?: { [k: string]: Schema };
  options?: {
    enum_titles?: string[];
    mode?: string;
    checkbox?: boolean;
    // 依赖项
    dependencies?: {
      [path: string]: any;
    };
  };
}

export type Resolver = (schema: Schema) => string | undefined;

export interface CommonEditorProps {
  schema: Schema;
  path: string[];
}
