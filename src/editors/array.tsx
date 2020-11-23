import React, { useContext } from 'react';
import { List } from 'rc-field-form';
import classNames from 'classnames';
// import Schema, { Rules } from 'async-validator';
import { FormComponentProps } from 'antd/lib/form';

import * as editors from './index';

import { Schema } from '../interfaces';
import JsonEditorFormContext from '../JsonEditorFormContext';
import { Button } from 'antd';

interface ArrayEditorProps extends FormComponentProps {
  path?: string[];
  schema: Schema;
}

const ArrayEditor: React.FC<ArrayEditorProps> = ({ schema, path }) => {
  const { root, hiddenMap } = useContext(JsonEditorFormContext);
  const items: Schema = schema.items || ({} as Schema);
  const Component = (editors as any)[(items || ({} as any)).type as string];

  (items as any).parent = schema;
  if (schema.format === 'table') {
    (items as any).format = 'table_row';
  }

  // console.log('assdsdfasd', items);

  // React.useEffect(() => {
  //   console.log('mount.ArrayEditor');
  // }, []);

  return (
    <List
      validateTrigger='onChange'
      name={path || root || []}
      rules={[
        {
          type: 'array',
          required: true,
          // defaultField: {
          //   type: 'object',
          //   required: true,
          //   // fields: {
          //   //   value: { type: 'string', required: true },
          //   // },
          // },
        } as any,
      ]}
    >
      {(fields, { add, remove, move }, { errors, ...meta }) => {
        // console.log('fieldfield', errors);

        return (
          <div className='je-array-item ant-card ant-card-bordered ant-card-small'>
            {items.title && (
              <div className='ant-card-head' style={{ borderBottom: 0 }}>
                <div className='ant-card-head-wrapper'>
                  <label className='ant-card-head-title'>{items.title}</label>
                </div>
              </div>
            )}
            <div className='ant-card-body'>
              <table style={{ display: 'block', clear: 'both' }}>
                {fields.length > 0 && (
                  <thead>
                    <tr>
                      {Object.entries(items.properties || {}).map(([k, v]) => {
                        const reg = new RegExp(`${meta.name.join('.')}\\.\\d{1,}\\.${k}`);
                        // 如果存在不显示的项，头部也不显示
                        if (hiddenMap && Object.keys(hiddenMap).some((key) => reg.test(key) && hiddenMap[key])) return null;
                        return (
                          <th style={{ padding: '8px 0' }} key={k}>
                            {v.title || k}
                          </th>
                        );
                      })}
                      <th></th>
                    </tr>
                  </thead>
                )}
                <tbody>
                  {fields.map((field, index, arr) => {
                    return (
                      <tr key={`row-${index}`}>
                        {Component && <Component key={field.key} schema={items} path={[index]} title={items.title || field.key} />}
                        <td className='je-object-item je-array-item operation-row' style={{ verticalAlign: 'top' }}>
                          <Button onClick={() => remove(index)}>删除</Button>
                          {arr.length > 1 && index - 1 >= 0 && <Button onClick={() => move(index, index - 1)}>上移</Button>}
                          {arr.length > 1 && index + 1 < arr.length && <Button onClick={() => move(index, index + 1)}>下移</Button>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <table style={{ display: 'block', clear: 'both' }}>
                <tfoot>
                  <tr>
                    <td style={{ padding: '0px 0' }} className={classNames({ 'has-error': errors.length })}>
                      <button
                        className='ant-btn ant-btn-primary'
                        onClick={(event) => {
                          event.persist();
                          add();
                        }}
                      >
                        添加项
                      </button>
                      <span className='ant-form-item-explain ant-form-explain'>{errors[0]}</span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        );
      }}
    </List>
  );
};

export default ArrayEditor;
