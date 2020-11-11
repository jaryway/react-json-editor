import React from 'react';
import { Schema } from '../interfaces';
interface MultiSelectEditorProps {
    title?: string;
    path?: string[];
    schema: Schema;
}
declare const MultiSelectEditor: React.FC<MultiSelectEditorProps>;
export default MultiSelectEditor;
