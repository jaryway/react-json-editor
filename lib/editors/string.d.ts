import React from 'react';
import { Schema } from '../interfaces';
interface StringEditorProps {
    title?: string;
    path?: string[];
    schema: Schema;
}
declare const StringEditor: React.FC<StringEditorProps>;
export default StringEditor;
