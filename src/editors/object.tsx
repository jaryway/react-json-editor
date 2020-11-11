import React, { useContext } from 'react';
import classnames from 'classnames';
import { Schema } from '../interfaces';
// import { Field } from 'rc-field-form';
// import * as editors from './index';
import JsonEditorContext from '../JsonEditorContext';
import { getEditorClass } from '../utils/editorUtil';
import JsonEditorFormContext from '../JsonEditorFormContext';

interface ObjectEditorProps {
  format?: string;
  path: string[];
  schema: Schema;
}

const Wrapper: React.FC<any> = ({ format, path, title, children }: any) => {
  const isTableRow = format === 'table_row';

  if (isTableRow) return <>{children}</>;

  return (
    <div data-schematype='object' className={classnames('ant-card  ant-card-small', { 'ant-card-bordered': path.length > 1 })}>
      {title && (
        <div className='ant-card-head' style={{ borderBottom: 0, paddingLeft: 0, paddingRight: 0 }}>
          <div className='ant-card-head-wrapper'>
            <label className='ant-card-head-title'>{title}</label>
          </div>
        </div>
      )}
      <div className='ant-card-body'>{children}</div>
    </div>
  );
};

const ChildWrapper: React.FC<any> = ({ format, children }: any) => {
  const isTableRow = format === 'table_row';

  if (isTableRow) return <td className='je-object-item'>{children}</td>;

  return <>{children}</>;
};

const ObjectEditor: React.FC<ObjectEditorProps> = ({ schema, path = [] }) => {
  const { options } = useContext(JsonEditorContext);
  const { root } = React.useContext(JsonEditorFormContext);
  const fieldpath = path || root || [];
  const { resolvers = [], editors } = options || {};
  const format = schema.format;

  // React.useEffect(() => {
  //   console.log('mount.ObjectEditor');
  // }, []);

  return (
    <Wrapper title={schema.title} format={format} path={fieldpath}>
      {Object.entries(schema.properties || {}).map(([key, childSchema]) => {
        childSchema.parent = schema;
        const Component = getEditorClass(childSchema as Schema, resolvers || [], editors as { [k: string]: React.FC });

        return (
          <ChildWrapper format={format} key={key}>
            {Component && <Component key={key} schema={childSchema} path={[...fieldpath, key]} title={childSchema.title || key} />}
          </ChildWrapper>
        );
      })}
    </Wrapper>
  );
};

export default ObjectEditor;
