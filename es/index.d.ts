import React from 'react';
import { FormInstance } from 'rc-field-form';
import { JsonEditorProvider as Provider } from './JsonEditorContext';
import { Schema } from './interfaces';
import 'antd/lib/button/style/index.less';
import 'antd/lib/form/style/index.less';
import 'antd/lib/card/style/index.less';
import 'antd/lib/table/style/index.less';
import 'style';
interface JsonEditorProps {
    root?: string[];
    form: FormInstance<any>;
    schema: Schema;
    value?: {
        name: string;
        city: string;
    }[];
    onChange: (v: {
        name: string;
        city: string;
    }[]) => void;
}
declare const ForwardJsonEditor: React.ForwardRefExoticComponent<JsonEditorProps & React.RefAttributes<unknown>>;
declare type ForwardJsonEditor_ = typeof ForwardJsonEditor;
interface RefJsonEditor extends ForwardJsonEditor_ {
    Provider: typeof Provider;
}
declare const JsonEditor: RefJsonEditor;
export { Provider };
export default JsonEditor;
