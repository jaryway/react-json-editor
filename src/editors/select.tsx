import React from 'react';
import { Select } from 'antd';
import { Schema } from '../interfaces';
import LabelField from '../components/LabelField';
import JsonEditorFormContext from '../JsonEditorFormContext';

interface SelectEditorProps {
  title?: string;
  path?: string[];
  schema: Schema;
}

const { Option } = Select;

const SelectEditor: React.FC<SelectEditorProps> = ({ schema, path, title }) => {
  const { root } = React.useContext(JsonEditorFormContext);
  let options: { label: string; value: string | boolean | 0 | 1 }[] = [];
  const fieldpath = path || root || [];
  // let enum_options = [];
  // let enum_values = [];
  let enum_display = [];

  // React.useEffect(() => {
  //   console.log('mount.SelectEditor');
  // }, []);

  if (schema.enum) {
    const display = (schema.options && schema.options.enum_titles) || [];
    options = schema.enum.map((option, i) => ({ value: `${option}`, label: `${display[i] || option}` }));
  } else {
    enum_display = (schema.options && schema.options.enum_titles) || ['是', '否'];
    options = [
      { label: enum_display[0], value: 1 },
      { label: enum_display[1], value: 0 },
    ];
  }

  return (
    <LabelField name={fieldpath} label={title} schema={schema}>
      {(control) => {
        return (
          <Select {...control}>
            {options.map((option) => {
              return (
                <Option key={`${option.value}`} value={option.value as string}>
                  {option.label}
                </Option>
              );
            })}
          </Select>
        );
      }}
    </LabelField>
  );
};

export default SelectEditor;
