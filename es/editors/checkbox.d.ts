import React from 'react';
import { Schema } from '../interfaces';
interface CheckboxEditorProps {
    title?: string;
    path?: string[];
    schema: Schema;
}
declare const CheckboxEditor: React.FC<CheckboxEditorProps>;
export default CheckboxEditor;
