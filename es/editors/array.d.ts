import React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Schema } from '../interfaces';
interface ArrayEditorProps extends FormComponentProps {
    path?: string[];
    schema: Schema;
}
declare const ArrayEditor: React.FC<ArrayEditorProps>;
export default ArrayEditor;
