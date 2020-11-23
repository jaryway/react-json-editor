import React, { useState, useEffect } from 'react';
import Form from 'rc-field-form';
import JsonEditor, { Provider as JsonEditorProvider } from '../src';
import * as mock from './mock';

import './style';
import { Button } from 'antd';

const defaultSchemas = {
  type: 'object',
  required: ['id', 'key'],
  properties: {
    /**********************************************************
     * Input
     ***********************************************************/
    // id: { type: 'string', title: 'ID' },
    // key: { type: 'string', title: 'KEY' },
    // name: { type: 'string', title: '名称' },
    // placeholder: { type: 'boolean', title: '占位符' },
    // showLabel: { type: 'boolean', format: 'checkbox', title: '显示标签' },
    // layout: { type: 'string', title: '布局', enum: ['horizontal', 'vertival'], options: { enum_titles: ['横向', '垂直'] } },
    // hidden: { type: 'boolean', title: '隐藏' },
    // disabled: { type: 'boolean', title: '禁用' },
    // required: { type: 'boolean', title: '必填' },
    // pattern: { type: 'string', title: '验证表达式' },
    /* Input end ***********************************************/
    /***********************************************************
     * OrgInput
     ***********************************************************/
    // id: { type: 'string', title: 'ID' },
    // key: { type: 'string', title: 'KEY' },
    // name: { type: 'string', title: '名称' },
    // showLabel: { type: 'boolean', format: 'checkbox', title: '显示标签' },
    // hidden: { type: 'boolean', format: 'checkbox', title: '隐藏' },
    // required: { type: 'boolean', format: 'checkbox', title: '必填' },
    // multiple: { type: 'boolean', format: 'checkbox', title: '多选' },
    // selectType: {
    //   title: '可选类型',
    //   type: 'array',
    //   format: 'checkbox',
    //   uniqueItems: true,
    //   items: {
    //     type: 'string',
    //     enum: ['USER', 'DIVISION'],
    //     options: { enum_titles: ['人员', '部门'] },
    //   },
    // },
    // layout: { type: 'string', format: 'radio', title: '布局', enum: ['horizontal', 'vertival'], options: { /*mode: 'button',*/ enum_titles: ['横向', '垂直'] } },
    /* OrgInput end ********************************************/
    /***********************************************************
     * Select
     ***********************************************************/
    // id: { type: 'string', title: 'ID' },
    // key: { type: 'string', title: 'KEY' },
    // name: { type: 'string', title: '名称' },
    // // layout: { type: 'string', title: '名称' },
    // showLabel: { type: 'boolean', format: 'checkbox', title: '显示标签' },
    // placeholder: { type: 'string', title: '占位符' },
    // hidden: { type: 'boolean', format: 'checkbox', title: '隐藏' },
    // disabled: { type: 'boolean', format: 'checkbox', title: '禁用' },
    // required: { type: 'boolean', format: 'checkbox', title: '必填' },
    // remote: { type: 'boolean', format: 'checkbox', title: '使用远程数据' },
    // remoteUrl: {
    //   type: 'string',
    //   title: '远程地址',
    //   format: 'format',
    //   options: {
    //     dependencies: {
    //       'props.value': 'value',
    //       'remote': true,
    //     },
    //   },
    // },
    // props: { type: 'object', title: '属性', properties: { value: { type: 'string', title: '值属性' }, label: { type: 'string', title: '显示属性' } } },
    // layout: { type: 'string', format: 'select', title: '布局', enum: ['horizontal', 'vertival'], options: { mode: 'button', enum_titles: ['横向', '垂直'] } },
    // showOptionText: { type: 'boolean', format: 'checkbox', title: '显示label' },
    // options: {
    //   type: 'array',
    //   format: 'table',
    //   items: {
    //     type: 'object',
    //     title: '选项',
    //     required: ['value'],
    //     properties: {
    //       value: { type: 'string' },
    //       label: {
    //         type: 'string',
    //         options: {
    //           dependencies: { showOptionText: true },
    //         },
    //       },
    //     },
    //   },
    //   default: [{ type: 'dog', name: 'Walter' }],
    //   options: { collapsed: true },
    //   propertyOrder: 2,
  },
  // options: [
  //   { value: '选项1', label: '选项1', checked: true, key: '2b2e934a03f26' },
  //   { value: '选项2', label: '选项2', key: '7daf33b810383' },
  //   { value: '选项3', label: '选项3', key: '9b80239a03506' },
  // ],
  // customClass: '',
  // disabled: false,
  // required: true,

  /* Select end ***********************************************/
  //   isMember: {
  //     type: 'string',
  //     enum: ['user', 'action', 'scripts'],
  //     options: { enum_titles: ['用户', '动作', '脚本'] },
  //     format: 'checkbox',
  //   },
  //   name: {
  //     type: 'string',
  //     description: 'First and Last name',
  //     pattern: '\\S', // 不为空
  //     default: 'Jeremy Dorn',
  //   },
  //   age: {
  //     type: 'integer',
  //     default: 25,
  //     minimum: 18,
  //     maximum: 99,
  //   },
  //   pets: {
  //     type: 'array',
  //     format: 'table',
  //     title: 'Pets',
  //     uniqueItems: true,
  //     items: {
  //       type: 'object',
  //       title: 'Pet',
  //       properties: {
  //         type: {
  //           type: 'string',
  //           enum: ['cat', 'dog', 'bird', 'reptile', 'other'],
  //           default: 'dog',
  //         },
  //         name: {
  //           type: 'string',
  //         },
  //         user: {
  //           type: 'array',
  //           format: 'table',
  //           title: 'Pets',
  //           uniqueItems: true,
  //           items: {
  //             type: 'object',
  //             title: 'Pet',
  //             properties: {
  //               type: {
  //                 type: 'string',
  //                 enum: ['cat', 'dog', 'bird', 'reptile', 'other'],
  //                 default: 'dog',
  //               },
  //               name: {
  //                 type: 'string',
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //     default: [
  //       {
  //         type: 'dog',
  //         name: 'Walter',
  //       },
  //     ],
  //   },
  // },
};

// const rawData = localStorage.getItem('cards') ? JSON.parse(localStorage.getItem('cards')) : [...mockdata];

const App = () => {
  const [loading, setLoading] = useState(true);
  const [values, setValue] = useState({});
  const [schemas, setSchemas] = useState({});

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setSchemas(() => mock.text);
      setLoading(false);
    }, 500);
  }, []);

  const [form] = Form.useForm();
  console.log(form.getFieldsValue());

  return (
    <>
      <Button
        type='primary'
        onClick={() => {
          console.log(form.getFieldsValue());
        }}
      >
        Save
      </Button>
      <div style={{ display: 'block', clear: 'both', margin: 24 }}>
        <JsonEditorProvider
          options={{
            resolvers: [() => {}],
          }}
        >
          <JsonEditor
            form={form}
            value={values}
            onChange={(changedValue) => {
              console.log('___onChange', changedValue);
              setValue(changedValue);
              // setJsonViewerVisible((prev) => !prev);
            }}
            schema={schemas}
          />
        </JsonEditorProvider>
      </div>
    </>
  );
};

export default App;
