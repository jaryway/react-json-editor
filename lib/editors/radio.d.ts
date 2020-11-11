import React from 'react';
import { Schema } from '../interfaces';
interface RadioEditorProps {
    title?: string;
    path?: string[];
    schema: Schema;
}
declare const RadioEditor: React.FC<RadioEditorProps>;
export default RadioEditor;
