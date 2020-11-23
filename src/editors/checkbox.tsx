import React from 'react';
import { Checkbox } from 'antd';
import { Schema } from '../interfaces';
import LabelField from '../components/LabelField';
import JsonEditorFormContext from '../JsonEditorFormContext';

interface CheckboxEditorProps {
  title?: string;
  path?: string[];
  schema: Schema;
}

const CheckboxEditor: React.FC<CheckboxEditorProps> = ({ schema, path, title }) => {
  const { root } = React.useContext(JsonEditorFormContext);
  const fieldpath = path || root || [];

  // React.useEffect(() => {
  //   console.log('mount.CheckboxEditor');
  // }, []);

  return (
    <LabelField name={fieldpath} label={title} schema={schema} valuePropName='checked'>
      {(control, meta) => {
        return <Checkbox {...control} id={meta.name.join('.')} />;
      }}
    </LabelField>
  );
};

export default CheckboxEditor;
