import React from 'react';
import { DatePicker } from 'antd';

import { Schema } from '../interfaces';
import LabelField from '../components/LabelField';
import JsonEditorFormContext from '../JsonEditorFormContext';

interface DateTimeProps {
  title?: string;
  path?: string[];
  schema: Schema;
}

const DateTimeEditor: React.FC<DateTimeProps> = ({ schema, path, title }) => {
  const { root } = React.useContext(JsonEditorFormContext);
  const { format } = schema;
  const showTime = format === 'datetime';
  const fieldpath = path || root || [];
  // React.useEffect(() => {
  //   console.log('mount.DateTimeEditor');
  // }, []);

  return (
    <div>
      <LabelField name={fieldpath} label={title} schema={schema}>
        {(control) => {
          return <DatePicker {...control} showTime={showTime} />;
        }}
      </LabelField>
    </div>
  );
};

export default DateTimeEditor;
