import React from 'react';
import { Input } from 'antd';

import { Schema, CommonEditorProps } from '../interfaces';
// import { getRules } from '../rules';
import LabelField from '../components/LabelField';
import JsonEditorFormContext from '../JsonEditorFormContext';

interface StringEditorProps extends CommonEditorProps {
  title?: string;
  path: string[];
  schema: Schema;
}

const StringEditor: React.FC<StringEditorProps> = ({ path, title, schema }) => {
  const { root } = React.useContext(JsonEditorFormContext);
  const fieldpath = path || root || [];

  React.useEffect(() => {
    // console.log('test.string.mount');
    // return () => {
    //   console.log('test.string.unmount');
    // };
  }, []);
  console.log('test.string.path', path);
  return (
    <LabelField name={fieldpath} label={title} schema={schema}>
      {(control, meta) => {
        return <Input {...control} data-schemapath={meta.name.join('.')} />;
      }}
    </LabelField>
  );
};

export default StringEditor;
