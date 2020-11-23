import React from 'react';
import { InputNumber } from 'antd';
import { Schema, CommonEditorProps } from '../interfaces';
// import { Field } from 'rc-field-form';
import LabelField from '../components/LabelField';
import JsonEditorFormContext from '../JsonEditorFormContext';

interface IntegerEditorProps extends CommonEditorProps {
  title?: string;
  path: string[];
  schema: Schema;
}

const IntegerEditor: React.FC<IntegerEditorProps> = ({ schema, path, title }) => {
  const { min, max, step } = schema;
  const { root } = React.useContext(JsonEditorFormContext);
  const fieldpath = path || root || [];

  // React.useEffect(() => {
  //   console.log('mount.IntegerEditor');
  // }, []);

  return (
    <LabelField name={fieldpath} label={title} schema={schema}>
      {(control) => {
        return <InputNumber {...control} step={step} min={min} max={max} />;
      }}
    </LabelField>
  );
};

export default IntegerEditor;
