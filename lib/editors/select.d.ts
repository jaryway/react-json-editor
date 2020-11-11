import React from 'react';
import { Schema } from '../interfaces';
interface SelectEditorProps {
    title?: string;
    path?: string[];
    schema: Schema;
}
declare const SelectEditor: React.FC<SelectEditorProps>;
export default SelectEditor;
