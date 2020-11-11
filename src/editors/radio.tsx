import React from 'react';
import { Radio } from 'antd';
import { Schema } from '../interfaces';
import LabelField from '../components/LabelField';
import JsonEditorFormContext from '../JsonEditorFormContext';

interface RadioEditorProps {
  title?: string;
  path?: string[];
  schema: Schema;
}

const RadioEditor: React.FC<RadioEditorProps> = ({ path, title, schema }) => {
  const { root } = React.useContext(JsonEditorFormContext);
  const e = schema.enum || [];
  const { mode, enum_titles } = (schema.options || {}) as any;
  const titles = enum_titles || [];
  const fieldpath = path || root || [];
  const options = e.map((m, i) => ({ value: m, label: titles[i] || m }));

  // React.useEffect(() => {
  //   console.log('mount.RadioEditor');
  // }, []);

  return (
    <LabelField name={fieldpath} label={title} schema={schema}>
      {(control) => {
        if (mode === 'button')
          return (
            <Radio.Group {...control}>
              {options.map((m) => (
                <Radio.Button key={m.value} value={m.value}>
                  {m.label}
                </Radio.Button>
              ))}
            </Radio.Group>
          );
        return <Radio.Group {...control} options={options} />;
      }}
    </LabelField>
  );
};

export default RadioEditor;
