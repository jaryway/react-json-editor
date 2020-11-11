import React from 'react';
import { Schema } from '../interfaces';
interface IntegerEditorProps {
    title?: string;
    path?: string[];
    schema: Schema;
}
declare const IntegerEditor: React.FC<IntegerEditorProps>;
export default IntegerEditor;
