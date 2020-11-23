import React, { useImperativeHandle, useContext, useEffect } from 'react';
import Form, { FormInstance } from 'rc-field-form';
import JsonEditorContext, { JsonEditorProvider as Provider } from './JsonEditorContext';
import { JsonEditorFormProvider } from './JsonEditorFormContext';

import { Schema } from './interfaces';
import { getEditorClass } from './utils/editorUtil';

import 'antd/lib/button/style/index.less';
import 'antd/lib/form/style/index.less';
import 'antd/lib/card/style/index.less';
import 'antd/lib/table/style/index.less';
import 'style';

interface JsonEditorProps {
  //   Provider: typeof Provider;
  root?: string[];
  form: FormInstance<any>;
  schema: Schema;
  value?: { name: string; city: string }[];
  onChange: (v: { name: string; city: string }[]) => void;
}


const InterbalJsonEditor: React.ForwardRefRenderFunction<unknown, JsonEditorProps> = ({ schema, value, form, root, onChange }, ref) => {
  const { options } = useContext(JsonEditorContext);
  // const { fieldKeySet } = useContext(JsonEditorFormContext);

  const { resolvers, editors } = options;
  const EditorComponent = getEditorClass(schema as Schema, resolvers, editors);

  // 对外暴露内部方法
  useImperativeHandle(ref, () => {});

  useEffect(() => {
    // console.log('test1.editor.mount');
  }, []);

  return (
    <JsonEditorFormProvider form={form} root={root || []}>
      <Form
        form={form}
        initialValues={value}
        className='ant-form ant-form-vertical'
        onValuesChange={(_, values) => {
          // console.log('__-onValuesChange:', _);
          onChange && onChange(values);
        }}
      >
        {EditorComponent && <EditorComponent schema={schema} />}
      </Form>
    </JsonEditorFormProvider>
  );
};

const ForwardJsonEditor = React.forwardRef<unknown, JsonEditorProps>(InterbalJsonEditor);

type ForwardJsonEditor_ = typeof ForwardJsonEditor;
interface RefJsonEditor extends ForwardJsonEditor_ {
  Provider: typeof Provider;
}

const JsonEditor: RefJsonEditor = ForwardJsonEditor as RefJsonEditor;

JsonEditor.Provider = Provider;

export { Provider };

export default JsonEditor;
