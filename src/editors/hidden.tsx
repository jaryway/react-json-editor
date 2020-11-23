import React from 'react';
// import { Checkbox } from 'antd';
import { Schema } from '../interfaces';
import LabelField from '../components/LabelField';
import JsonEditorFormContext from '../JsonEditorFormContext';

interface HiddenEditorProps {
  title?: string;
  path?: string[];
  schema: Schema;
}

const HiddenEditor: React.FC<HiddenEditorProps> = ({ schema, path }) => {
  const { root } = React.useContext(JsonEditorFormContext);
  const fieldpath = path || root || [];

  // console.log('hidden', schema, rest);
  // React.useEffect(() => {
  //   console.log('mount.HiddenEditor');
  // }, []);

  return <LabelField name={fieldpath} schema={schema} />;
};

export default HiddenEditor;
