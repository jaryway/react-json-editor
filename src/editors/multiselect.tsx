/***
 * multiselect
 * type="array" and itemsSchema.type=string|number|integer
 * {
 *     title: '可选类型',
 *     type: 'array',
 *     format: 'checkbox'|undefined,
 *     uniqueItems: true,
 *     items: {
 *       type: 'string',
 *       enum: ['USER', 'DIVISION'],
 *       options: { enum_titles: ['人员', '部门'] },
 *     },
 * }
 *
 */
import React from 'react';
import { Checkbox, Select } from 'antd';

import { Schema, CommonEditorProps } from '../interfaces';
import LabelField from '../components/LabelField';
import JsonEditorFormContext from '../JsonEditorFormContext';

interface MultiSelectEditorProps extends CommonEditorProps {
  title?: string;
  // path: string[];
  schema: Schema;
}

function sanitize(value: any, schema: Schema) {
  if (schema?.items?.type === 'boolean') return !!value;
  else if (schema?.items?.type === 'number') return 1 * value || 0;
  else if (schema?.items?.type === 'integer') return Math.floor(value * 1 || 0);
  return `${value}`;
}

const { Group: CheckboxGroup } = Checkbox;
const { Option } = Select;

const MultiSelectEditor: React.FC<MultiSelectEditorProps> = ({ schema, path, title }) => {
  const { root } = React.useContext(JsonEditorFormContext);
  const fieldpath = path || root || [];
  const { items: itemsSchema } = schema;
  const e = itemsSchema?.enum || [];
  const t = itemsSchema?.options ? itemsSchema.options.enum_titles || [] : [];
  const options = e
    .filter((m) => sanitize(m, schema) === m)
    .map((m, i) => {
      return { value: m, label: t[i] || m };
    });

  // React.useEffect(() => {
  //   console.log('mount.MultiSelectEditor');
  // }, []);

  return (
    <LabelField name={fieldpath} label={title} schema={schema} valuePropName='checked'>
      {(control) => {
        if (schema.format === 'checkbox') return <CheckboxGroup {...control} options={options}></CheckboxGroup>;
        return (
          <Select mode='multiple' {...control}>
            {options.map((m) => (
              <Option key={m.value} value={m.value}>
                {m.label}
              </Option>
            ))}
          </Select>
        );
      }}
    </LabelField>
  );
};

export default MultiSelectEditor;
